using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class GetAllShoppingListsRequestHandler : IRequestHandler<GetAllShoppingListsRequest, IEnumerable<ShoppingList>>
    {
        private IShoppingListRepository _shoppingListRepository;

        public GetAllShoppingListsRequestHandler(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<IEnumerable<ShoppingList>> Handle(GetAllShoppingListsRequest request, CancellationToken cancellationToken)
        {
            var lists = _shoppingListRepository.GetAll();;

            return await Task.FromResult(lists);
        }
    }
}
