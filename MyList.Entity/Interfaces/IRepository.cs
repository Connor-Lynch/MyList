using MyList.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyList.Entity.Interfaces
{
    public interface IRepository
    {
        public interface IRepository<T>
        {
            IUnitOfWork UnitOfWork { get; }
        }
    }
}
