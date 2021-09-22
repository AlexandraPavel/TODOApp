using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace TODOApp
{
    public partial class workshopdatabaseContext : DbContext
    {
        public workshopdatabaseContext()
        {
        }

        public workshopdatabaseContext(DbContextOptions<workshopdatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<Credential> Credentials { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=workshop-server-v1.database.windows.net;Initial Catalog=workshop-database;User ID=workshopadmin;Password=Azureshop1;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.Property(e => e.ActivityId).HasColumnName("activity_id");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25)
                    .HasColumnName("name");

                entity.Property(e => e.Period)
                    .IsRequired()
                    .HasMaxLength(40)
                    .HasColumnName("period");

                entity.Property(e => e.Topic)
                    .HasMaxLength(20)
                    .HasColumnName("topic");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Activities)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Activitie__user___72C60C4A");
            });

            modelBuilder.Entity<Credential>(entity =>
            {
                entity.HasKey(e => e.CredentialsId)
                    .HasName("PK__Credenti__1F8DEEB0F5D5D5FA");

                entity.Property(e => e.CredentialsId).HasColumnName("credentials_id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("password");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Credentials)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Credentia__user___6FE99F9F");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("lastName");

                entity.Property(e => e.LinkProfilePhoto)
                    .HasMaxLength(100)
                    .HasColumnName("linkProfilePhoto");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
