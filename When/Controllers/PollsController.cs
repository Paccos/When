using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using When.Models;

namespace When.Controllers
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
            if (poll.UserSelections == null || poll.UserSelections.Count == 0)
            {
                return BadRequest("UserSelection for a new Poll must not be empty");
            }

            if (poll.Title == null || poll.Title.Trim().Equals(""))
            {
                return BadRequest("Poll Title must not be empty");
            }

            var userSelection = poll.UserSelections.First();
            userSelection.DateSelections = userSelection.DateSelections.OrderBy(ds => ds.Date).ToList();

            await _context.Polls.AddAsync(poll);

            poll.AuthorId = userSelection.Id;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPollAsync), new { id = poll.Id }, poll);
        }
    }
}