using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Commands
{
    public class UpdateShoppingListItemCommand : IRequest<ShoppingList>
    {
        public ShoppingListItem Item { get; set; }
    }
}
