using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WordCollectionApi.Models;
using WordCollectionApi.Common;
using MongoDB.Driver;
using WordCollectionApi.Services;

namespace WordCollectionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        private readonly WordService _wordService;

        public WordController(WordService wordService) {

            _wordService = wordService;
        }

        [HttpGet("GET_Words")]
        public async Task<ActionResult<List<Word>>> GETwords()
        {
            return await _wordService.GetWordsAsync();
        }

        [HttpGet("GET_Word/{id}")]
        public async Task<ActionResult<Word>> GETword(int id)
        {
            var word = await _wordService.GetWordAsync(id);

            return word != null ?
                Ok(word) :
                NotFound();
        }

        [HttpPost("POST_Word")]
        public async Task<ActionResult<Word>> POSTword(Word word)
        {
            await _wordService.CreateWordAsync(word);

            return Ok(word);
        }

        [HttpDelete("DELETE_Word/{id}")]
        public async Task<ActionResult<Word>> DELETEword(int id)
        {
            var word = await _wordService.GetWordAsync(id);

            if (word != null)
            {
                await _wordService.RemoveWordAsync(id);
                return Ok();
            }
            else { 
                return NotFound();
            }
        }

        [HttpPut("PUT_Word")]
        public async Task<ActionResult<Word>> PUTword(int id, Word updatedWord)
        {
            var word = await _wordService.GetWordAsync(id);

            if (word != null)
            {
                await _wordService.UpdateWordAsync(id, updatedWord);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
