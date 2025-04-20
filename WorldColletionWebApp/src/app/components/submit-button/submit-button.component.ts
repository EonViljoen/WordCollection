import { Component, inject } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent {

  private wordService = inject(WordCollectionService)

  httpSubmit(){
    console.log(this.wordService.GETDefaultWord())
  }
}
