using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class UpdateShoppingListItemCommandHandler : IRequestHandler<UpdateShoppingListItemCommand, ShoppingList>
    {
        private IShoppingListItemRepository _shoppingListItemRepository;

        public UpdateShoppingListItemCommandHandler(IShoppingListItemRepository shoppingListItemRepository)
        {
            _shoppingListItemRepository = shoppingListItemRepository;
        }

        public async Task<ShoppingList> Handle(UpdateShoppingListItemCommand request, CancellationToken cancellationToken)
        {
            var result = await _shoppingListItemRepository.Update(request.Item);
            await _shoppingListItemRepository.UnitOfWork.SaveEntitiesAsync();

            return result;
        }
    }
}
