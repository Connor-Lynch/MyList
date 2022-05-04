using MediatR;
using MyList.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.List.Requests.Requests
{
    public class GetShoppingListByIdRequest : IRequest<ShoppingList>
    {
        public Guid Id { get; set; }
    }
}
