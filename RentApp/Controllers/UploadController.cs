using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RentApp.Controllers
{
    public class UploadController : ApiController
    {
        [HttpGet]
        [Route("GetImage")]
        public HttpResponseMessage ImageGet(string path)
        {
            if(path==null)
            {
                path = "noimage.jpg";
            }

            var filePath = HttpContext.Current.Server.MapPath("~/Content/Images/" + path);
            var ext = System.IO.Path.GetExtension(filePath);
            var contents = System.IO.File.ReadAllBytes(filePath);

            System.IO.MemoryStream ms = new System.IO.MemoryStream(contents);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/" + ext);

            return response;
        }

        [HttpPost]
        [Route("UploadImage")]
        public HttpResponseMessage UploadImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            var postedFile = httpRequest.Files["Image"];

            imageName = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ","-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);

            var filePath = HttpContext.Current.Server.MapPath("~/Content/Images/" + imageName);
            postedFile.SaveAs(filePath);
            // service
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
