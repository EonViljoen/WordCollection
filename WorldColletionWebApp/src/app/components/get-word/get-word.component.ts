import { Component } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';

@Component({
  selector: 'app-get-word',
  standalone: true,
  imports: [],
  templateUrl: './get-word.component.html',
  styleUrl: './get-word.component.scss'
})
export class GetWordComponent {

  currentView: HomeView =  HomeView.GetWordPage;
  homeView = HomeView;
}
