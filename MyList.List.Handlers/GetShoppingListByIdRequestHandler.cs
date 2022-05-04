using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Requests;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class GetShoppingListByIdRequestHandler : IRequestHandler<GetShoppingListByIdRequest, ShoppingList>
    {
        private IShoppingListRepository _shoppingListRepository;
        public GetShoppingListByIdRequestHandler(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<ShoppingList> Handle(GetShoppingListByIdRequest request, CancellationToken cancellationToken)
        {
            var list = await _shoppingListRepository.GetById(request.Id);

            return list;
        }
    }
}
