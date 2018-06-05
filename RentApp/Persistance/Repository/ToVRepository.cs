using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ToVRepository : Repository<TypeOfVehicle, int>, IToVRepository
    {
        public ToVRepository(DbContext context) : base(context)
        {

        }

        public IEnumerable<TypeOfVehicle> GetAll(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}