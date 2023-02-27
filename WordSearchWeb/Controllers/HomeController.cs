using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WordSearchWeb.Models;
using System.Web;

namespace WordSearchWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly Words _wd;
       
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult TheWordSearch(string value)
        {
            return View();
        }
        
        // GET
        public IActionResult MakeWordSearch(string value)
        {
            TempData["message"] = "Welcome to my Generator";
            TempData["success"] = value;
            return View();
        }
        //public IActionResult MakeWordSearch(Words wd)
        //{
        //    if(wd.mySize == 0)
        //    {
        //        ModelState.AddModelError("Size", "The size cannot be 0");
        //        return View();
        //    }
        //    return View(wd);
        //}
        [HttpPost]
        public IActionResult SetTempData(string value)
        {
            TempData["message"] = "Welcome to my Generator";
            TempData["success"] = value;
            return new EmptyResult();
        }
       
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}