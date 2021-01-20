using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TKGymManager.Data.Entities;

namespace TKGymManager.Data.Configurations
{
    public class BillConfiguration : IEntityTypeConfiguration<Bill>
    {
        public void Configure(EntityTypeBuilder<Bill> builder)
        {
            builder.ToTable("Bills");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id);
            builder.Property(p => p.Id).IsRequired(true);
            builder.Property(p => p.Name).IsRequired(true);
            builder.HasOne(x => x.Card).WithMany(x => x.Bills).HasForeignKey(x => x.CardId);
        }
    }
}
