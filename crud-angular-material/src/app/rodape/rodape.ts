import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-rodape',
  imports: [
    MatToolbar,
    MatIcon
  ],
  templateUrl: './rodape.html',
  styleUrl: './rodape.scss',
})
export class Rodape {

}
