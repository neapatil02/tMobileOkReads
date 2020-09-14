import { Component,TemplateRef,ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, markAsReadInReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})

export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  constructor(private readonly store: Store,
    private dialog: MatDialog) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsRead(data: ReadingListItem)
  {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    this.store.dispatch(markAsReadInReadingList({ item: { id: data.bookId, changes: {
      finished: true,
      finishedDate: new Date().toDateString()
    }} }));
  }
}
