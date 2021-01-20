using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;

namespace Foody.Data.Entities
{
    public class Facility : DomainEntity<Guid>, IDateTracking
    {
        public Facility() : base() { }
        public string FacilityName { get; set; }
        public string Address { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public List<Card> Cards { get; set; }
    }
}