import { Component, inject, input } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WordType } from '../../common/enum/wordType';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent {
 
  private wordService = inject(WordCollectionService)
  
  submittedWord: string = '';
  wordType = input<WordType>();


  httpSubmit(){
    console.log(this.submittedWord)
    const wordType = this.wordType();
    if (wordType === undefined) {
      console.error("Word type is not selected!");
      return;
    }

    this.wordService.POST_Word({
      type: wordType,
      word: this.submittedWord
    });
  }
}
