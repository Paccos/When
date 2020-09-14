using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DateFinder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DateFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollsController : ControllerBase
    {
        private readonly UserSelectionContext _context;

        public PollsController(UserSelectionContext context)
        {
            _context = context;
        }

        // GET: api/Polls/5
        [HttpGet("{id}")]
        public async Task<IEnumerable<UserSelection>> GetUserSelectionsAsync(int id)
        {
            Console.WriteLine(id);

            var list = await _context.UserSelections.ToListAsync();

            if (list.Count == 0)
            {
                var selection = new UserSelection
                {
                    Name = "Max Mustermann",
                    DateSelections = new List<DateSelection> {
                        new DateSelection { Date = new DateTime(2020, 8, 20), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 21), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 22), State = SelectionState.Maybe },
                        new DateSelection { Date = new DateTime(2020, 8, 24), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 26), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 28), State = SelectionState.Maybe },
                    }
                };

                await PostDateSelectionAsync(id, selection);
            }

            return await _context.UserSelections.ToListAsync();
        }

        // POST: api/Polls/5
        [HttpPost("{id}")]
        public async Task<ActionResult<UserSelection>> PostDateSelectionAsync(int id, UserSelection selection)
        {
            _context.UserSelections.Add(selection);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserSelectionsAsync), new { id = selection.Id }, selection);
        }

        // PUT: api/Polls/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
