import { Component } from '@angular/core';
import { Magnetometer, MagnetometerReading } from '@ionic-native/magnetometer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: MagnetometerReading;

  constructor(private magnetometer: Magnetometer) {
    this.magnetometer.watchReadings().subscribe(res => {
      this.data = res;
    })
  }

}
