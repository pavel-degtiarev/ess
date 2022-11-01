import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { APIKEY, HOME } from './modules/routing/routing.module';

interface ILink {
  title: string;
  url: string;
}

const HOME_URL = `/${HOME}`;
const APIKEY_URL = `/${APIKEY}`;

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

  constructor(private router: Router) {
    this.link = links.home;
  }

  // Подписываемся на событие навигации, смотрим, на каком url находимся
  // и меняем надпись и routerLink у ссылки в template.
  ngOnInit(): void {
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
