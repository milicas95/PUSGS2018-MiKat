﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;

namespace RentApp.Controllers
{
    public class BranchesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BranchesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Branches
        public IEnumerable<Branch> GetBranches()
        {
            return unitOfWork.Branches.GetAll();
        }

        // GET: api/Branches/5
        [ResponseType(typeof(Branch))]
        public IHttpActionResult GetBranch(int id)
        {
            Branch branch = unitOfWork.Branches.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            return Ok(branch);
        }

        // PUT: api/Branches/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBranch(int id, Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != branch.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Branches.Update(branch);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Branches
        [ResponseType(typeof(Branch))]
        public IHttpActionResult PostBranch(Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Service service = unitOfWork.Branches.GetService(branch.Service.Id);
            //service.Branches.Add(branch);
            branch.Service = service;
            unitOfWork.Branches.Add(branch);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = branch.Id }, branch);
        }

        // DELETE: api/Branches/5
        [ResponseType(typeof(Branch))]
        public IHttpActionResult DeleteBranch(int id)
        {
            //var rents = unitOfWork.Rents.GetAll();

            //foreach(Rent r in rents)
            //{
            //    Branch b=unitOfWork.Branches.GetBranch(r.BeginBranch);
            //    Branch b1 = unitOfWork.Branches.GetBranch(r.EndBranch);

            //    if (b.Id == id || b1.Id == id)
            //        return BadRequest("Branch is in use!");

            //    foreach(AppUser user in unitOfWork.Users.GetAll())
            //    {
            //        if (user.Rents.Remove(r))
            //            break;
            //    }

            //    unitOfWork.Rents.Remove(r);
            //}

            Branch branch = unitOfWork.Branches.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            unitOfWork.Branches.Remove(branch);
            unitOfWork.Complete();

            return Ok(branch);
        }

        private bool BranchExists(int id)
        {
            return unitOfWork.Branches.Get(id) != null;
        }
    }
}