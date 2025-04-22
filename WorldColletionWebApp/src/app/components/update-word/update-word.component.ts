import { Component, inject, Inject, OnInit } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import { HttpMethod } from '../../common/enum/httpMethods';
import { SubmissionComponent } from '../submission/submission.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { IWord } from '../../common/interfaces/word';
import { WordCollectionService } from '../../common/services/wordCollection.service';


@Component({
  selector: 'app-update-word',
  imports: [SubmissionComponent, FormsModule, MatAutocompleteModule, ReactiveFormsModule,
    AsyncPipe, CommonModule],
  standalone: true,
  templateUrl: './update-word.component.html',
  styleUrl: './update-word.component.scss'
})
export class UpdateWordComponent {

  private wordService = inject(WordCollectionService);

  currentView: HomeView =  HomeView.UpdateWordPage;
  homeView = HomeView;
  httpMethod = HttpMethod;

  control = new FormControl('');
  existingWords: IWord[] = [];
  filteredWords: Observable<IWord[]> | undefined;

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

  private filterWords(rawInput: string): IWord[] {
    const norm = this.normalize(rawInput);
    return this.existingWords.filter(w =>
      this.normalize(w.word).includes(norm)
    );
  }

  private normalize(v: string): string {
    return v.toLowerCase().replace(/\s+/g, '');
  }

}
