import { Component, inject } from '@angular/core';
import { SubmissionComponent } from "../submission/submission.component";
import {MatTabsModule} from '@angular/material/tabs';
import { WordType } from '../../common/enum/wordType';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeView } from '../../common/enum/homeView';
import { HttpMethod } from '../../common/enum/httpMethods';

@Component({
  selector: 'app-create-word',
  standalone: true,
  imports: [SubmissionComponent, MatTabsModule, MatButtonModule, MatSidenavModule],
  templateUrl: './create-word.component.html',
  styleUrl: './create-word.component.scss'
})
export class CreateWordComponent {

  wordType = WordType;
  httpMethod = HttpMethod;

  currentView: HomeView =  HomeView.CreateWordPage;
  homeView = HomeView;

}
