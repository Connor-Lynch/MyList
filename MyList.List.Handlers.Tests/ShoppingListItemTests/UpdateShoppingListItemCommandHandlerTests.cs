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

namespace MyList.List.Handlers.Tests.ShoppingListItemTests
{
    [TestClass]
    public class UpdateShoppingListItemCommandHandlerTests
    {
        private Mock<IShoppingListItemRepository> _shoppingListItemRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private UpdateShoppingListItemCommandHandler _handler;
        private UpdateShoppingListItemCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();

            _shoppingListItemRepository = new Mock<IShoppingListItemRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var shoppingListItem = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create()
                .WithId(shoppingListItem.ShoppingListId)
                .WithItems( new List<ShoppingListItem>() { shoppingListItem })
                .Build();

            _shoppingListItemRepository.Setup(r => r.Update(It.IsAny<ShoppingListItem>())).ReturnsAsync(shoppingList);
            _shoppingListItemRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new UpdateShoppingListItemCommand()
            {
                Item = shoppingListItem
            };
            _handler = new UpdateShoppingListItemCommandHandler(_shoppingListItemRepository.Object);
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingListItem_ReturnsUpdatedShoppingList()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingListItem_UpdatesShoppingListItemInShoppingListRepository()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _shoppingListItemRepository.Verify(r => r.Update(It.IsAny<ShoppingListItem>()), Times.Once);
        }

        [TestMethod]
        public async Task Handle_UpdateShoppingListItem_SavesChangesInDB()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
