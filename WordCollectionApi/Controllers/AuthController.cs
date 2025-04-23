using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WordCollectionApi.Controllers
{
    public class AuthController : Controller
    {
        [Authorize]
        [HttpGet("Login")]
        public IActionResult SecureEndpoint() => Ok("You are authenticated");
    }
}
