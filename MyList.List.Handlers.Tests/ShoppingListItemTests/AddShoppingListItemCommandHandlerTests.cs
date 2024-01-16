using AutoMoq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyList.Entity;
using MyList.Entity.Infrastructure;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using MyList.TestHelpers;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers.Tests.ShoppingListItemTests
{
    [TestClass]
    public class AddShoppingListItemCommandHandlerTests
    {
        private Mock<IShoppingListItemRepository> _shoppingListItemRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private AddShoppingListItemCommandHandler _handler;
        private AddShoppingListItemCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();

            _shoppingListItemRepository = new Mock<IShoppingListItemRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var newShoppingListItem = ShoppingListItemBuilder.Create().Build();
            var newShoppingList = ShoppingListBuilder.Create().WithId(newShoppingListItem.ShoppingListId).Build();

            _shoppingListItemRepository.Setup(r => r.Add(It.IsAny<ShoppingListItem>())).ReturnsAsync(newShoppingList);
            _shoppingListItemRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new AddShoppingListItemCommand()
            {
                Name = newShoppingListItem.Name,
                ShoppingListId = newShoppingListItem.ShoppingListId
            };
            _handler = new AddShoppingListItemCommandHandler(_shoppingListItemRepository.Object);
        }

        [TestMethod]
        public async Task Handle_AddShoppingListItem_ReturnsUpdatedShoppingList()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task Handle_AddShoppingListItem_AddsANewShoppingListItemToTheShoppingListItemRepository()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _shoppingListItemRepository.Verify(r => r.Add(It.IsAny<ShoppingListItem>()), Times.Once);
        }

        [TestMethod]
        public async Task Handle_AddShoppingListItem_SavesChangesInDB()
        {
            // Act
            var result = await _handler.Handle(_command, new CancellationToken());

            // Assert
            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
