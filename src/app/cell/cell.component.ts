import { Component, OnInit, HostListener } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @HostListener('click') onClick() {
    this.handleClick();
  }

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.messageService.add('a cell was clicked!');
  }
}
