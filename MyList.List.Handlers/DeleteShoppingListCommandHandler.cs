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
    public class DeleteShoppingListCommandHandler : IRequestHandler<DeleteShoppingListCommand, ShoppingList>
    {
        private IShoppingListRepository _shoppingListRepository;

        public DeleteShoppingListCommandHandler(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<ShoppingList> Handle(DeleteShoppingListCommand request, CancellationToken cancellationToken)
        {
            var result = await _shoppingListRepository.Delete(request.Id);

            await _shoppingListRepository.UnitOfWork.SaveEntitiesAsync();

            return result;
        }
    }
}
