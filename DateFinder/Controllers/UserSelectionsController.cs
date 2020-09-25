using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DateFinder.Models;

namespace DateFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSelectionsController : ControllerBase
    {
        private readonly PollContext _context;

        public UserSelectionsController(PollContext context)
        {
            _context = context;
        }

        // GET: api/UserSelections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserSelection>> GetUserSelection(Guid id)
        {
            var userSelection = await _context.UserSelections.FindAsync(id);

            if (userSelection == null)
            {
                return NotFound();
            }

            return userSelection;
        }

        // PUT: api/UserSelections/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSelection(Guid id, UserSelection userSelection)
        {
            if (id != userSelection.Id)
            {
                return BadRequest();
            }

            var selectionToUpdate = await _context.UserSelections.FirstOrDefaultAsync(us => us.Id == userSelection.Id);

            if (selectionToUpdate == null)
            {
                return NotFound();
            }

            selectionToUpdate.DateSelections = userSelection.DateSelections.OrderBy(ds => ds.Date).ToList();
            selectionToUpdate.Name = userSelection.Name;

            _context.Entry(selectionToUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserSelectionExists(id))
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

        // POST: api/UserSelections
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserSelection>> PostUserSelection(UserSelection userSelection)
        {
            _context.UserSelections.Add(userSelection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserSelection", new { id = userSelection.Id }, userSelection);
        }

        // DELETE: api/UserSelections/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserSelection>> DeleteUserSelection(Guid id)
        {
            var userSelection = await _context.UserSelections.FindAsync(id);
            if (userSelection == null)
            {
                return NotFound();
            }

            _context.UserSelections.Remove(userSelection);
            await _context.SaveChangesAsync();

            return userSelection;
        }

        private bool UserSelectionExists(Guid id)
        {
            return _context.UserSelections.Any(e => e.Id == id);
        }
    }
}
