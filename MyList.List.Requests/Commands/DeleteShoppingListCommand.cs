using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Commands
{
    public class DeleteShoppingListCommand : IRequest<ShoppingList>
    {
        public Guid Id { get; set; }
    }
}
