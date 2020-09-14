import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem, HistoryItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
  historyItem: null | ReadingListItem;
  historyAction: "" | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});


export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
  historyAction: "",
  historyItem: null
});



const readingListReducer = createReducer(
  initialState,

  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),

  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),

  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(ReadingListActions.addToReadingList, (state, action) =>
  {
    return{
      ...readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state),
      historyItem: { bookId: action.book.id, ...action.book },
      historyAction: "ADDED"
    }
  }
  ),

  on(ReadingListActions.failedAddToReadingList, (state, action) => 
  readingListAdapter.removeOne(action.book.id, state)
  ),

  on(ReadingListActions.removeFromReadingList, (state, action) => {
    return {
      ...readingListAdapter.removeOne(action.item.bookId, state),
      historyItem: { bookId: action.item.bookId, ...action.item },
      historyAction: "REMOVED"
    }
  }),

  on(ReadingListActions.failedRemoveFromReadingList, (state, action) => 
    readingListAdapter.addOne({ bookId: action.item.bookId, ...action.item }, state)
  ),

  on(ReadingListActions.undoReadingListAction, (state, action) =>
  {
    if(state.historyAction === "ADDED")
    {
      return{
        ...readingListAdapter.removeOne(state.historyItem.bookId, state),
        historyAction: "",
        historyItem: null
      }
    }
    if(state.historyAction === "REMOVED")
    {
      return{
        ...readingListAdapter.addOne({ bookId: state.historyItem.bookId, ...state.historyItem }, state),
        historyAction: "",
        historyItem: null
      }
    }
   
  }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
