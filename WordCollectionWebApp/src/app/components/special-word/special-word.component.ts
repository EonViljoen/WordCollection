import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-special-word',
  imports: [MatDialogModule, MatDialogActions, MatDialogContent, MatButton],
  standalone: true,
  templateUrl: './special-word.component.html',
  styleUrl: './special-word.component.scss'
})
export class SpecialWordComponent {

  secretWordImages: { [key: string]: string } = {
    'Monkey': 'https://i.kym-cdn.com/photos/images/newsfeed/001/867/654/334.jpg',
    'Nice': 'https://c.tenor.com/H6sjheSkU1wAAAAC/tenor.gif',
    'Wow': 'https://media1.tenor.com/m/DZABNgDBlt4AAAAd/owen-wilson-wow-marley-and-me.gif',
    'Bitch': 'https://c.tenor.com/eoTPnp9KEcoAAAAd/tenor.gif',
    'Fine': 'https://c.tenor.com/MYZgsN2TDJAAAAAC/tenor.gif'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      word: string;
    }) {}
}
