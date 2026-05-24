using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlQalamLearningCenter.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDonationFees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverProcessingFee",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "ProcessingFeeMinor",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "TotalAmountMinor",
                table: "Donations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CoverProcessingFee",
                table: "Donations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ProcessingFeeMinor",
                table: "Donations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalAmountMinor",
                table: "Donations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
