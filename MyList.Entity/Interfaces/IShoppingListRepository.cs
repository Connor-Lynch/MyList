using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MyList.Entity.Interfaces.IRepository;

namespace MyList.Entity.Interfaces
{
    public interface IShoppingListRepository : IRepository<ShoppingList>
    {
        IQueryable<ShoppingList> GetAll();
        ShoppingList Add(ShoppingList list);
        Task<ShoppingList> GetById(Guid id);
        Task<ShoppingList> Update(Guid id, string name, List<ShoppingListItem> items);
        Task<ShoppingList> Delete(Guid id);
    }
}
