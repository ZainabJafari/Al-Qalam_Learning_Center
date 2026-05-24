using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlQalamLearningCenter.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddStripeCheckoutSessionToDonations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StripeCheckoutSessionId",
                table: "Donations",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StripeCheckoutSessionId",
                table: "Donations");
        }
    }
}
