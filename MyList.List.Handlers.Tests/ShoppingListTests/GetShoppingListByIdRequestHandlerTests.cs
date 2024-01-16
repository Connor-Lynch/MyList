using AutoMoq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Requests;
using MyList.TestHelpers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers.Tests
{
    [TestClass]
    public class GetShoppingListByIdRequestHandlerTests
    {
        private Mock<IShoppingListRepository> _shoppingListRepository;

        private GetShoppingListByIdRequest _request;
        private GetShoppingListByIdRequestHandler _handler;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();

            _shoppingListRepository = new Mock<IShoppingListRepository>();

            var getShoppingListRepsonse = ShoppingListBuilder.Create().Build();
            _shoppingListRepository.Setup(r => r.GetById(getShoppingListRepsonse.Id)).ReturnsAsync(getShoppingListRepsonse);

            _request = new GetShoppingListByIdRequest()
            {
                Id = getShoppingListRepsonse.Id
            };
            _handler = new GetShoppingListByIdRequestHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task Handler_GetShoppingList_ReturnsShoppingListById()
        {
            // Act
            var result = await _handler.Handle(_request, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task Handler_GetShoppingList_GetsShoppingListFromRepository()
        {
            // Act
            var result = await _handler.Handle(_request, new CancellationToken());

            // Assert
            _shoppingListRepository.Verify(r => r.GetById(It.IsAny<Guid>()), Times.Once);
        }

        [TestMethod]
        public async Task Handler_NoListFound_ReturnsNull()
        {
            // Arrange
            _request.Id = Guid.NewGuid();

            // Act
            var result = await _handler.Handle(_request, new CancellationToken());

            // Assert
            Assert.IsNull(result);
        }
    }
}
