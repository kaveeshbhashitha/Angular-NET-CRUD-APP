using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Models
{
    public class PaymentDetailContext:DbContext
    {
        public PaymentDetailContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
