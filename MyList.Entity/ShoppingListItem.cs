using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.Entity
{
    public class ShoppingListItem
    {
        public Guid Id { get; set; }
        public Guid ShoppingListId { get; set; }
        public string Name { get; set; }
        public bool IsChecked { get; set; }
        public int SortOrder { get; set; }

        public ShoppingListItem()
        {
            Id = Guid.NewGuid();
        }
    }
}
