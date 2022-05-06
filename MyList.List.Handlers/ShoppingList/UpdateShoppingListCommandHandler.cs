using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class UpdateShoppingListCommandHandler : IRequestHandler<UpdateShoppingListCommand, ShoppingList>
    {
        private IShoppingListRepository _shoppingListRepository;

        public UpdateShoppingListCommandHandler(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<ShoppingList> Handle(UpdateShoppingListCommand request, CancellationToken cancellationToken)
        {
            var updatedShoppingList = await _shoppingListRepository.UpdateName(request.Id, request.Name);

            await _shoppingListRepository.UnitOfWork.SaveEntitiesAsync();

            return updatedShoppingList;
        }
    }
}
