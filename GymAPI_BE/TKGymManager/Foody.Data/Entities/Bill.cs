using Foody.Data.Entities;
using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace TKGymManager.Data.Entities
{
    public class Bill : DomainEntity<Guid>, IDateTracking
    {
        public Bill() : base() { }
        public Guid CardId { set; get; }
        public string Name { set; get; }
        public decimal Money { set; get; }
        public StatusPayEnums StatusPay { set; get; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Card Card { get; set; }

    }
}
