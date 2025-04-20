import { Component, inject } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';
import { ApiEndpoints } from '../../common/endpointDefinition/apiEndpoints';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ],
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.scss'
})
export class SubmissionComponent {
 
  private wordService = inject(WordCollectionService)


  httpSubmit(){
    this.wordService.GET_Words()
  }
}
