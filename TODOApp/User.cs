using System;
using System.Collections.Generic;

#nullable disable

namespace TODOApp
{
    public partial class User
    {
        public User()
        {
            Activities = new HashSet<Activity>();
            Credentials = new HashSet<Credential>();
        }

        public int UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string LinkProfilePhoto { get; set; }

        public virtual ICollection<Activity> Activities { get; set; }
        public virtual ICollection<Credential> Credentials { get; set; }
    }
}
