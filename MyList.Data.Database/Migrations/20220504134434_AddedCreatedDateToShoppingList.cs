using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyList.Data.Database.Migrations
{
    public partial class AddedCreatedDateToShoppingList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "ShoppingLists",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "ShoppingLists");
        }
    }
}
