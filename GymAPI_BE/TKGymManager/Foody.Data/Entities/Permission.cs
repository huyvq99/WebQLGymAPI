using Foody.Data.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Foody.Data.Entities
{
    public class Permission: IHasSoftDelete
    {
        [Key]
        [Column(Order = 0)]
        [ForeignKey("AccountId")]
        public Guid AccountId { get; set; }
        public Account Account { get; set; }


        [Key]
        [Column(Order = 1)]
        [ForeignKey("FunctionId")]
        public Guid FunctionId { get; set; }
        public Function Function { get; set; }



        [Required]
        public bool IsDeleted { get; set; }
    }
}
