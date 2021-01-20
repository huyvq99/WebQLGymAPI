using Foody.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TKGymManager.Data.Configurations
{
    public class CardTypeConfiguration : IEntityTypeConfiguration<CardType>
    {
        public void Configure(EntityTypeBuilder<CardType> builder)
        {
            builder.ToTable("CardTypes");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).IsRequired();
        }
    }
}
