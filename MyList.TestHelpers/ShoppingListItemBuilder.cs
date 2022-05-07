using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.TestHelpers
{
    public class ShoppingListItemBuilder
    {
        private Guid _id = Guid.NewGuid();
        private Guid _shoppingListId = Guid.NewGuid();
        private string _name = "DefaultItemName";
        private bool _isChecked = false;
        private int _sortOrder = 1;

        public ShoppingListItemBuilder()
        { }

        public static ShoppingListItemBuilder Create()
        {
            return new ShoppingListItemBuilder();
        }

        public ShoppingListItemBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public ShoppingListItemBuilder WithIdShoppingListID(Guid id)
        {
            _shoppingListId = id;
            return this;
        }

        public ShoppingListItemBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public ShoppingListItemBuilder WithIsChecked()
        {
            _isChecked = true;
            return this;
        }

        public ShoppingListItemBuilder WithSortOrder(int sortOrder)
        {
            _sortOrder = sortOrder;
            return this;
        }

        public ShoppingListItem Build()
        {
            return new ShoppingListItem() 
            { 
                Id = _id,
                ShoppingListId = _shoppingListId,
                Name = _name,
                IsChecked = _isChecked,
                SortOrder = _sortOrder
            };
        }
    }
}
