using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyList.Entity;
using MyList.TestHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyList.Data.Repository.Tests
{
    [TestClass]
    public class ShoppingListRepositoryTests : RepositoryTestBase
    {
        private ShoppingListRepository _repository;

        [TestInitialize]
        public void InIt()
        {
            BaseInit();
            _repository = new ShoppingListRepository(_context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            BaseCleanup();
        }

        [TestMethod]
        public void GetAllShouldReturnACollectionOfShoppingLists()
        {
            var shoppingListsToSeed = new List<object>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var shoppingLists = _repository.GetAll();

            Assert.IsInstanceOfType(shoppingLists, typeof(IQueryable<ShoppingList>));
            Assert.AreEqual(shoppingLists.Count(), 2);
        }

        [TestMethod]
        public void GetAllShouldReturnACollectionOfShoppingListsWithItems()
        {
            var shoppingListsToSeed = new List<object>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = _repository.GetAll();

            Assert.IsInstanceOfType(result.First().Items, typeof(List<ShoppingListItem>));
            Assert.IsTrue(result.First().Items.Count() > 0);
        }

        [TestMethod]
        public async Task GetByIdShouldReturnShoppingList()
        {
            var expectedShoppingListResult = ShoppingListBuilder.Create().Build();

            var shoppingListsToSeed = new List<object>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = await _repository.GetById(expectedShoppingListResult.Id);

            Assert.AreEqual(expectedShoppingListResult, result);
        }

        [TestMethod]
        public async Task GetByIdShouldReturnShoppingListWithItems()
        {
            var expectedShoppingListResult = ShoppingListBuilder.Create().Build();

            var shoppingListsToSeed = new List<object>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = await _repository.GetById(expectedShoppingListResult.Id);

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.IsTrue(result.Items.Count() > 0);
        }

        [TestMethod]
        public async Task UpdateShouldUpdateShoppingList()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            shoppingList.Name = "UpdatedName";

            var result = _repository.Update(shoppingList);
            _context.SaveChanges();

            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.AreEqual(shoppingList, updatedShoppingListInRepository);
            Assert.AreEqual(updatedShoppingListInRepository.Name, "UpdatedName");
        }

        [TestMethod]
        public async Task UpdateShouldUpdateShoppingListWithItems()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            shoppingList.Name = "UpdatedName";

            var result = _repository.Update(shoppingList);
            _context.SaveChanges();

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.IsTrue(result.Items.Count() > 0);
        }

        [TestMethod]
        public async Task DeleteShouldRemoveShoppingList()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            var result = await _repository.Delete(shoppingList.Id);
            _context.SaveChanges();

            var removedShoppingListInRepo = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.IsNull(removedShoppingListInRepo);
        }

        [TestMethod]
        public async Task DeleteShouldReturnNullIfItIsNotInTheRepo()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();

            var result = await _repository.Delete(shoppingList.Id);

            Assert.IsNull(result);
        }
    }
}
