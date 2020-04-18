import { Component, OnInit } from '@angular/core';

import { Cell } from '../cell';
import { CellService } from '../cell.service';
import { Player } from '../player';

import { MessageService } from '../message.service';
import { WinnerService } from '../winner.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cells: Cell[];
  gameOver: boolean;

  player_one: Player = { id: 1, name: 'Zach', value: 'x'};
  player_two: Player = { id: 2, name: 'Patrick', value: 'o'};

  player_one_turn: Boolean = true;

  constructor(private cellService: CellService,
              private messageService: MessageService,
              private winnerService: WinnerService) { }

  ngOnInit(): void {
    this.log("BoardComponent OnInit called...");
    this.getCells();
  }

  private log (message: string): void {
    this.messageService.add(`BoardComponent: ${message}`);
  }

  getCells(): void {
    this.log('fetching cells.');
    this.cellService.getCells()
      .subscribe(cells => this.cells = cells);
    this.log('fetch completed.');
  }

  cellClicked(cell: Cell): void {
    // Receives an update that the cell was clicked, from the child component (cell).
    this.log(`cell id: ${cell.id} was clicked!`);
    let clicker: Player = this.player_one;
    if (this.player_one_turn) {
      clicker = this.player_one;
      this.player_one_turn = false;
    } else {
      clicker = this.player_two;
      this.player_one_turn = true;
    }
    this.log(`Clicker: ${clicker.name}`);
    this.cellService.updateCellClicked(this.cells, cell, clicker)
      .subscribe(cells => this.cells = cells);
    this.winnerService.checkPlayerWon(this.cells, clicker)
      .subscribe(result => this.gameOver = result);
    if (this.gameOver) {
      this.cellService.gameOver(this.cells)
        .subscribe(cells => {
          this.cells = cells
          this.winnerService.alertWinner(clicker);
        });
    }
  }
}
