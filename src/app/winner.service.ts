import { Injectable } from '@angular/core';


import { Cell } from './cell';
import { Player } from './player';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinnerService {
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

  private log(message: string) {
    this.messageService.add(`WinnerService: ${message}`);
  }

  private static arrayContainsArray(superset: Array<number>, subset: Array<number>): boolean {
    if (superset.length === 0 || superset.length < subset.length) {
      return false;
    }
    let result = true;
    subset.forEach(id => {
      if (superset.indexOf(id) === -1) result = false;
    })
    return result;
  }

  checkPlayerWon(cells: Cell[], player: Player): Observable<boolean> {
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
      won = WinnerService.arrayContainsArray(playerCellIds, this.winningCells[i]);
      if (won) {
        this.log(`Winner winner chicken dinner. Winner: Player ${player.id}: ${player.name}`)
        return of(true);
      };
    }
    return of(false);
  }

  alertWinner(player: Player) {
    window.alert(`Winner is: ${player.id}: ${player.name}`);
  }
}
