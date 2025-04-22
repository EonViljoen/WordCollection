import { Component, inject, input } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WordType } from '../../common/enum/wordType';
import { FormsModule } from '@angular/forms';
import { HttpMethod } from '../../common/enum/httpMethods';



@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent {
 
  private wordService = inject(WordCollectionService)
  
  submittedItem: string = '';

  wordType = input<WordType>();
  httpAction = input<HttpMethod>();

  httpSubmit(){
    const method = this.httpAction();

    switch (method) {
      case HttpMethod.GET:
        this.getWord();
        break;

      case HttpMethod.POST:
        this.createWord();
        break;

      case HttpMethod.DELETE:
        this.deleteWord();
        break;

      default:
        console.warn('Unsupported HTTP method:', method);
        break;

    }
  }
  deleteWord() {
    let capturedItem: string = this.submittedItem;
    let wordId: number = 0;

    try{
      wordId = parseInt(capturedItem);
      console.log('did a thing?')

    }
    catch(error){
      if (capturedItem === undefined){
        console.log('Id not given, ');
        return;
      }
      else {
        console.log('Error : ', error)
      }

    }
    this.wordService.DELETE_Word(wordId).subscribe(res => {
      console.log('worked?')
      console.log(res)
    });
  }

  getWord() {
    let wordId: any = this.submittedItem;
    
    try{
      wordId = parseInt(wordId);
    }
    catch(error){
      if (wordId === undefined){
        console.log('Id not given');
        return;
      }
      else {
        console.log('Error : ', error)
      }
    }
    this.wordService.GET_Word(wordId).subscribe(word => {
      console.log(word);
    })
  }

  createWord(){
    const wordType = this.wordType();

    if (wordType === undefined) {
      console.error("Word type is not selected!");
      return;
    }

    this.wordService.POST_Word({
      type: wordType,
      word: this.submittedItem
    });
  }
  
}
