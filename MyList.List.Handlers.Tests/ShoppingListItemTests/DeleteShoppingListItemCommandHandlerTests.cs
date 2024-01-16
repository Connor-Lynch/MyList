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

namespace MyList.List.Handlers.Tests.ShoppingListItemTests
{
    [TestClass]
    public class DeleteShoppingListItemCommandHandlerTests
    {
        private Mock<IShoppingListItemRepository> _shoppingListItemRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private DeleteShoppingListItemCommandHandler _handler;
        private DeleteShoppingListItemCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();

            _shoppingListItemRepository = new Mock<IShoppingListItemRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var shoppingListItem = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create().WithId(shoppingListItem.ShoppingListId).Build();

            _shoppingListItemRepository.Setup(r => r.Delete(shoppingListItem.Id)).ReturnsAsync(shoppingList);
            _shoppingListItemRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new DeleteShoppingListItemCommand()
            {
                Id = shoppingListItem.Id,
            };
            _handler = new DeleteShoppingListItemCommandHandler(_shoppingListItemRepository.Object);
        }

        [TestMethod]
        public async Task Handle_DeleteShippingListItem_ReturnsUpdatedShoppingList()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task Handle_DeleteShoppingListItem_DeletesShoppingListItemInShoppingListRepository()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _shoppingListItemRepository.Verify(r => r.Delete(It.IsAny<Guid>()), Times.Once);
        }

        [TestMethod]
        public async Task Handle_DeleteShoppingListItem_SavesChangesInDB()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
