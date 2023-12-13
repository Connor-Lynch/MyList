import { ListState } from "./list-state.service";

describe('ShoppingListService', () => {
  let service: ListState;

  beforeEach(() => {
    service = new ListState();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('trySelectItem', () => {
    it('should set selectedItemId', () => {
      // Arrange
      const newId = 'newId';

      // Act
      service.trySelectItem(newId);

      // Assert
      expect(service.selectedId).toEqual(newId);
    });

    it('should change selectedItemId', () => {
      // Arrange
      const oldId = 'oldId';
      service.trySelectItem(oldId);
      const newId = 'newId';

      // Act
      service.trySelectItem(newId);

      // Assert
      expect(service.selectedId).toEqual(newId);
    });

    it('should clear selectedItemId if the same id is passed', () => {
      // Arrange
      const newId = 'newId';
      service.trySelectItem(newId);

      // Act
      service.trySelectItem(newId);

      // Assert
      expect(service.selectedId).toBeNull();
    });
  });

  describe('tryEditItem', () => {
    it('should set itemUnderEditId', () => {
      // Arrange
      const newId = 'newId';

      // Act
      service.tryEditItem(newId);

      // Assert
      expect(service.itemUnderEditId).toEqual(newId);
    });

    it('should not change itemUnderEditId if there is a current value', () => {
      // Arrange
      const oldId = 'oldId';
      service.tryEditItem(oldId);

      // Act
      service.tryEditItem('newId');

      // Assert
      expect(service.itemUnderEditId).toEqual(oldId);
    });

    it('should set clear itemUnderEditId if the same id is passed', () => {
      // Arrange
      const newId = 'newId';
      service.tryEditItem(newId);

      // Act
      service.tryEditItem(newId);

      // Assert
      expect(service.itemUnderEditId).toBeNull();
    });
  });
});
