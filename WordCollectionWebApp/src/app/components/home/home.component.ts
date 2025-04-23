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

  isAuthorized = false;
  validIssuer = 'https://github.com/login/oauth';


    ngOnInit() {
      const token = this.route.snapshot.queryParamMap.get('token');

      if (token) {
        localStorage.setItem('jwt', token);

        try {
          const decoded: any = jwtDecode(token);

          // Simple issuer validation
          if (decoded.iss === this.validIssuer) {
            this.isAuthorized = true;
          } else {
            console.warn('Invalid issuer:', decoded.iss);
            this.isAuthorized = false;
          }
        } catch (e) {
          console.error('Invalid token', e);
          this.isAuthorized = false;
        }

        // Optionally navigate to dashboard
        this.router.navigate(['/']);
      } else {
        // Check if already logged in from localStorage
        const stored = localStorage.getItem('jwt');
        if (stored) {
          try {
            const decoded: any = jwtDecode(stored);
            this.isAuthorized = decoded.iss === this.validIssuer;
          } catch {
            this.isAuthorized = false;
          }
        }
      }
    }

  setView(view: HomeView){
    this.currentView = view
  }
}
