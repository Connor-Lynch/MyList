export class ListState {
  public get selectedId(): string {
    return this._selectedId;
  };
  private set selectedId(value: string) {
    this._selectedId = value;
  };
  public get itemUnderEditId(): string {
    return this._itemUnderEditId;
  };
  private set itemUnderEditId(value: string) {
    this._itemUnderEditId = value;
  };

  private _selectedId?: string;
  private _itemUnderEditId?: string;

  public trySelectItem(id: string) {
    if (!this.itemUnderEditId) {
      this.selectedId === id ?
        this.selectedId = null :
        this.selectedId = id;
    }
  }

  public tryEditItem(id: string) {
    if (!this.itemUnderEditId) {
      this.itemUnderEditId = id;
    }
    else if (this.itemUnderEditId === id) {
      this.itemUnderEditId = null;
    }
  }
}
