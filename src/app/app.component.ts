import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'ess';

  link: ILink;

  constructor() {
    this.link = links.home;
  }


}
