using Foody.Data.Entities;
using Foody.Data.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using TKGymManager.Data.Configurations;
using TKGymManager.Data.Entities;

namespace Foody.Data.EF
{
    public class TKGymDbContext : IdentityDbContext<Account, Function, Guid>
    {
        public TKGymDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Account> Accounts { set; get; }
        public DbSet<Permission> Permissions { set; get; }
        public DbSet<Function> Functions { set; get; }

        public DbSet<Bill> Bills { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Card> Cards { get; set; }

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<CardType> CardTypes { get; set; }
        public DbSet<Service> Services { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable(name: "Accounts");
            });

            modelBuilder.Entity<Function>(entity =>
            {
                entity.ToTable(name: "Functions");
            });

            modelBuilder.Entity<Permission>()
                .HasKey(c => new { c.FunctionId, c.AccountId });

            /* modelBuilder.Entity<CartFood>()
             .HasKey(c => new { c.CartId, c.FoodId });*/

            modelBuilder.ApplyConfiguration(new BillConfiguration());
            modelBuilder.ApplyConfiguration(new CardConfiguration());
            modelBuilder.ApplyConfiguration(new CardTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FacilityConfiguration());
            modelBuilder.ApplyConfiguration(new EquitmentConfiguration());

            modelBuilder.ApplyConfiguration(new ServiceConfiguration());


        }

        public override int SaveChanges()
        {
            var modified = ChangeTracker.Entries().Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);
            foreach (EntityEntry item in modified)
            {
                var changedOrAddedItem = item.Entity as IDateTracking;
                if (changedOrAddedItem != null)
                {
                    if (item.State == EntityState.Added)
                    {
                        changedOrAddedItem.DateCreated = DateTime.Now;
                    }
                    changedOrAddedItem.DateModified = DateTime.Now;
                }
            }
            return base.SaveChanges();

        }

        public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<TKGymDbContext>
        {

            public TKGymDbContext CreateDbContext(string[] args)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json").Build();
                var builder = new DbContextOptionsBuilder<TKGymDbContext>();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                builder.UseSqlServer(connectionString);
                return new TKGymDbContext(builder.Options);
            }
        }
    }
}
