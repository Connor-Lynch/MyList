using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static MyList.Entity.Interfaces.IRepository;

namespace MyList.Entity.Interfaces
{
    public interface IShoppingListItemRepository : IRepository<ShoppingListItem>
    {
        Task<ShoppingList> Add(ShoppingListItem item);
        Task<ShoppingList> Update(ShoppingListItem item);
        Task<ShoppingList> Delete(Guid id);
    }
}
