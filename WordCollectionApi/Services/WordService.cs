using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WordCollectionApi.Models;

namespace WordCollectionApi.Services
{
    public class WordService
    {
        private readonly IMongoCollection<Word> _wordCollection;

        public WordService(IOptions<DbSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _wordCollection = mongoDb.GetCollection<Word>(dbSettings.Value.CollectionName);
        }

        public async Task<List<Word>> GetWordsAsync() =>
            await  _wordCollection.Find(_ => true).ToListAsync();

        public async Task<Word> GetWordAsync(int id) =>
            await _wordCollection.Find( x => x.WordId == id).FirstOrDefaultAsync();

        public async Task CreateWordAsync(Word newWord) =>
            await _wordCollection.InsertOneAsync(newWord);

        public async Task UpdateWordAsync(int id, Word updatedWord) =>
            await _wordCollection.ReplaceOneAsync(x => x.WordId == id, updatedWord);

        public async Task RemoveWordAsync(int id) =>
            await _wordCollection.DeleteOneAsync(x => x.WordId == id);
    }
}
