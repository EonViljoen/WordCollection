import { Component } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';
import { HttpMethod } from '../../common/enum/httpMethods';
import { SubmissionComponent } from "../submission/submission.component";

@Component({
  selector: 'app-delete-word',
  standalone: true,
  imports: [SubmissionComponent],
  templateUrl: './delete-word.component.html',
  styleUrl: './delete-word.component.scss'
})
export class DeleteWordComponent {

  currentView: HomeView =  HomeView.DeleteWordPage;
  homeView = HomeView;
  httpMethod = HttpMethod;

}
