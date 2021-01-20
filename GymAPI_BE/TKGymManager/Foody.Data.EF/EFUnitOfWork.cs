using Foody.Infrastructure.Interfaces;

namespace Foody.Data.EF
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private readonly TKGymDbContext _context;

        public EFUnitOfWork(TKGymDbContext context)
        {
            this._context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
