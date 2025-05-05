import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  {jwtDecode}  from 'jwt-decode';
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
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-home',
  imports: [ MatTabsModule, MatButtonModule, 
    MatSidenavModule, CreateWordComponent, CommonModule, MatIcon,
    MatToolbar, GetWordComponent, GetWordsComponent, DeleteWordComponent,
    UpdateWordComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentView: HomeView =  HomeView.LandingPage;
  homeView = HomeView;
  
  wordType = WordType;

  isAuthenticated = false;


  ngOnInit() {
    const authTimestamp = localStorage.getItem('authTimestamp');
    const oneDay = 24 * 60 * 60 * 1000;

    if (authTimestamp) {
      const timeElapsed = Date.now() - parseInt(authTimestamp, 10);
      if (timeElapsed < oneDay) {
        this.isAuthenticated = true;
      } else {
        this.redirectToGitHub();
      }
    }

    this.route.queryParams.subscribe(params => {
      if (params['auth'] === 'success') {
        this.isAuthenticated = true;
        localStorage.setItem('auth', 'true');
        localStorage.setItem('authTimestamp', Date.now().toString());

        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true,
        });
      }
    });
  }

  setView(view: HomeView){
    this.currentView = view
  }

  loginWithGitHub(){
    window.location.href = environment.frontEndLoginUri;
  }

  redirectToGitHub() {
    localStorage.removeItem('auth');
    localStorage.removeItem('authTimestamp');
    window.location.href = environment.frontEndLoginUri
  }
}
