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
        public async Task GetAll_ShoppingLists_ReturnsACollectionOfShoppingLists()
        {
            // Arrange
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };
            SeedMany(shoppingListsToSeed);

            // Act
            var result = await Task.FromResult(_repository.GetAll());

            // Assert
            Assert.IsInstanceOfType(result, typeof(IQueryable<ShoppingList>));
            Assert.AreEqual(result.Count(), 2);
        }

        [TestMethod]
        public async Task GetAll_ShoppingListItems_ReturnsACollectionOfShoppingListsOrderByDateWithTheNewestFirst()
        {
            // Arrange
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().WithCreatedDate(DateTime.Now.AddMinutes(-1)).Build(),
                ShoppingListBuilder.Create().WithName("Oldest").WithCreatedDate(DateTime.Now.AddDays(-1)).Build(),
                ShoppingListBuilder.Create().WithName("Newest").Build()
            };
            SeedMany(shoppingListsToSeed);

            // Act
            var result = await _repository.GetAll().ToListAsync();

            // Assert
            Assert.AreEqual(result.First().Name, "Newest");
            Assert.AreEqual(result.Last().Name, "Oldest");
        }

        [TestMethod]
        public async Task GetAll_ShoppingLists_ReturnsACollectionOfShoppingListsWithItems()
        {
            // Arrange
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                ShoppingListBuilder.Create().Build(),
                ShoppingListBuilder.Create().Build()
            };
            SeedMany(shoppingListsToSeed);

            // Act
            var result = await _repository.GetAll().ToListAsync();

            // Assert
            Assert.IsInstanceOfType(result.First().Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.First().Items.Count(), 1);
        }

        [TestMethod]
        public async Task GetAll_ShoppingLists_ReturnsACollectionOfShoppingListsWithSortedItems()
        {
            // Arrange
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

            // Act
            var result = await _repository.GetAll().ToListAsync();

            // Assert
            Assert.IsTrue(result.First().Items[0].SortOrder == 1);
            Assert.IsTrue(result.First().Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task GetById_ShoppingList_ReturnsShoppingList()
        {
            // Arrange
            var expectedShoppingListResult = ShoppingListBuilder.Create().Build();
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().Build()
            };
            SeedMany(shoppingListsToSeed);

            // Act
            var result = await _repository.GetById(expectedShoppingListResult.Id);

            // Assert
            Assert.AreEqual(expectedShoppingListResult, result);
        }

        [TestMethod]
        public async Task GetById_ShoppingList_ReturnsShoppingListWithItems()
        {
            // Arrange
            var expectedShoppingListResult = ShoppingListBuilder.Create().Build();
            var shoppingListsToSeed = new List<ShoppingList>()
            {
                expectedShoppingListResult,
                ShoppingListBuilder.Create().Build()
            };
            SeedMany(shoppingListsToSeed);

            // Act
            var result = await _repository.GetById(expectedShoppingListResult.Id);

            // Assert
            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
        }

        [TestMethod]
        public async Task GetById_ShoppingList_ReturnsShoppingListWithSortedItems()
        {
            // Arrange
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

            // Act
            var result = await _repository.GetById(expectedShoppingListResult.Id);

            // Assert
            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task Add_ShoppingList_InsertsShoppingList()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();
            
            // Act
            var result = _repository.Add(shoppingList);
            _context.SaveChanges();

            // Assert
            var newShoppingListInReop = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.AreEqual(shoppingList, newShoppingListInReop);
        }

        [TestMethod]
        public async Task Add_ShoppingList_InsertsShoppingListWithItems()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();

            // Act
            var result = _repository.Add(shoppingList);
            _context.SaveChanges();

            // Assert
            var newShoppingListInReop = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
            Assert.AreEqual(newShoppingListInReop.Items.Count(), 1);
        }

        [TestMethod]
        public async Task Add_ShoppingList_AddsShoppingListWithSortedItems()
        {
            // Arrange
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();

            // Act
            var result = await Task.FromResult(_repository.Add(shoppingList));

            // Assert
            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task UpdateName_ShoppingList_UpdatesShoppingList()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);
            shoppingList.Name = "UpdatedName";

            // Act
            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);
            _context.SaveChanges();

            // Assert
            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.AreEqual(shoppingList, updatedShoppingListInRepository);
            Assert.AreEqual(updatedShoppingListInRepository.Name, "UpdatedName");
        }

        [TestMethod]
        public async Task UpdateName_ShoppingList_UpdatesShoppingListAndNotEffectItems()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);
            shoppingList.Name = "UpdatedName";

            // Act
            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);
            _context.SaveChanges();

            // Assert
            Assert.IsInstanceOfType(result.Items, typeof(List<ShoppingListItem>));
            Assert.AreEqual(result.Items.Count(), 1);
        }

        [TestMethod]
        public async Task UpdateName_ShoppingList_UpdatesShoppingListWithSortedItems()
        {
            // Arrange
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();
            Seed(shoppingList);
            shoppingList.Name = "UpdatedName";

            // Act
            var result = await _repository.UpdateName(shoppingList.Id, shoppingList.Name);

            // Assert
            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task Delete_ShoppingList_RemovesShoppingList()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();
            Seed(shoppingList);

            // Act
            var result = await _repository.Delete(shoppingList.Id);
            _context.SaveChanges();

            // Assert
            var removedShoppingListInRepo = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.AreEqual(shoppingList, result);
            Assert.IsNull(removedShoppingListInRepo);
        }

        [TestMethod]
        public async Task Delete_ShoppingList_RemovesShoppingListItems()
        {
            // Arrange
            var shoppingListItem = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create()
                .WithId(shoppingListItem.ShoppingListId)
                .WithItems(new List<ShoppingListItem>() { shoppingListItem })
                .Build();
            Seed(shoppingList);

            // Act
            var result = await _repository.Delete(shoppingList.Id);
            _context.SaveChanges();

            // Assert
            var removedShoppingListItemInRepo = await _context.ShoppingListItems.SingleOrDefaultAsync(i => i.Id == shoppingListItem.Id);

            Assert.IsNull(removedShoppingListItemInRepo);
        }

        [TestMethod]
        public async Task Delete_ShoppingListNotFound_ReturnsNull()
        {
            // Arrange
            var shoppingList = ShoppingListBuilder.Create().Build();

            // Act
            var result = await _repository.Delete(shoppingList.Id);

            // Assert
            Assert.IsNull(result);
        }
    }
}
