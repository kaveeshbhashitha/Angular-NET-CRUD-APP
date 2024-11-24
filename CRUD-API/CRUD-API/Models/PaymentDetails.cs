using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CRUD_API.Models
{
    public class PaymentDetails
    {
        [Key]
        public int PaymentDetalId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string CardOwnerName { get; set; } = "";
        [Column(TypeName = "nvarchar(16)")]
        public string CardNumber { get; set; } = "";
        [Column(TypeName = "nvarchar(5)")]
        public string ExpireionDate { get; set; } = "";
        [Column(TypeName = "nvarchar(3)")]
        public string SecurityCode { get; set; } = "";
    }
}
