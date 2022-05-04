using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Commands
{
    public class UpdateShoppingListCommand : IRequest<ShoppingList>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<ShoppingListItem> Items { get; set; }
    }
}
