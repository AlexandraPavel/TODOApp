using System;
using System.Collections.Generic;

#nullable disable

namespace TODOApp
{
    public partial class Credential
    {
        public int CredentialsId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
