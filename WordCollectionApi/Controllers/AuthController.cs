using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using WordCollectionApi.Models;

namespace WordCollectionApi.Controllers
{
    [Route("WordCollectionApi/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public AuthController(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        [HttpGet("github/callback")]
        public async Task<IActionResult> GitHubCallback([FromQuery] string code)
        {
            if (string.IsNullOrWhiteSpace(code))
                return BadRequest("Code not provided.");

            var client = _httpClientFactory.CreateClient();

            var response = await client.PostAsync("https://github.com/login/oauth/access_token",
                new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    ["client_id"] = _config["GitHub:ClientId"],
                    ["client_secret"] = _config["GitHub:ClientSecret"],
                    ["code"] = code
                }));

            var content = await response.Content.ReadAsStringAsync();

            if (!content.Contains("access_token="))
                return Redirect(_config["FrontendBaseUrl"]+"?auth=failed");

            return Redirect(_config["FrontendBaseUrl"] + "?auth=success");
        }

        [HttpGet("github/login")]
        public IActionResult RedirectToGitHub()
        {
            var clientId = _config["GitHub:ClientId"];
            var redirectUri = _config["GitHub:RedirectURI"];

            var githubAuthUrl = $"https://github.com/login/oauth/authorize?client_id={clientId}&redirect_uri={Uri.EscapeDataString(redirectUri)}";

            return Redirect(githubAuthUrl);
        }

    }
}
