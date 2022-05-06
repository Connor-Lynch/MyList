using AutoMoq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyList.Entity;
using MyList.Entity.Infrastructure;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using MyList.TestHelpers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers.Tests
{
    [TestClass]
    public class DeleteShoppingListCommandHandlerTests
    {
        private Mock<IShoppingListRepository> _shoppingListRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private DeleteShoppingListCommandHandler _handler;
        private DeleteShoppingListCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();
            
            _shoppingListRepository = new Mock<IShoppingListRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var shoppingList = ShoppingListBuilder.Create().Build();
            
            _shoppingListRepository.Setup(r => r.Delete(shoppingList.Id)).ReturnsAsync(shoppingList);
            _shoppingListRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new DeleteShoppingListCommand()
            {
                Id = shoppingList.Id
            };
            _handler = new DeleteShoppingListCommandHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task HandlerShouldDeleteShoppingListAndReturnIt()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task HandlerShouldDeleteShoppingListInShoppingListRepository()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _shoppingListRepository.Verify(r => r.Delete(It.IsAny<Guid>()), Times.Once);
        }

        [TestMethod]
        public async Task HandlerShouldSaveChangesInDB()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
