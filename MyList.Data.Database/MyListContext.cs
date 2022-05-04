using Microsoft.EntityFrameworkCore;
using MyList.Entity;
using MyList.Entity.Infrastructure;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MyList.Data.Database
{
    public class MyListContext : DbContext, IUnitOfWork
    {
        public MyListContext(DbContextOptions<MyListContext> options)
            : base(options)
        { }

        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
        {
            var result = await base.SaveChangesAsync();
            return true;
        }
    }
}
