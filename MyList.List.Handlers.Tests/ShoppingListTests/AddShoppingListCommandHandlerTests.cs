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

namespace MyList.List.Handlers.Tests
{
    [TestClass]
    public class AddShoppingListCommandHandlerTests
    {
        private Mock<IShoppingListRepository> _shoppingListRepository;
        private Mock<IUnitOfWork> _unitOfWork;

        private AddShoppingListCommandHandler _handler;
        private AddShoppingListCommand _command;

        [TestInitialize]
        public void InIt()
        {
            var mocker = new AutoMoqer();
            
            _shoppingListRepository = new Mock<IShoppingListRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();

            var newShoppingList = ShoppingListBuilder.Create().Build();
            
            _shoppingListRepository.Setup(r => r.Add(It.IsAny<ShoppingList>())).Returns(newShoppingList);
            _shoppingListRepository.Setup(s => s.UnitOfWork).Returns(_unitOfWork.Object);

            _command = new AddShoppingListCommand()
            {
                Name = newShoppingList.Name
            };
            _handler = new AddShoppingListCommandHandler(_shoppingListRepository.Object);
        }

        [TestMethod]
        public async Task HandlerShouldAddANewShoppingListAndReturnIt()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            Assert.IsInstanceOfType(result, typeof(ShoppingList));
        }

        [TestMethod]
        public async Task HandlerShouldAddANewShoppingListToShoppingListRepository()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _shoppingListRepository.Verify(r => r.Add(It.IsAny<ShoppingList>()), Times.Once);
        }

        [TestMethod]
        public async Task HandlerShouldSaveChangesInDB()
        {
            var result = await _handler.Handle(_command, new CancellationToken());

            _unitOfWork.Verify(u => u.SaveEntitiesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
