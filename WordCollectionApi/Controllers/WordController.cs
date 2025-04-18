using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WordCollectionApi.Models;
using WordCollectionApi.Common;

namespace WordCollectionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Word>>> GetWord()
        {
            var defaultWords = new List<Word>()
            {
                new Word
                {
                    WordId = 1,
                    WordValue = "Hello",
                    WordType = WordTypeEnum.Interjection
                },
                new Word
                {
                    WordId = 2,
                    WordValue = "World",
                    WordType = WordTypeEnum.Noun
                }
            };
            

            return Ok(defaultWords);
        }
    }
}
