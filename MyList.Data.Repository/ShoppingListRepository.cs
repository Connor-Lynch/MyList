using Microsoft.EntityFrameworkCore;
using MyList.Data.Database;
using MyList.Entity;
using MyList.Entity.Infrastructure;
using MyList.Entity.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyList.Data.Repository
{
    public class ShoppingListRepository : RepositoryBase, IShoppingListRepository
    {
        public ShoppingListRepository(MyListContext context):
            base(context)
        { }

        public IQueryable<ShoppingList> GetAll()
        {
            var allLists = _context.ShoppingLists
                .Include(s => s.Items);

            foreach (var list in allLists)
            {
                list.Items = OrderItems(list.Items);
            }

            return allLists;
        }

        public async Task<ShoppingList?> GetById(Guid id)
        {
            var result = await _context.ShoppingLists.Where(l => l.Id == id)
                .Include(s => s.Items)
                .SingleOrDefaultAsync();

            result.Items = OrderItems(result.Items);

            return result;
        }

        public ShoppingList Add(ShoppingList list)
        {
            var result = _context.ShoppingLists.Add(list);

            result.Entity.Items = OrderItems(result.Entity.Items);

            return result.Entity;
        }

        public async Task<ShoppingList> UpdateName(Guid id, string name)
        {
            var shoppingList = await _context.ShoppingLists
                .Where(l => l.Id == id)
                .Include(l => l.Items)
                .SingleOrDefaultAsync();

            if (shoppingList != null)
            {
                shoppingList.Name = name;
            }

            shoppingList.Items = OrderItems(shoppingList.Items);

            return shoppingList;
        }

        public async Task<ShoppingList> Delete(Guid id)
        {
            var listToRemove = await _context.ShoppingLists
                .Where(l => l.Id == id)
                .Include(l => l.Items)
                .SingleOrDefaultAsync();

            if (listToRemove != null)
            {
                return _context.ShoppingLists
                    .Remove(listToRemove)
                    .Entity;
            }

            return listToRemove;
        }

        private List<ShoppingListItem> OrderItems(List<ShoppingListItem> items)
        {
            return items?.OrderBy(i => i.SortOrder).ToList();
        }
    }
}
