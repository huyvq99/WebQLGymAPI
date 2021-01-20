using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;

namespace Foody.Data.Entities
{
    public class CardType : DomainEntity<Guid>, IDateTracking
    {
        public CardType() : base() { }
        public string NameType { set; get; }
        public string Description { set; get; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public List<Card> Cards { get; set; }
    }
}