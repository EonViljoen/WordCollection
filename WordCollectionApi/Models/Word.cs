using WordCollectionApi.Common;

namespace WordCollectionApi.Models
{
    public class Word
    {
        public int WordId { get; set; }
        public required string WordValue { get; set; }
        public required WordTypeEnum WordType { get; set; }
    }
}
