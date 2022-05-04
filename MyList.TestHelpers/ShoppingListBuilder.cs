using MyList.Entity;
using System;
using System.Collections.Generic;

namespace MyList.TestHelpers
{
    public class ShoppingListBuilder
    {
        private Guid _id = Guid.NewGuid();
        private string _name = "defaultList";
        private List<ShoppingListItem> _items = new List<ShoppingListItem>() 
        { 
            ShoppingListItemBuilder.Create().Build()
        };

        public ShoppingListBuilder()
        { }

        public static ShoppingListBuilder Create()
        {
            return new ShoppingListBuilder();
        }

        public ShoppingListBuilder WithId(Guid id)
        {
            _id = id;
            return this;
        }

        public ShoppingListBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public ShoppingListBuilder WithItems(List<ShoppingListItem> items)
        {
            _items = items;
            return this;
        }

        public ShoppingListBuilder WithoutItems()
        {
            _items = null;
            return this;
        }

        public ShoppingList Build()
        {
            return new ShoppingList()
            {
                Id = _id,
                Name = _name,
                Items = _items
            };
        }
    }
}
