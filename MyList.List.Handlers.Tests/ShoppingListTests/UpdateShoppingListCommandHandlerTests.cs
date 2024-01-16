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
            
            _shoppingListRepository.Setup(r => r.UpdateName(shoppingList.Id, shoppingList.Name)).ReturnsAsync(shoppingList);
            _shoppingListRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new UpdateShoppingListCommand()
            {
                Id = shoppingList.Id,
                Name = shoppingList.Name
            };
            _handler = new UpdateShoppingListCommandHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingList_ReturnsUpdatedList()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingList_UpdatesShoppingListInShoppingListRepository()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _shoppingListRepository.Verify(r => r.UpdateName(It.IsAny<Guid>(), It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingList_SavesChangesInDB()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [TestMethod]
        public async Task Handle_ShoppingListDoesNotExist_ReturnsNull()
        {
            // Arrange
            _command.Id = Guid.NewGuid();

            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            Assert.IsNull(result);
        }
    }
}
