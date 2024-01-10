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
      expect(service.selectedId).toBeFalsy();
    });

    it('should not set selectedItemId when addInProgress is true', () => {
      // Arrange
      service.tryAddItem();
      const newId = 'newId';

      // Act
      service.trySelectItem(newId);

      // Assert
      expect(service.selectedId).toBeFalsy();
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
      expect(service.itemUnderEditId).toBeFalsy();
    });

    it('should not set itemUnderEditId when addInProgress is true', () => {
      // Arrange
      service.tryAddItem();
      const newId = 'newId';

      // Act
      service.tryEditItem(newId);

      // Assert
      expect(service.itemUnderEditId).toBeFalsy();
    });
  });

  describe('tryAddItem', () => {
    it('should set addInProgress to true', () => {
      // Act
      service.tryAddItem();

      // Assert
      expect(service.addInProgress).toBeTruthy();
    });

    it('should set addInProgress to false when it is currently true', () => {
      // Arrange
      service.tryAddItem();

      // Act
      service.tryAddItem();

      // Assert
      expect(service.addInProgress).toBeFalsy();
    });

    it('should clear selectedId', () => {
      // Arrange
      service.trySelectItem('id');

      // Act
      service.tryAddItem();

      // Assert
      expect(service.selectedId).toBeFalsy();
    });

    it('should not set addInProgress when itemUnderEditId is set', () => {
      // Arrange
      service.tryEditItem('id');

      // Act
      service.tryAddItem();

      // Assert
      expect(service.addInProgress).toBeFalsy();
    });
  });
});
