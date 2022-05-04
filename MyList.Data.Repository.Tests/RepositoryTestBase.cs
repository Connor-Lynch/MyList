using Microsoft.EntityFrameworkCore;
using MyList.Data.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.Data.Repository.Tests
{
    public class RepositoryTestBase
    {
        public MyListContext _context;

        public void BaseInit()
        {
            var contextOptions = new DbContextOptionsBuilder<MyListContext>()
                .UseInMemoryDatabase("MyList")
                .Options;

            _context = new MyListContext(contextOptions);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        public void BaseCleanup()
        {
            _context.Dispose();
        }

        public void Seed<T>(T item) where T : class
        {
            _context.Set<T>().Add(item);
            _context.SaveChanges();
        }

        public void SeedMany(List<object> items)
        {
            items.ForEach(i => Seed(i));
        }
    }
}
