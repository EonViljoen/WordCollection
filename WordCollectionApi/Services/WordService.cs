using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Diagnostics.Metrics;
using WordCollectionApi.Models;

namespace WordCollectionApi.Services
{
    public class WordService
    {
        private readonly IMongoCollection<Word> _wordCollection;
        private readonly IMongoCollection<SequenceNumber> _sequenceCollection;
        private readonly DbSettings _dbSettings;

        public WordService(IMongoClient mongoClient, IOptions<DbSettings> dbSettings)
        {
            _dbSettings = dbSettings.Value;
            
            var mongoDb = mongoClient.GetDatabase(_dbSettings.DatabaseName)
                ;
            _wordCollection = mongoDb.GetCollection<Word>(_dbSettings.WordCollectionName);
            _sequenceCollection = mongoDb.GetCollection<SequenceNumber>(_dbSettings.SequenceCollectionName);
        }

        public async Task<List<Word>> GetWordsAsync() =>
            await  _wordCollection.Find(_ => true).ToListAsync();

        public async Task<Word> GetWordAsync(int id) =>
            await _wordCollection.Find( x => x.WordId == id).FirstOrDefaultAsync();

        public async Task CreateWordAsync(Word newWord)
        {
            newWord.WordId = await GetNextSeqNo("WordId");
            await _wordCollection.InsertOneAsync(newWord);
        }
            

        public async Task UpdateWordAsync(int id, Word updatedWord) =>
            await _wordCollection.ReplaceOneAsync(x => x.WordId == id, updatedWord);

        public async Task RemoveWordAsync(int id) =>
            await _wordCollection.DeleteOneAsync(x => x.WordId == id);

        //public async Task GetIdByWord()
        //{
        //    await _wordCollection.Find(x => x.)
        //}

        public async Task<int> GetNextSeqNo(string seqName)
        {
            var seqFilter = Builders<SequenceNumber>.Filter.Eq(
                x => x.SequenceName, seqName);
            var updateSeqNo = Builders<SequenceNumber>.Update.Inc(
                x => x.SequenceNo, 1);

            var autoInsertOptions = new FindOneAndUpdateOptions<SequenceNumber>
            {
                IsUpsert = true,
                ReturnDocument = ReturnDocument.After
            };

            var results = await _sequenceCollection.FindOneAndUpdateAsync(seqFilter, updateSeqNo, autoInsertOptions);
            return results.SequenceNo;
        }
    }
}
