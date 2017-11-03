using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WingtipCRM.Models {

  public class Customer {
    [Key] 
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Company { get; set; }
    public string Email { get; set; }
    public string WorkPhone { get; set; }
    public string HomePhone { get; set; }
  }

}
