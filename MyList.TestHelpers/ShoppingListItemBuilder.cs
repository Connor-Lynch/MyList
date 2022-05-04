using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.TestHelpers
{
    public class ShoppingListItemBuilder
    {
        private Guid _id = Guid.NewGuid();
        private string _name = "DefaultItemName";

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

        public ShoppingListItemBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public ShoppingListItem Build()
        {
            return new ShoppingListItem() 
            { 
                Id = _id,
                Name = _name
            };
        }
    }
}
