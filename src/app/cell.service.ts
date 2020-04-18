import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cell } from './cell';
import { Player } from './player';
import { CELLS } from './cells-mock';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  constructor(private messageService: MessageService) { }

  private log(message: string): void {
    this.messageService.add(`CellService: ${message}`);
  }

  getCells(): Observable<Cell[]> {
    this.log('fetched cells.');
    return of(CELLS);
  }

  updateCellClicked(cells: Cell[], cell: Cell, clicker: Player): Observable<Cell[]> {
    let newCells: Cell[] = cells.map(c => {
      if (c.id === cell.id) {
        if (c.value === '-') {
          this.log(`updating cell: ${c.id}`);
          c.player = clicker;
          c.value = clicker.value;
          c.clickable = false;
        }
      }
      return c;
    });
    return of(newCells);
  }

  gameOver(cells: Cell[]): Observable<Cell[]> {
    let newCells: Cell[] = cells.map(c => {
      c.clickable = false;
      return c;
    });
    return of(newCells);
  }
}
