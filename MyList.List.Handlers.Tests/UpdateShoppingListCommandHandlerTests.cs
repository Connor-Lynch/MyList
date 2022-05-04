using AutoMoq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyList.Entity;
using MyList.Entity.Infrastructure;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using MyList.TestHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers.Tests
{
    [TestClass]
    public class UpdateShoppingListCommandHandlerTests
    {
        private Mock<IShoppingListRepository> _shoppingListRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private UpdateShoppingListCommandHandler _handler;
        private UpdateShoppingListCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();
            
            _shoppingListRepository = new Mock<IShoppingListRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var shoppingList = ShoppingListBuilder.Create().Build();
            
            _shoppingListRepository.Setup(r => r.Update(shoppingList.Id, shoppingList.Name, shoppingList.Items)).ReturnsAsync(shoppingList);
            _shoppingListRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new UpdateShoppingListCommand()
            {
                Id = shoppingList.Id,
                Name = shoppingList.Name,
                Items = shoppingList.Items
            };
            _handler = new UpdateShoppingListCommandHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task HandlerShouldUpdateShoppingListAndReturnIt()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task HandlerShouldUpdateShoppingListInShoppingListRepository()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _shoppingListRepository.Verify(r => r.Update(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<List<ShoppingListItem>>()), Times.Once);
        }

        [TestMethod]
        public async Task HandlerShouldSaveChangesInDB()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [TestMethod]
        public async Task HandlerShouldReturnNullIfShoppingListDoesNotExist()
        {
            _command.Id = Guid.NewGuid();
            var result = await _handler.Handle(_command, new CancellationToken());

            Assert.IsNull(result);
        }
    }
}
