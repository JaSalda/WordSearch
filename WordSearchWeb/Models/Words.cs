using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WordSearchWeb.Models
{
    public class Words
    {
        public int Id { get; set; }
        [Required]
        [StringLength(14,ErrorMessage = "your word is too short", MinimumLength = 3)]
        public string myWords { get; set; }
        [Required]
        [Range(1,13,ErrorMessage ="Your size must be between 1 and 13")]
        public int mySize { get; set; }
    }

}
