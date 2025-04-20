import { Component, inject } from '@angular/core';
import { WordCollectionService } from '../../common/services/wordCollection.service';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private wordService = inject(WordCollectionService)

  ngOnInit(){
    this.wordService.GETDefaultWord()
  }
}
