import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipesApp';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      'addIcon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/add_icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'send',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/send.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'backArrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/arrow-left.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/edit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/delete.svg')
    );
  }
}
