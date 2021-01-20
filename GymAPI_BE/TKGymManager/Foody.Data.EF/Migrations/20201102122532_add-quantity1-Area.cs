using Microsoft.EntityFrameworkCore.Migrations;

namespace Foody.Data.EF.Migrations
{
    public partial class addquantity1Area : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity1",
                table: "Areas",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity1",
                table: "Areas");
        }
    }
}
