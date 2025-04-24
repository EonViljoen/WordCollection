import { Component } from '@angular/core';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Vocabulary Documentation';
}
