import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';

import { Cell } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {

  }

  handleClick(): void {
    this.messageService.add('a cell was clicked!');
    if (this.cell.value == 'X') {
      this.cell.value = 'O';
    } else {
      this.cell.value = 'X';
    }
  }
}
