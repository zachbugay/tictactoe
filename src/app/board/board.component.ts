import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { Cell } from '../cell';
import { CellService } from '../cell.service';
import { Player } from '../player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cells: Cell[];

  player_one: Player = { id: 1, name: 'Zach', value: 'X'};
  player_two: Player = { id: 2, name: 'Patrick', value: 'O'};

  player_one_turn: Boolean = true;

  constructor(private cellService: CellService,
              private messageService: MessageService) { }

  ngOnInit(): void {
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

  playerTurn(): void {
    this.player_one_turn ? this.player_one_turn = false : this.player_one_turn = true;
  }

  cellClicked(cell: Cell): void {
    this.log(`cell id: ${cell.id} was clicked!`);

    // Do not call service if the cell was already clicked.
    let checkCell: Cell = this.cells.filter(c => c.id === cell.id)[0];
    this.log(`checkCellid: ${checkCell.id} value: ${checkCell.value}`);
    if (checkCell.value !== '-'){
      return;
    }

    let clicker: Player = this.player_one;
    this.log(`Player1 turn? ${this.player_one_turn}`);
    if (this.player_one_turn) {
      clicker = this.player_one;
      this.player_one_turn = false;
    } else {
      clicker = this.player_two;
      this.player_one_turn = true;
    }
    this.log(`Clicker: ${clicker.name}`);
    this.log(`Player One Turn Next?: ${this.player_one_turn}`);
    this.cellService.cellClicked(this.cells, cell, clicker);
  }
}
