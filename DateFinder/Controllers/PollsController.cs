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

            return poll == null ? NotFound() : (ActionResult<Poll>)poll;
        }

        // POST: api/Polls
        [HttpPost]
        public async Task<ActionResult<Poll>> PostPoll(Poll poll)
        {
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

            poll.UserSelections.Add(selection);

            _context.Entry(poll).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPollAsync), new { id = id }, selection);
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
