using AutoMoq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Requests;
using MyList.TestHelpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers.Tests
{
    [TestClass]
    public class GetAllListsRequestHandlerTests
    {
        private Mock<IShoppingListRepository> _shoppingListRepository;

        private GetAllShoppingListsRequest _request;
        private GetAllShoppingListsRequestHandler _handler;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();

            _shoppingListRepository = new Mock<IShoppingListRepository>();

            var getAllShoppingListResponse = new List<ShoppingList>() 
            {
                ShoppingListBuilder.Create().WithName("List 1").Build(),
                ShoppingListBuilder.Create().WithName("List 2").Build()
            };

            _shoppingListRepository.Setup(r => r.GetAll()).Returns(getAllShoppingListResponse.AsQueryable());

            _request = new GetAllShoppingListsRequest();
            _handler = new GetAllShoppingListsRequestHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task Handler_GetAllLists_ReturnsAListOfLists()
        {
            // Act
            var result = await _handler.Handle(_request, new CancellationToken());

            // Assert
            Assert.IsInstanceOfType(result, typeof(IQueryable<ShoppingList>));
            Assert.AreEqual(result.Count(), 2);
        }

        [TestMethod]
        public async Task Handler_GetAllLists_InvokesShoppingListRepository()
        {
            // Act
            var result = await _handler.Handle(_request, new CancellationToken());

            // Assert
            _shoppingListRepository.Verify(r => r.GetAll(), Times.Once);
        }
    }
}
