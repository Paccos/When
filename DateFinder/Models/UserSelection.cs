using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace DateFinder.Models
{
    [Owned]
    public class UserSelection
    {
        public string Name { get; set; }
        public List<DateSelection> DateSelections { get; set; }
    }
}
