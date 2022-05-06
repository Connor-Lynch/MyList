using MediatR;
using Microsoft.AspNetCore.Mvc;
using MyList.Entity;
using MyList.List.Requests.Commands;
using System;
using System.Threading.Tasks;

namespace MyList.Api.Controllers
{
    [Route("api/ShoppingListItems")]
    public class ShoppingListItemController : ControllerBase
    {
        private IMediator _mediator;

        public ShoppingListItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddList([FromBody] AddShoppingListItemCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateList([FromBody] ShoppingListItem item)
        {
            var command = new UpdateShoppingListItemCommand() 
            { 
                Item = item
            };

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteList(Guid id)
        {
            var command = new DeleteShoppingListItemCommand()
            {
                Id = id
            };

            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
