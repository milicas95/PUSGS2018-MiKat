using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Linq.Expressions;

namespace RentApp.Persistance.Repository
{
    public class UserRepository : Repository<AppUser, int>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {

        }

        public AppUser FirstOrDeafult(Expression<Func<AppUser, bool>> predicate)
        {
            return context.Set<AppUser>().FirstOrDefault(predicate);
        }

        public IEnumerable<AppUser> GetAll(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}