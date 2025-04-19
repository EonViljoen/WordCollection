using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using WordCollectionApi.Common;

namespace WordCollectionApi.Models
{
    public class Word
    {
        [BsonId]
        [BsonElement("id"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
        [JsonPropertyName("id")]
        public int WordId { get; set; }
        [BsonElement("word"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [JsonPropertyName("word")]
        public required string WordValue { get; set; }
        [BsonElement("type"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
        [JsonPropertyName("type")]
        public required WordTypeEnum WordType { get; set; }
    }
}
