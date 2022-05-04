using MyList.Data.Database;
using MyList.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.Data.Repository
{
    public class RepositoryBase
    {
        protected MyListContext _context;

        public RepositoryBase(MyListContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;
    }
}
