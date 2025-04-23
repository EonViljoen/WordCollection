import { Component } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import { SubmissionComponent } from "../submission/submission.component";
import { HttpMethod } from '../../common/enum/httpMethods';

@Component({
  selector: 'app-get-word',
  standalone: true,
  imports: [SubmissionComponent],
  templateUrl: './get-word.component.html',
  styleUrl: './get-word.component.scss'
})
export class GetWordComponent {

  currentView: HomeView =  HomeView.GetWordPage;
  homeView = HomeView;
  httpMethod = HttpMethod;
}
