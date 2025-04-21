import { Component } from '@angular/core';
import { HomeView } from '../../common/enum/homeView';

@Component({
  selector: 'app-delete-word',
  standalone: true,
  imports: [],
  templateUrl: './delete-word.component.html',
  styleUrl: './delete-word.component.scss'
})
export class DeleteWordComponent {

  currentView: HomeView =  HomeView.DeleteWordPage;
  homeView = HomeView;

}
