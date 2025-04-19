using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using WordCollectionApi.Common;

namespace WordCollectionApi.Models
{
    public class Word
    {
        [BsonId]
        [BsonElement("WordId"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
        [JsonPropertyName("id")]
        public int WordId { get; set; }
        [BsonElement("WordValue"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [JsonPropertyName("word")]
        public required string WordValue { get; set; }
        [BsonElement("WordType"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
        [JsonPropertyName("type")]
        public required WordTypeEnum WordType { get; set; }
    }
}
