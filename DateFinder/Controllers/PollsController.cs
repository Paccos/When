using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DateFinder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DateFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollsController : ControllerBase
    {
        // GET: api/Polls/5
        [HttpGet("{id}")]
        public IEnumerable<UserSelection> Get(int id)
        {
            Console.WriteLine(id);

            return new UserSelection[] {
                new UserSelection {
                    Name = "Max Mustermann",
                    DateSelections = new DateSelection[] {
                        new DateSelection { Date = new DateTime(2020, 8, 20), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 21), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 22), State = SelectionState.Maybe },
                        new DateSelection { Date = new DateTime(2020, 8, 24), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 26), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 28), State = SelectionState.Maybe },
                    }
                },

                new UserSelection {
                    Name = "Patryk Pekala",
                    DateSelections = new DateSelection[] {
                        new DateSelection { Date = new DateTime(2020, 8, 20), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 21), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 22), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 24), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 26), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 28), State = SelectionState.Yes },
                    }
                },

                new UserSelection {
                    Name = "Benjamin Blümchen",
                    DateSelections = new DateSelection[] {
                        new DateSelection { Date = new DateTime(2020, 8, 20), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 21), State = SelectionState.No },
                        new DateSelection { Date = new DateTime(2020, 8, 22), State = SelectionState.Maybe },
                        new DateSelection { Date = new DateTime(2020, 8, 24), State = SelectionState.Maybe },
                        new DateSelection { Date = new DateTime(2020, 8, 26), State = SelectionState.Yes },
                        new DateSelection { Date = new DateTime(2020, 8, 28), State = SelectionState.Yes },
                    }
                },
            };
        }

        // POST: api/Polls
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
