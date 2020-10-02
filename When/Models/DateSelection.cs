using System;
using Microsoft.EntityFrameworkCore;

namespace When.Models
{
    [Owned]
    public class DateSelection
    {
        private DateTime _date;

        public DateTime Date
        {
            get => new DateTime(_date.Year, _date.Month, _date.Day, 12, 00, 00); // We don't care for the exact time, only the date
            set => _date = new DateTime(value.Year, value.Month, value.Day, 12, 00, 00);
        }

        public SelectionState State { get; set; }
    }
}
