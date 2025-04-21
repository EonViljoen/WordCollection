import { Component, inject } from '@angular/core';
// import { WordCollectionService } from '../../common/services/wordCollection.service';
import { SubmissionComponent } from "../submission/submission.component";
import {MatTabsModule} from '@angular/material/tabs';
import { WordType } from '../../common/enum/wordType';


@Component({
  selector: 'app-home',
  imports: [SubmissionComponent, MatTabsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wordType = WordType;

  ngOnInit(){
  }
}
