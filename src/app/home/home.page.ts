import { Component } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data: DeviceOrientationCompassHeading = null;

  constructor(private deviceOrientation: DeviceOrientation) {
    // Watch the device compass heading change
    this.deviceOrientation.watchHeading().subscribe((res: DeviceOrientationCompassHeading) => {
      this.data = res;
      }
    );
  }

}
