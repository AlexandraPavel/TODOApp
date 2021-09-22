using System;
using System.Collections.Generic;

#nullable disable

namespace TODOApp
{
    public partial class Activity
    {
        public int ActivityId { get; set; }
        public string Name { get; set; }
        public string Topic { get; set; }
        public DateTime Date { get; set; }
        public string Period { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
