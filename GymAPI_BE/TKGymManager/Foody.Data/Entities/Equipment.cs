using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;

namespace Foody.Data.Entities
{
    public class Equipment : DomainEntity<Guid>, IDateTracking
    {
        public Equipment() : base() { }
        public string Name { set; get; }
        public int Amount { set; get; }
        public string Description { set; get; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Guid AccountId { set; get; }
        public Account Account { get; set; }
    }
}