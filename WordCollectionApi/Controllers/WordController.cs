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
        public async Task<ActionResult<List<Word>>> GETword()
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

        [HttpPost]
        public async Task<ActionResult<Word>> POSTword(Word word)
        {
            var postedWord = new Word
            {
                WordValue = word.WordValue,
                WordType = word.WordType
            };

            return Ok(postedWord);
        }

        [HttpDelete]
        public async Task<ActionResult<Word>> DELETEword(Word word)
        {
            //var postedWord = new Word
            //{
            //    WordValue = word.WordValue,
            //    WordType = word.WordType
            //};

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<Word>> PUTword(Word word)
        {
            //var postedWord = new Word
            //{
            //    WordValue = word.WordValue,
            //    WordType = word.WordType
            //};

            return Ok();
        }
    }
}
