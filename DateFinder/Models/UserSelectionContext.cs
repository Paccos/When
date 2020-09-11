using System;
using Microsoft.EntityFrameworkCore;

namespace DateFinder.Models
{
    public class UserSelectionContext : DbContext
    {
        public UserSelectionContext(DbContextOptions<UserSelectionContext> options) : base(options)
        {
        }

        public DbSet<UserSelection> UserSelections { get; set; }
    }
}
