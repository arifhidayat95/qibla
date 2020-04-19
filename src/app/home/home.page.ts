import { Component } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data: DeviceOrientationCompassHeading = null;
  public currentLocation: Geoposition = null;
  // Initial Kaaba location that we've got from google maps
  private kaabaLocation: {lat:number,lng:number} = {lat: 21.42276, lng: 39.8256687};
  // Initial Qibla Location
  public qiblaLocation = 0;

  constructor(private deviceOrientation: DeviceOrientation, private geolocation: Geolocation) {
    // Watch the device compass heading change
    this.deviceOrientation.watchHeading().subscribe((res: DeviceOrientationCompassHeading) => {
      this.data = res;
      // Change qiblaLocation when currentLocation is not empty 
      if (!!this.currentLocation) {
        const currentQibla = res.magneticHeading-this.getQiblaPosition();
        this.qiblaLocation = currentQibla > 360 ? currentQibla%360 : currentQibla;
      }
    });
    // Watch current location
    this.geolocation.watchPosition().subscribe((res) => {
        this.currentLocation = res;
    });
  }

  getQiblaPosition() {
    // Convert all geopoint degree to radian before jump to furmula
    const currentLocationLat = this.degreeToRadian(this.currentLocation.coords.latitude);
    const currentLocationLng = this.degreeToRadian(this.currentLocation.coords.longitude);
    const kaabaLocationLat = this.degreeToRadian(this.kaabaLocation.lat);
    const kaabaLocationLng = this.degreeToRadian(this.kaabaLocation.lng);

    // Use Basic Spherical Trigonometric Formula
    return this.radianToDegree(
      Math.atan2(
        Math.sin(kaabaLocationLng-currentLocationLng),
        (Math.cos(currentLocationLat) * Math.tan(kaabaLocationLat) - Math.sin(currentLocationLat) * Math.cos(kaabaLocationLng - currentLocationLng))
      )
    );
  }

  /**
   * Convert from Radian to Degree
   * @param radian 
   */
  radianToDegree(radian: number) {
    return radian * 180 / Math.PI;
  }

  /**
   * Convert from Degree to Radian
   * @param degree 
   */
  degreeToRadian(degree: number) {
    return degree * Math.PI / 180;
  }

}
