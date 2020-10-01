using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DateFinder.Models
{
    public class Poll
    {
        public Guid Id { get; set; }

        [ForeignKey("UserSelection")]
        public Guid AuthorId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public List<UserSelection> UserSelections { get; set; }
    }
}
