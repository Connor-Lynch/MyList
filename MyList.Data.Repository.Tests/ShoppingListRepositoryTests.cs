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
        public async Task GetAllShouldReturnACollectionOfShoppingLists()
        {
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = _repository.GetAll();

            Assert.IsInstanceOfType(result, typeof(IQueryable<ShoppingList>));
            Assert.AreEqual(result.Count(), 2);
        }

        [TestMethod]
        public async Task GetAllShouldReturnACollectionOfShoppingListsOrderByDateWithTheNewestFirst()
        {
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().WithCreatedDate(DateTime.Now.AddMinutes(-1)).Build(),
                ShoppingListBuilder.Create().WithName("Oldest").WithCreatedDate(DateTime.Now.AddDays(-1)).Build(),
                ShoppingListBuilder.Create().WithName("Newest").Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = await _repository.GetAll().ToListAsync();

            Assert.AreEqual(result.First().Name, "Newest");
            Assert.AreEqual(result.Last().Name, "Oldest");
        }

        [TestMethod]
        public async Task GetAllShouldReturnACollectionOfShoppingListsWithItems()
        {
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = _repository.GetAll();

            Assert.IsInstanceOfType(result.First().Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.First().Items.Count(), 1);
        }

        [TestMethod]
        public async Task GetAllShouldReturnACollectionOfShoppingListsWithSortedItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };

            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().WithItems(shoppingListItem).Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = _repository.GetAll();

            Assert.IsTrue(result.First().Items[0].SortOrder == 1);
            Assert.IsTrue(result.First().Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task GetByIdShouldReturnShoppingList()
        {
            var expectedShoppingListResult = ShoppingListBuilder.Create().Build();

            var shoppingListsToSeed = new List<ShoppingList>()
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

            var shoppingListsToSeed = new List<ShoppingList>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = await _repository.GetById(expectedShoppingListResult.Id);

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
        }

        [TestMethod]
        public async Task GetByIdShouldReturnShoppingListWithItemsOfSortedItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var expectedShoppingListResult = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().WithItems(shoppingListItem).Build()
            };

            SeedMany(shoppingListsToSeed);

            var result = await _repository.GetById(expectedShoppingListResult.Id);

            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task AddShouldAddShoppingList()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            
            var result = _repository.Add(shoppingList);
            _context.SaveChanges();

            var newShoppingListInReop = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.AreEqual(shoppingList, newShoppingListInReop);
        }

        [TestMethod]
        public async Task AddShouldAddShoppingListWithItems()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();

            var result = _repository.Add(shoppingList);
            _context.SaveChanges();

            var newShoppingListInReop = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
            Assert.AreEqual(newShoppingListInReop.Items.Count(), 1);
        }

        [TestMethod]
        public async Task AddShouldAddShoppingListWithSortedItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();

            var result = _repository.Add(shoppingList);

            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task UpdateNameShouldUpdateShoppingList()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            shoppingList.Name = "UpdatedName";

            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);
            _context.SaveChanges();

            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.AreEqual(shoppingList, updatedShoppingListInRepository);
            Assert.AreEqual(updatedShoppingListInRepository.Name, "UpdatedName");
        }

        [TestMethod]
        public async Task UpdateNameShouldUpdateShoppingListAndNotEffectItems()
        {
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            shoppingList.Name = "UpdatedName";

            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);
            _context.SaveChanges();

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
        }

        [TestMethod]
        public async Task UpdateNameShouldUpdateShoppingListWithSortEdItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();
            Seed(shoppingList);

            shoppingList.Name = "UpdatedName";

            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);

            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
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
        public async Task DeleteShouldRemoveShoppingListItem()
        {
            var shoppingListItem = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create()
                .WithId(shoppingListItem.ShoppingListId)
                .WithItems(new List<ShoppingListItem>() { shoppingListItem })
                .Build();

            Seed(shoppingList);

            var result = await _repository.Delete(shoppingList.Id);
            _context.SaveChanges();

            var removedShoppingListItemInRepo = await _context.ShoppingListItems.SingleOrDefaultAsync(i => i.Id == shoppingListItem.Id);

            Assert.IsNull(removedShoppingListItemInRepo);
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
