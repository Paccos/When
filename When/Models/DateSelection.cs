using System;
using Microsoft.EntityFrameworkCore;

namespace When.Models
{
    [Owned]
    public class DateSelection
    {
        public DateTime Date { get; set; }
        public SelectionState State { get; set; }
    }
}
