using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyList.Entity;
using MyList.TestHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyList.Data.Repository.Tests
{
    [TestClass]
    public class ShoppingListItemsRepositoryTests : RepositoryTestBase
    {
        private ShoppingListItemRepository _repository;

        [TestInitialize]
        public void Init()
        {
            BaseInit();
            _repository = new ShoppingListItemRepository(_context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            BaseCleanup();
        }

        [TestMethod]
        public async Task AddShouldAddShoppingListItem()
        {
            var shoppingList = ShoppingListBuilder.Create().WithoutItems().Build();

            Seed(shoppingList);

            var itemToAdd = ShoppingListItemBuilder.Create().WithIdShoppingListID(shoppingList.Id).Build();

            var result = await _repository.Add(itemToAdd);
            _context.SaveChanges();

            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.IsTrue(result.Items.Contains(itemToAdd));
            Assert.IsTrue(updatedShoppingListInRepository.Items.Contains(itemToAdd));
        }

        [TestMethod]
        public async Task AddShouldAddShoppingListItemSortPosition()
        {

            var shoppingList = ShoppingListBuilder.Create().Build();

            Seed(shoppingList);

            var itemToAdd = ShoppingListItemBuilder.Create().WithIdShoppingListID(shoppingList.Id).Build();

            var result = await _repository.Add(itemToAdd);

            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task AddShouldReturnAShoppingListWithSortedItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();

            Seed(shoppingList);

            var itemToAdd = ShoppingListItemBuilder.Create().WithIdShoppingListID(shoppingList.Id).Build();

            var result = await _repository.Add(itemToAdd);

            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[2].SortOrder == 3);
        }

        [TestMethod]
        public async Task UpdateShouldUpdateShoppingListItem()
        {
            var item = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create()
                .WithId(item.Id)
                .WithItems(new List<ShoppingListItem>() { item })
                .Build();

            Seed(shoppingList);

            item.Name = "New Name";

            var result = await _repository.Update(item);
            _context.SaveChanges();

            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.IsTrue(result.Items.Find(i => i.Name == "New Name") != null);
            Assert.IsTrue(updatedShoppingListInRepository.Items.Find(i => i.Name == "New Name") != null);
        }

        [TestMethod]
        public async Task UpdateShouldReturnAShoppingListWithSortedItems()
        {
            var shoppingListItem = new List<ShoppingListItem>()
            {
                ShoppingListItemBuilder.Create().WithSortOrder(2).Build(),
                ShoppingListItemBuilder.Create().WithSortOrder(1).Build()
            };
            var shoppingList = ShoppingListBuilder.Create().WithItems(shoppingListItem).Build();

            Seed(shoppingList);

            shoppingListItem[0].Name = "newName";

            var result = await _repository.Update(shoppingListItem[0]);

            Assert.IsTrue(result.Items[0].SortOrder == 1);
            Assert.IsTrue(result.Items[1].SortOrder == 2);
        }

        [TestMethod]
        public async Task DeleteShouldDeleteShoppingListItem()
        {
            var item = ShoppingListItemBuilder.Create().Build();
            var shoppingList = ShoppingListBuilder.Create()
                .WithId(item.Id)
                .WithItems(new List<ShoppingListItem>() { item })
                .Build();

            Seed(shoppingList);

            var result = await _repository.Delete(item.Id);
            _context.SaveChanges();

            var updatedShoppingListInRepository = await _context.ShoppingLists.SingleOrDefaultAsync(l => l.Id == shoppingList.Id);

            Assert.IsFalse(result.Items.Contains(item));
            Assert.IsFalse(updatedShoppingListInRepository.Items.Contains(item));
        }

        [TestMethod]
        public async Task DeleteShouldReturnNullIfListDoesNotExist()
        {
            var shoppingListId = Guid.NewGuid();
            var item = ShoppingListItemBuilder.Create().WithIdShoppingListID(shoppingListId).Build();

            var result = await _repository.Delete(item.Id);
            _context.SaveChanges();

            Assert.IsNull(result);
        }
    }
}
