using Foody.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TKGymManager.Data.Configurations
{
    public class EquitmentConfiguration : IEntityTypeConfiguration<Equipment>
    {
        public void Configure(EntityTypeBuilder<Equipment> builder)
        {
            builder.ToTable("Equiments");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id);
            builder.Property(p => p.Id).IsRequired(true);
            builder.Property(p => p.Name).IsRequired(true);
            builder.HasOne(x => x.Account).WithMany(x => x.Equipments).HasForeignKey(x => x.AccountId);
        }
    }
}