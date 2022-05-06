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
            return _context.ShoppingLists
                .Include(s => s.Items);
        }

        public Task<ShoppingList?> GetById(Guid id)
        {
            var result = _context.ShoppingLists.Where(l => l.Id == id)
                .Include(s => s.Items)
                .SingleOrDefaultAsync();

            return result;
        }

        public ShoppingList Add(ShoppingList list)
        {
            var result = _context.ShoppingLists.Add(list);

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
    }
}
