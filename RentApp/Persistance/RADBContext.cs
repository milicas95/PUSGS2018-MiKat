﻿using Microsoft.AspNet.Identity.EntityFramework;
using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance
{
    public class RADBContext : IdentityDbContext<RAIdentityUser>
    {
        public virtual DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<TypeOfVehicle> TypesOfVehicle { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public RADBContext() : base("name=RADB")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public static RADBContext Create()
        {
            return new RADBContext();
        }
    }
}