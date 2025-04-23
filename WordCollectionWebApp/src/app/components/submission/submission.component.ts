import { Component, inject, input, EventEmitter, Output } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WordType } from '../../common/enum/wordType';
import { FormsModule } from '@angular/forms';
import { HttpMethod } from '../../common/enum/httpMethods';
import { IWord } from '../../common/interfaces/word';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatInputModule,
    FormsModule],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent {
 
  private wordService = inject(WordCollectionService);
  private snackBar = inject(MatSnackBar)
  
  submittedItem: string = '';

  wordType = input<WordType>();
  httpAction = input<HttpMethod>();

  selectedWord = input<IWord | undefined>();

  @Output() outputedWord = new EventEmitter<IWord>();

  ngOnInit(): void {
    const selected = this.selectedWord();
    if (selected) {
      this.submittedItem = selected.word
    }
  }

  showSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

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

      case HttpMethod.PUT:
        this.updateWord();
        break;

      default:
        this.showSnackBar('Unsupported HTTP method: ' + method)
        break;

    }
  }

  deleteWord() {
    let capturedItem: string = this.submittedItem;
    let wordId: number = 0;

    try{
      wordId = parseInt(capturedItem);
    }
    catch(error){
      if (capturedItem === undefined){
        return;
      }
      else {
        this.showSnackBar('Error deleting word: ' + error)
      }

    }
    this.wordService.DELETE_Word(wordId).subscribe(res => {
      this.showSnackBar('Word deleted: ' + res)
    });
  }

  getWord() {
    let wordId: any = this.submittedItem;
    
    try{
      wordId = parseInt(wordId);
    }
    catch(error){
      if (wordId === undefined){
        this.showSnackBar('Id not given')
        return;
      }
      else {
        this.showSnackBar('Error getting word: ' + error)
      }
    }
    this.wordService.GET_Word(wordId).subscribe(word => {
      console.log(word);
    })
  }

  createWord(){
    const wordType = this.wordType();

    if (wordType === undefined) {
      this.showSnackBar('Word type is not selected!')
      return;
    }

    this.wordService.POST_Word({
      id: 0,
      type: wordType,
      word: this.submittedItem
    });
  }

  updateWord(){
    const word = this.selectedWord();

    if (!word) {
      this.showSnackBar('No word selected to update')
      return;
    }

    const updatedWord: IWord = {
      ...word,
      word: this.submittedItem
    };

    this.wordService.PUT_Word(word.id, updatedWord).subscribe({
      next: (res) =>{
        this.outputedWord.emit(updatedWord);
        this.submittedItem = '';
        this.showSnackBar('Successfully updated ' + word.word);
      },
      error: (err: any) => {
        this.showSnackBar('Update failed: ' + err)
      }
    })
  }
  
}
