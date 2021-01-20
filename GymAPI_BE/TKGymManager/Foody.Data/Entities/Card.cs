using Foody.Data.Interfaces;
using Foody.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using TKGymManager.Data.Entities;

namespace Foody.Data.Entities
{
    public class Card : DomainEntity<Guid>, IDateTracking
    {
        public Card() : base() { }
        public string Code { get; set; }
        public Guid CardTypeId { set; get; }
        public Guid AccountId { set; get; }
        public Guid FacilityId { get; set; }
        public Guid ServiceId { get; set; }
        public String FacilityName { get; set; }
        public decimal Price { set; get; }
        public int NumOfDay { set; get; }
        public string Note { set; get; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public CardType CardType { get; set; }
        public Account Account { get; set; }
        public Facility Facility { get; set; }
        public Service Service { get; set; }
        public List<Bill> Bills { get; set; }

    }
}