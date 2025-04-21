using MongoDB.Bson.Serialization.Attributes;

namespace WordCollectionApi.Models
{
    public class SequenceNumber
    {
        [BsonId]
        [BsonElement("seqName")]
        public required string SequenceName { get; set; }
        [BsonElement("seqNumber")]
        public int SequenceNo { get; set; }
    }
}
