using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class AddShoppingListCommandHandler : IRequestHandler<AddShoppingListCommand, ShoppingList>
    {
        private IShoppingListRepository _shoppingListRepository;

        public AddShoppingListCommandHandler(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<ShoppingList> Handle(AddShoppingListCommand request, CancellationToken cancellationToken)
        {
            var newShoppingList = new ShoppingList()
            {
                Name = request.Name,
                Items = request.Items,
            };

            var result = _shoppingListRepository.Add(newShoppingList);
            await _shoppingListRepository.UnitOfWork.SaveEntitiesAsync();

            return result;
        }
    }
}
