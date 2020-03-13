import { Component, OnInit,
         Input, Output, EventEmitter  } from '@angular/core';
import { MessageService } from '../message.service';

import { Cell } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;

  @Output() cellEvent = new EventEmitter<Cell>();

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {

  }

  handleClick(): void {
    // If not previously clicked...
    if (this.cell.player !== null) {
      return;
    }
    // Alert the board which cell was clicked.
    this.messageService.add(`CellService: cell id: ${this.cell.id} clicked.`)
    this.cellEvent.emit(this.cell);
  }
}
