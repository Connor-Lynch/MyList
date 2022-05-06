using MediatR;
using Microsoft.AspNetCore.Mvc;
using MyList.List.Requests.Commands;
using MyList.List.Requests.Requests;
using System;
using System.Threading.Tasks;

namespace MyList.Api.Controllers
{
    [Route("api/ShoppingLists")]
    public class ShoppingListController : ControllerBase
    {
        private IMediator _mediator;

        public ShoppingListController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLists()
        {
            var request = new GetAllShoppingListsRequest();

            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetList(Guid id)
        {
            var request = new GetShoppingListByIdRequest()
            {
                Id = id
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddList([FromBody] AddShoppingListCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateList([FromBody] UpdateShoppingListCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteList(Guid id)
        {
            var command = new DeleteShoppingListCommand()
            {
                Id = id
            };

            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
