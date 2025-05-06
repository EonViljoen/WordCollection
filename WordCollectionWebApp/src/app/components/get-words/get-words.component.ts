import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import {MatTableModule} from '@angular/material/table';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import { IWord } from '../../common/interfaces/word';
import { WordType } from '../../common/enum/wordType';
import { MatDialog } from '@angular/material/dialog';
import { WordDefinitionComponent } from '../word-definition/word-definition.component';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';



@Component({
  selector: 'app-get-words',
  imports: [ MatTableModule, MatIcon, MatTooltipModule ],
  standalone: true,
  templateUrl: './get-words.component.html',
  styleUrl: './get-words.component.scss'
})
export class GetWordsComponent {

  private wordService = inject(WordCollectionService);
  private dialog = inject(MatDialog);
  private http = inject(HttpClient)

  displayedColumns: string[] = ['Word', 'Type'];
  currentView: HomeView =  HomeView.GetWordsPage;
  homeView = HomeView;
  
  @Input() visible: boolean = false;

  existingWords : IWord[] = [];
  WordType = WordType;

  infoIconPath: string = 'M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z';

  typeWordData: string[] = [];
  phoneticWordData: any = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.refreshList();
    }
  }

  refreshList(): void {
    this.wordService.GET_Words().subscribe({
      next: (res) => {
        this.existingWords = res;
      },
      error: (err) => {
        console.error('Failed to fetch words', err);
      }
    });
  }

  openDefinitionDialog(word: string): void {
    this.http.get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).subscribe({

      next: (response) => {
        const definitions = response[0]?.meanings
          ?.flatMap((m: any) => m.definitions.map((d: any) => d.definition)) || [];
          
        console.log(this.phoneticWordData)
        this.phoneticWordData = response[0]?.phonetic === '' ? '' : response[0]?.phonetic;
        console.log(response[0]?.phonetic)

        const meanings = response[0]?.meanings || [];
        
        for(const m of meanings){
          const count = m?.definitions?.length || 0;
          const wordType = m?.partOfSpeech || ''

          for (let i = 0; i < count; i++) {
            if (wordType === ''){
              return;
            }
            this.typeWordData.push(wordType);
          }
        }

        this.dialog.open(WordDefinitionComponent, {
          data: { word, definition: definitions, types: this.typeWordData, phonetic: this.phoneticWordData },
        });
      },

      error: () => {
        this.dialog.open(WordDefinitionComponent, {
          data: { word, definition: null , types: this.typeWordData, phonetic: this.phoneticWordData },
        });
      }   
    });

    this.phoneticWordData = ''
  }

}