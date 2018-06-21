using System;
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
using RentApp.Persistance.Repository;

namespace RentApp.Controllers
{
    public class AppUsersController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        
        public AppUsersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        
        [Authorize(Roles = "Admin")]
        // GET: api/AppUsers
        public IEnumerable<AppUser> GetAppUsers()
        {
            return unitOfWork.Users.GetAll();
        }

        [HttpGet]
        [Route("GetManagers")]
        public IEnumerable<AppUser> GetManagers()
        {
            return unitOfWork.Users.GetManagers();
        }

        [HttpPost]
        [Route("ConfirmUser")]
        [ResponseType(typeof(void))]
        public IHttpActionResult ConfirmUser(AppUser user)
        {
            AppUser u = unitOfWork.Users.Get(user);

            if(u.PersonalDocument==null)
                return BadRequest("User can't be approved");

            u.Activated = true;
            unitOfWork.Complete();

            return Ok();    
        }

        [HttpPost]
        [Route("BanManager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanManager(AppUser user)
        {
            AppUser u = unitOfWork.Users.Get(user);

            if (!u.Manage)
                return BadRequest("Manager is already banned");

            u.Manage = false;
            unitOfWork.Complete();

            return Ok();
        }

        // GET: api/AppUsers/5
        [ResponseType(typeof(AppUser))]
        [Route("api/UserInfo")]
        public IHttpActionResult GetUserInfo()
        {
            AppUser appUser = unitOfWork.Users.GetUserInfo(User.Identity.Name);

            if (appUser == null)
            {
                return NotFound();
            }

            appUser.Rents = unitOfWork.Users.GetRents(appUser.Id).ToList();
            return Ok(appUser);
        }

        // PUT: api/AppUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAppUser(int id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.Id)
            {
                return BadRequest();
            }


            try
            {
                unitOfWork.Users.Update(appUser);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
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

        // POST: api/AppUsers
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostAppUser(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Users.Add(appUser);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/AppUsers/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteAppUser(int id)
        {
            AppUser appUser = unitOfWork.Users.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            unitOfWork.Users.DeleteRents(id);
            unitOfWork.Users.Remove(appUser);
            unitOfWork.Complete();

            return Ok(appUser);
        }

        private bool AppUserExists(int id)
        {
            return unitOfWork.Users.Get(id)!=null;
        }
    }
}