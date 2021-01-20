using Foody.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TKGymManager.Data.Configurations
{
    public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.ToTable(" Permissions");
            builder.HasKey(t => t.AccountId);
            builder.Property(t => t.AccountId).IsRequired();
            builder.HasOne(x => x.Function).WithMany(x => x.Permissions).HasForeignKey(x => x.FunctionId);
        }
    }
}
