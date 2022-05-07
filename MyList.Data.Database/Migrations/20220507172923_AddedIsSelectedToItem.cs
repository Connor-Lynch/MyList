using Microsoft.EntityFrameworkCore.Migrations;

namespace MyList.Data.Database.Migrations
{
    public partial class AddedIsSelectedToItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSelected",
                table: "ShoppingListItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSelected",
                table: "ShoppingListItems");
        }
    }
}
