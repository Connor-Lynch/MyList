using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Commands
{
    public class AddShoppingListItemCommand : IRequest<ShoppingList>
    {
        public Guid ShoppingListId { get; set; }
        public string Name { get; set; }
    }
}
