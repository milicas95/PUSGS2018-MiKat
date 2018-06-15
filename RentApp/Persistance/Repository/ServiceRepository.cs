using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ServiceRepository : Repository<Service, int>, IServiceRepository
    {
        protected RADBContext Context { get { return context as RADBContext; } }
        public ServiceRepository(DbContext context) : base(context)
        {

        }

        protected RADBContext DemoContext { get { return context as RADBContext; } }

        public IEnumerable<Service> GetAll(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Vehicle> GetVehicles(int serviceId)
        {
            return Context.Vehicles.Where(x => x.Service.Id == serviceId).ToList();
        }
    }
}