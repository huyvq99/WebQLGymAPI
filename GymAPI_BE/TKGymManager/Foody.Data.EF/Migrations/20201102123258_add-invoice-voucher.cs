using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Foody.Data.EF.Migrations
{
    public partial class addinvoicevoucher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InvoiceId",
                table: "Vouchers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_InvoiceId",
                table: "Vouchers",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_Invoices_InvoiceId",
                table: "Vouchers",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_Invoices_InvoiceId",
                table: "Vouchers");

            migrationBuilder.DropIndex(
                name: "IX_Vouchers_InvoiceId",
                table: "Vouchers");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Vouchers");
        }
    }
}
