import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-installer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './installer.component.html',
  styleUrl: './installer.component.scss'
})
export class InstallerComponent {
  deferredPrompt: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: any) {
    event.preventDefault();
    this.deferredPrompt = event;
  }
  installPWA() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

}
