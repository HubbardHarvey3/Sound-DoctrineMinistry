import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { filter } from 'rxjs/operators'


declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoundDoctrine';

  constructor(public _authService: AuthService, router: Router) {
    const navEndEvents = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvents.subscribe((e: NavigationEnd) => {
      gtag('config', 'UA-179013208-1', { 'page_path': e.urlAfterRedirects });
    })
  }


}
