using Microsoft.EntityFrameworkCore;
using MyList.Data.Database;
using MyList.Entity;
using MyList.Entity.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyList.Data.Repository
{
    public class ShoppingListItemRepository : RepositoryBase, IShoppingListItemRepository
    {
        public ShoppingListItemRepository(MyListContext context) 
            : base(context)
        { }

        public async Task<ShoppingList> Add(ShoppingListItem item)
        {
            var result = _context.ShoppingListItems.Add(item);

            return await GetShoppingList(item.ShoppingListId);
        }

        public async Task<ShoppingList> Update(ShoppingListItem item)
        {
            var result = await _context.ShoppingListItems.Where(i => i.Id == item.Id)
                .SingleOrDefaultAsync();

            if (result != null)
            {
                result.Name = item.Name;
            }

            return await GetShoppingList(item.ShoppingListId);
        }

        public async Task<ShoppingList> Delete(Guid id)
        {
            var itemToRemove = await _context.ShoppingListItems
                .Where(i => i.Id == id).FirstOrDefaultAsync();
            if (itemToRemove != null)
            {
                _context.ShoppingListItems
                    .Remove(itemToRemove);

                return await GetShoppingList(itemToRemove.ShoppingListId);
            }

            return null;
        }

        private async Task<ShoppingList> GetShoppingList(Guid listId)
        {
            return await _context.ShoppingLists.Where(l => l.Id == listId)
                .Include(l => l.Items)
                .SingleOrDefaultAsync();
        }
    }
}
