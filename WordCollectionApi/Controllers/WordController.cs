using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WordCollectionApi.Models;
using WordCollectionApi.Common;
using MongoDB.Driver;
using WordCollectionApi.Services;
using System.Text.RegularExpressions;

namespace WordCollectionApi.Controllers
{
    [Route("WordCollectionApi/[controller]")]
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
            if (string.IsNullOrWhiteSpace(word.WordValue))
                return BadRequest("Word cannot be empty.");

            if (!Regex.IsMatch(word.WordValue, @"^[\p{L}'-]+$", RegexOptions.Compiled | RegexOptions.CultureInvariant))
                return BadRequest("Word contains invalid characters.");

            var existingWord = await _wordService.GetWordByValueAsync(word.WordValue.Trim().ToLower());

            if (existingWord != null)
                return BadRequest("Word already exists.");

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

        [HttpPut("PUT_Word/{id}")]
        public async Task<ActionResult<Word>> PUTword([FromRoute]int id, [FromBody] Word updatedWord)
        {
            if (string.IsNullOrWhiteSpace(updatedWord.WordValue))
                return BadRequest("New word cannot be empty.");

            if (!Regex.IsMatch(updatedWord.WordValue, @"^[\p{L}'-]+$", RegexOptions.Compiled | RegexOptions.CultureInvariant))
                return BadRequest("New word contains invalid characters.");

            var existingWord = await _wordService.GetWordAsync(id);

            if (existingWord != null)
            {
                updatedWord.WordId = id;

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
