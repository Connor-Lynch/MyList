using Microsoft.EntityFrameworkCore.Migrations;

namespace MyList.Data.Database.Migrations
{
    public partial class AddedSortOrderToItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "ShoppingListItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "ShoppingListItems");
        }
    }
}
