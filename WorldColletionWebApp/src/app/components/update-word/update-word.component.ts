import { Component } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';

@Component({
  selector: 'app-update-word',
  imports: [],
  standalone: true,
  templateUrl: './update-word.component.html',
  styleUrl: './update-word.component.scss'
})
export class UpdateWordComponent {

  currentView: HomeView =  HomeView.UpdateWordPage;
  homeView = HomeView;
}
