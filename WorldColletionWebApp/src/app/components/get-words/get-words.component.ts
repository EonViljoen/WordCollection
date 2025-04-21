import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import {MatTableModule} from '@angular/material/table';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import { IWord } from '../../common/interfaces/word';


@Component({
  selector: 'app-get-words',
  imports: [ MatTableModule ],
  standalone: true,
  templateUrl: './get-words.component.html',
  styleUrl: './get-words.component.scss'
})
export class GetWordsComponent {

  private wordService = inject(WordCollectionService);

  displayedColumns: string[] = ['Word', 'Type'];
  currentView: HomeView =  HomeView.GetWordsPage;
  homeView = HomeView;

  
  @Input() visible: boolean = false;

  existingWords : IWord[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.refreshList();
    }
  }

  refreshList() {
    this.wordService.GET_Words().subscribe({
      next: (res) => {
        this.existingWords = res;
      },
      error: (err) => {
        console.error('Failed to fetch words', err);
      }
    });
  }

}