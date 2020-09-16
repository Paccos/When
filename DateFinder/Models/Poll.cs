using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DateFinder.Models
{
    public class Poll
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public List<UserSelection> UserSelections { get; set; }
    }
}
