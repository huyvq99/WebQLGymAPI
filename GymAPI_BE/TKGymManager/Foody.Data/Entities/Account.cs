using Foody.Data.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Foody.Data.Entities
{
    [Table("Acounts")]
    public class Account : IdentityUser<Guid>, IDateTracking
    {

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
        public List<Equipment> Equipments { get; set; }

        public List<Card> Cards { get; set; }

        public List<Permission> Permissions { get; set; }

  
    }
}
