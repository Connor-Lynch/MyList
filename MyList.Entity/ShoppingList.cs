using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.Entity
{
    public class ShoppingList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<ShoppingListItem> Items { get; set; }

        public ShoppingList()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
        }
    }
}
