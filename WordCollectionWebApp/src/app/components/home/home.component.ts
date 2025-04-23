import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { WordType } from '../../common/enum/wordType';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateWordComponent } from "../create-word/create-word.component";
import { HomeView } from '../../common/enum/homeView';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { GetWordComponent } from "../get-word/get-word.component";
import { GetWordsComponent } from "../get-words/get-words.component";
import { DeleteWordComponent } from "../delete-word/delete-word.component";
import { UpdateWordComponent } from "../update-word/update-word.component";


@Component({
  selector: 'app-home',
  imports: [ MatTabsModule, MatButtonModule,
    MatSidenavModule, CreateWordComponent, CommonModule, MatIcon,
    MatToolbar, GetWordComponent, GetWordsComponent, DeleteWordComponent, UpdateWordComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentView: HomeView =  HomeView.LandingPage;
  homeView = HomeView;
  
  wordType = WordType;

  ngOnInit(){
  }

  setView(view: HomeView){
    this.currentView = view
  }
}
