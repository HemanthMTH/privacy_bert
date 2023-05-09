import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  showPopular = true;
  type = 'Popular websites';

  toggleComponents() {
    this.showPopular = !this.showPopular;
    this.type = this.showPopular == true ? 'Popular websites'  : 'Smart Devices websites';
  }

}
