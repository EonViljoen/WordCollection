import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IWordDefinition } from '../../common/interfaces/word-definition';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-word-definition',
  imports: [CommonModule, MatButton, MatDialogClose, MatDialogModule],
  standalone: true,
  templateUrl: './word-definition.component.html',
  styleUrl: './word-definition.component.scss'
})
export class WordDefinitionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      word: string; 
      definition: string[];
      types: string[];
      phonetic: string;
    }) {}

}
