using System;
using Microsoft.EntityFrameworkCore;

namespace When.Models
{
    public class PollContext : DbContext
    {
        public PollContext(DbContextOptions<PollContext> options) : base(options)
        {
        }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<UserSelection> UserSelections { get; set; }
    }
}
