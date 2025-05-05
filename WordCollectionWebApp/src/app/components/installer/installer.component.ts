import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-installer',
  imports: [CommonModule, MatButtonModule],
  standalone: true,
  templateUrl: './installer.component.html',
  styleUrl: './installer.component.scss'
})
export class InstallerComponent {
  private snackBar = inject(MatSnackBar)

  
  deferredPrompt: any;

  showSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: any) {
    event.preventDefault();
    this.deferredPrompt = event;
  }

  installPWA() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.showSnackBar('User accepted the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

}
