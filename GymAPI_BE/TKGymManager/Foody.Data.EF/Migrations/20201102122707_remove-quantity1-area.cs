using Microsoft.EntityFrameworkCore.Migrations;

namespace Foody.Data.EF.Migrations
{
    public partial class removequantity1area : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity1",
                table: "Areas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity1",
                table: "Areas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
