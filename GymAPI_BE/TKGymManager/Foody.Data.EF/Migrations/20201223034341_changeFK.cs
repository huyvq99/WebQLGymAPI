using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Foody.Data.EF.Migrations
{
    public partial class changeFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Cards_CardId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_CardId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "Services");

            migrationBuilder.RenameColumn(
                name: "ServicesId",
                table: "Cards",
                newName: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_ServiceId",
                table: "Cards",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Services_ServiceId",
                table: "Cards",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Services_ServiceId",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_ServiceId",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "ServiceId",
                table: "Cards",
                newName: "ServicesId");

            migrationBuilder.AddColumn<Guid>(
                name: "CardId",
                table: "Services",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Services_CardId",
                table: "Services",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Cards_CardId",
                table: "Services",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
