using System;
using System.Collections.Generic;

namespace When.Models
{
    public class UserSelection
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<DateSelection> DateSelections { get; set; }

        public Guid PollId { get; set; }
        public Poll Poll { get; set; }
    }
}
