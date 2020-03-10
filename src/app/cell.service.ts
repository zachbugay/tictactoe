import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cell } from './cell';
import { CELLS } from './cells-mock';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  constructor(private messageService: MessageService) { }

  getCells(): Observable<Cell[]> {
    this.messageService.add('CellService: fetched cells.');
    return of(CELLS);
  }
}
