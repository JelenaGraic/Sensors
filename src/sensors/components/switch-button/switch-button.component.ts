import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleGridView() {

    this.router.url == '/' ? this.router.navigate(['/table']) : this.router.navigate(['/']);
 }


}
