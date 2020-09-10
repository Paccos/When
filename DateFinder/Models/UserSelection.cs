using System;
using System.Collections.Generic;

namespace DateFinder.Models
{
    public class UserSelection
    {
        public string Name { get; set; }
        public IEnumerable<DateSelection> DateSelections { get; set; }
    }
}
