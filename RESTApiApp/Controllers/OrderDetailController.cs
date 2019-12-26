using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RESTApiApp.Models;
using System.Linq.Dynamic.Core;

namespace RESTApiApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public OrderDetailController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetailsData>>> Get()
        {
            return await _context.OrderDetailsData.ToListAsync();
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsData>> Get(int id)
        {
            var orderDetailsData = await _context.OrderDetailsData.FindAsync(id);

            if (orderDetailsData == null)
            {
                return NotFound();
            }

            return orderDetailsData;
        }

        // PUT: api/OrderDetail/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, OrderDetailsData orderDetailsData)
        {
            if (id != orderDetailsData.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(orderDetailsData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailsDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderDetail
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<OrderDetailsData>> Post(OrderDetailsData orderDetailsData)
        {
            _context.OrderDetailsData.Add(orderDetailsData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderDetailsDataExists(orderDetailsData.OrderId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrderDetailsData", new { id = orderDetailsData.OrderId }, orderDetailsData);
        }

        // DELETE: api/OrderDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderDetailsData>> DeleteOrderDetailsData(int id)
        {
            var orderDetailsData = await _context.OrderDetailsData.FindAsync(id);
            if (orderDetailsData == null)
            {
                return NotFound();
            }

            _context.OrderDetailsData.Remove(orderDetailsData);
            await _context.SaveChangesAsync();

            return orderDetailsData;
        }

        private bool OrderDetailsDataExists(int id)
        {
            return _context.OrderDetailsData.Any(e => e.OrderId == id);
        }

        // GET: api/OrderDetail
        [HttpPost]
        public async Task<ActionResult<IEnumerable<OrderDetailsData>>> Search(SearchCriteria search)
        {
            try
            {
                if (search.Expression.Length > 0)
                {
                    String[] spearator = { "==" };
                    string[] field = search.Expression.Split("==");
                    var res = await _context.OrderDetailsData
                        .Where($"{field[0]}==@0", field[1])
                        .Select(o => o).ToListAsync();
                    return res;
                }
                else
                {
                   return await _context.OrderDetailsData.ToListAsync();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
