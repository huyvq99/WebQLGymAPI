using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;

namespace Foody.Data.Entities
{
    public class Service : DomainEntity<Guid>, IDateTracking
    {
        public Service() : base() { }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Money { get; set; }
        public Guid CreatedId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public List<Card> Cards { get; set; }
    }
}