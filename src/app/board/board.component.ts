import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { Cell } from '../cell';
import { CellService } from '../cell.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cells: Cell[];
  player_one: string = 'Zach';
  player_two: string = 'Patrick';
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
}
