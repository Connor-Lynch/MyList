import { Dispatch, SetStateAction } from "react";
import { ItemListState } from "../models/items-state";

export function trySelectItem(listState: ItemListState, id: string, setItemListState: Dispatch<SetStateAction<ItemListState>>) {
    if (listState.editInProgress) {
      return;
    }

    const updatedState = { 
        ... listState, 
        selectedId: listState.selectedId === id ?
            listState.selectedId = undefined :
            listState.selectedId = id,
    };

    setItemListState(updatedState);
}

export function tryEditItem(listState: ItemListState, id: string, setItemListState: Dispatch<SetStateAction<ItemListState>>) {
    if (listState.editInProgress && listState.selectedId !== id) {
      return;
    }

    const updatedState = { 
        ... listState, 
        editInProgress: !listState.editInProgress,
        selectedId: listState.editInProgress ? undefined : listState.selectedId,
    };

    setItemListState(updatedState);
}

export function tryAddItem(listState: ItemListState, setItemListState: Dispatch<SetStateAction<ItemListState>>) {
    if (listState.editInProgress && !!listState.selectedId) {
      return;
    }

    const updatedState = { 
        ... listState,
        selectedId: undefined,
        editInProgress: !listState.editInProgress,
    };

    setItemListState(updatedState);
}