using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MyList.Data.Database
{
    class MyListContextFactory : IDesignTimeDbContextFactory<MyListContext>
    {
        public MyListContext CreateDbContext(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            builder.AddEnvironmentVariables();
            var configuration = builder.Build();

            var optionsBuilder = new DbContextOptionsBuilder<MyListContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new MyListContext(optionsBuilder.Options);
        }
    }
}
