import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio: number;
  whatsapp: string;
  telegram: string;
  constructor() {
    this.anio = new Date().getFullYear();
    this.whatsapp = '';
    this.telegram = '';
  }

  ngOnInit(): void {}
}

