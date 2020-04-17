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

  private winningValues = [6, 15, 23, 12, 18];
  private winningCells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [3, 6, 9],
    [2, 5, 8]
  ];
  constructor(private messageService: MessageService) { }

  private log(message: string): void {
    this.messageService.add(`CellService: ${message}`);
  }

  private arrayContainsArray(superset, subset): boolean {
    if (superset.length === 0 || superset.length < subset.length) {
      return false;
    }
    let result = true;
    subset.forEach(id => {
      if (superset.indexOf(id) === -1) result = false;
    })
    return result;
  }

  private checkPlayerWon(cells: Cell[], player: Player): boolean {
    this.log(`Check if player ${player.id} won.`);
    let playerCells: Cell[] = cells.filter(c => {
      if (c.player !== null) {
        return c.player.id === player.id
      } else {
        return false;
      }
    })

    let playerCellIds = playerCells.map(cell => cell.id);
    let won = false;
    for (let i = 0; i < this.winningCells.length; i++) {
      won = this.arrayContainsArray(playerCellIds, this.winningCells[i]);
      if (won) break;
    }
    if (won) {
      this.log(`Player ${player.id}, ${player.name}, IS THE WINNER!`);
      window.alert(`Player ${player.id}, ${player.name}, IS THE WINNER!`);
      return true;
    } else {
      return false;
    }
  }

  getCells(): Observable<Cell[]> {
    this.log('fetched cells.');
    return of(CELLS);
  }

  cellClicked(cells: Cell[], cell: Cell, clicker: Player): Observable<Cell[]> {
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
    let won = this.checkPlayerWon(newCells, clicker);
    if (won) {
      return of(newCells.map(c => {
        c.clickable = false;
        return c;
      }));
    } else {
      return of(newCells);
    }
  }
}
