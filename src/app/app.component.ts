import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { APIKEY_URL, HOME_URL } from './modules/routing/routing.module';
import { LockService } from './services/lock.service';

interface ILink {
  title: string;
  url: string;
}

const links = {
  home: { title: 'Back to list', url: HOME_URL },
  apikey: { title: 'Set API-Key', url: APIKEY_URL },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ess';

  link: ILink;

  constructor(private router: Router, public lockService: LockService) {}

  // Подписываемся на событие навигации, смотрим, на каком url находимся
  // и меняем надпись и routerLink у ссылки в template.
  ngOnInit(): void {
    this.link = links.home;
    
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: any) => event.url)
      )
      .subscribe((url) => {
        switch (url) {
          case HOME_URL:
            this.link = links.apikey;
            break;
          case APIKEY_URL:
            this.link = links.home;
            break;
        }
      });
  }
}
