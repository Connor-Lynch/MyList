using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class DeleteShoppingListItemCommandHandler : IRequestHandler<DeleteShoppingListItemCommand, ShoppingList>
    {
        private IShoppingListItemRepository _shoppingListItemRepository;

        public DeleteShoppingListItemCommandHandler(IShoppingListItemRepository shoppingListItemRepository)
        {
            _shoppingListItemRepository = shoppingListItemRepository;
        }

        public async Task<ShoppingList> Handle(DeleteShoppingListItemCommand request, CancellationToken cancellationToken)
        {
            var result = await _shoppingListItemRepository.Delete(request.Id);
            await _shoppingListItemRepository.UnitOfWork.SaveEntitiesAsync();

            return result;
        }
    }
}
