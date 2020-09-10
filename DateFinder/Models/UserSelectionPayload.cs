using System;
using System.Collections.Generic;

namespace DateFinder.Models
{
    public class UserSelectionPayload
    {
        public string Name { get; set; }
        public IEnumerable<DateSelection> DateSelections { get; set; }
    }
}
