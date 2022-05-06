using MediatR;
using MyList.Entity;
using MyList.Entity.Interfaces;
using MyList.List.Requests.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.List.Handlers
{
    public class AddShoppingListItemCommandHandler : IRequestHandler<AddShoppingListItemCommand, ShoppingList>
    {
        private IShoppingListItemRepository _shoppingListItemRepository;

        public AddShoppingListItemCommandHandler(IShoppingListItemRepository shoppingListItemRepository)
        {
            _shoppingListItemRepository = shoppingListItemRepository;
        }

        public async Task<ShoppingList> Handle(AddShoppingListItemCommand request, CancellationToken cancellationToken)
        {
            var newShoppingListItem = new ShoppingListItem()
            {
                Name = request.Name,
                ShoppingListId = request.ShoppingListId,
            };

            var result = await _shoppingListItemRepository.Add(newShoppingListItem);
            await _shoppingListItemRepository.UnitOfWork.SaveEntitiesAsync();

            return result;
        }
    }
}
