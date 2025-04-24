import { Component, inject } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import { HttpMethod } from '../../common/enum/httpMethods';
import { SubmissionComponent } from "../submission/submission.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { IWord } from '../../common/interfaces/word';
import { WordCollectionService } from '../../common/services/wordCollection.service';

@Component({
  selector: 'app-delete-word',
  standalone: true,
  imports: [SubmissionComponent, FormsModule, MatAutocompleteModule, ReactiveFormsModule,
    CommonModule],
  templateUrl: './delete-word.component.html',
  styleUrl: './delete-word.component.scss'
})
export class DeleteWordComponent {
  private wordService = inject(WordCollectionService);

  currentView: HomeView =  HomeView.DeleteWordPage;
  homeView = HomeView;
  httpMethod = HttpMethod;

  control = new FormControl('');
  existingWords: IWord[] = [];
  filteredWords: Observable<IWord[]> | undefined;

  selectedWord: IWord | undefined;
  
    ngOnInit(): void {
      this.wordService.GET_Words().subscribe({
        next: (res: IWord[]) => {
          this.existingWords = res;
        },
        error: (err: any) => {
          console.error('Failed to fetch words', err);
        }
      });
  
      this.filteredWords = this.control.valueChanges.pipe(
        startWith(''),
        map(input => this.filterWords((input ?? '').toString()))
      );
    }

    handleDeletedWord(deletedWord: IWord) {
      this.existingWords = this.existingWords.filter(w => w.id !== deletedWord.id);
    }
    
    
    onOptionSelected(event: MatAutocompleteSelectedEvent) {
      const selectedText = event.option.value;
      this.selectedWord = this.existingWords.find(w => w.word === selectedText);
      if (this.selectedWord) {
        console.log('Selected word:', this.selectedWord); // Debugging line
      } else {
        console.log('No word found matching the selection');
      }
    }
    
  
    filterWords(rawInput: string): IWord[] {
      const norm = this.normalize(rawInput);
      return this.existingWords.filter(w =>
        this.normalize(w.word).includes(norm)
      );
    }
  
    normalize(v: string): string {
      return v.toLowerCase().replace(/\s+/g, '');
    }
}
