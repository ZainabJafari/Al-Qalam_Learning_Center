using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlQalamLearningCenter.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDonations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Donations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AmountMinor = table.Column<int>(type: "int", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    Frequency = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DonorName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    DonorEmail = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: true),
                    DonorCountry = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CoverProcessingFee = table.Column<bool>(type: "bit", nullable: false),
                    ProcessingFeeMinor = table.Column<int>(type: "int", nullable: true),
                    TotalAmountMinor = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    PaidAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donations", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Donations");
        }
    }
}
