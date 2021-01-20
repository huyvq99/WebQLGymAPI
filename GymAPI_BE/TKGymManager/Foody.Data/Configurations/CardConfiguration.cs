using Foody.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace TKGymManager.Data.Configurations
{
    public class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.ToTable("Cards");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id);
            builder.Property(p => p.Id).IsRequired(true);
            builder.Property(p => p.Price).IsRequired(true);
            builder.HasOne(x => x.CardType).WithMany(x => x.Cards).HasForeignKey(x => x.CardTypeId);
            builder.HasOne(x => x.Account).WithMany(x => x.Cards).HasForeignKey(x => x.AccountId);
            builder.HasOne(x => x.Facility).WithMany(x => x.Cards).HasForeignKey(x => x.FacilityId);
            builder.HasOne(x => x.Service).WithMany(x => x.Cards).HasForeignKey(x => x.ServiceId);

        }
    }
}
