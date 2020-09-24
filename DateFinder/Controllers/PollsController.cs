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
        private readonly PollContext _context;

        public PollsController(PollContext context)
        {
            _context = context;
        }

        // GET: api/Polls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poll>> GetPollAsync(Guid id)
        {
            var poll = await _context.Polls.FindAsync(id);

            if (poll == null)
            {
                return NotFound();
            }

            await _context.Entry(poll).Collection(p => p.UserSelections).LoadAsync();

            poll.UserSelections.ForEach(us => us.DateSelections = us.DateSelections.OrderBy(ds => ds.Date).ToList());

            return poll;
        }

        // POST: api/Polls
        [HttpPost]
        public async Task<ActionResult<Poll>> PostPoll(Poll poll)
        {
            var userSelection = poll.UserSelections.First();
            userSelection.DateSelections = userSelection.DateSelections.OrderBy(ds => ds.Date).ToList();

            _context.Polls.Add(poll);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPollAsync), new { id = poll.Id }, poll);
        }

        // POST: api/Polls/5
        [HttpPost("{id}")]
        public async Task<ActionResult<UserSelection>> PostDateSelectionAsync(Guid id, UserSelection selection)
        {
            var poll = await _context.Polls.FindAsync(id);

            if (poll == null)
            {
                return NotFound();
            }

            await _context.Entry(poll).Collection(p => p.UserSelections).LoadAsync();
            poll.UserSelections.Add(selection);

            _context.Entry(poll).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPollAsync), new { id = id }, selection);
        }

        // PUT: api/Polls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDateSelection(Guid id, UserSelection selection)
        {

            if (id != selection.Id)
            {
                return BadRequest();
            }

            var selectionToUpdate = await _context.UserSelections.FirstOrDefaultAsync(us => us.Id == selection.Id);

            if (selectionToUpdate == null)
            {
                return NotFound();
            }
            
            selectionToUpdate.DateSelections = selection.DateSelections.OrderBy(ds => ds.Date).ToList();
            selectionToUpdate.Name = selection.Name;

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

        private bool UserSelectionExists(Guid id)
        {
            return _context.UserSelections.Any(e => e.Id == id);
        }
    }
}
