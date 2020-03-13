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
  constructor(private messageService: MessageService) { }

  private log(message: string): void {
    this.messageService.add(`CellService: ${message}`);
  }

  private checkWinner(cells: Cell[], player: Player): void {
    this.log('check winner');
    let playerCells: Cell[] = cells.filter(c => {
      if (c.player !== undefined) {
        return c.player.id === player.id
      } else {
        return false;
      }
    });
    this.log(`Number in filtered cells: ${playerCells.length}`);
    let playerValue: number = playerCells.map(cell => cell.id)
      .reduce((total, id) => total + id);
    this.log(`${player.name} value is: ${playerValue}`);
    if (this.winningValues.includes(playerValue)) {
        this.log(`We have a winner! Winner is: ${player.id}: ${player.name}`);
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
        }
      }
      return c;
    });
    this.checkWinner(newCells, clicker);
    return of(newCells);
  }
}
