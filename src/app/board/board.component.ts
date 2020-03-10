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

  constructor(private cellService: CellService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.messageService.add("BoardComponent: fetching cells.");
    this.cellService.getCells()
      .subscribe(cells => this.cells = cells);
    this.messageService.add("BoardComponent: fetch completed.");
  }
}
