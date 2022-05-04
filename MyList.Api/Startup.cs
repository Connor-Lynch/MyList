using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MyList.Data.Database;
using MyList.Data.Repository;
using MyList.Entity.Infrastructure;
using MyList.Entity.Interfaces;
using MyList.List.Handlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MyList.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyList Api", Version = "v1" });
            });

            ConfigureDatabase(services);

            ConfigureDependencyInjection(services);

            services.AddControllers();

            services.AddMediatR(typeof(GetAllShoppingListsRequestHandler).GetTypeInfo().Assembly);
        }

        private void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<MyListContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")),
                ServiceLifetime.Scoped
            );

            var serviceProvider = services.BuildServiceProvider();
            serviceProvider.GetRequiredService<MyListContext>().Database.Migrate();
        }

        private void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, MyListContext>();
            services.AddScoped<IShoppingListRepository, ShoppingListRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyApp Api v1");
            });
        }
    }
}
