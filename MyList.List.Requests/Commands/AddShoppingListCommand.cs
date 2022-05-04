using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Commands
{
    public class AddShoppingListCommand : IRequest<ShoppingList>
    {
        public string Name { get; set; }
        public List<ShoppingListItem> Items { get; set; }
    }
}
