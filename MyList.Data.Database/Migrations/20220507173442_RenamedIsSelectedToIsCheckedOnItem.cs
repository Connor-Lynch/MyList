using Microsoft.EntityFrameworkCore.Migrations;

namespace MyList.Data.Database.Migrations
{
    public partial class RenamedIsSelectedToIsCheckedOnItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSelected",
                table: "ShoppingListItems");

            migrationBuilder.AddColumn<bool>(
                name: "IsChecked",
                table: "ShoppingListItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsChecked",
                table: "ShoppingListItems");

            migrationBuilder.AddColumn<bool>(
                name: "IsSelected",
                table: "ShoppingListItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
