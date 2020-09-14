using System;
using System.Collections.Generic;

namespace DateFinder.Models
{
    public class UserSelection
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<DateSelection> DateSelections { get; set; }
    }
}
