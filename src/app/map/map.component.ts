import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import data from '../../assets/usa.json';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  private map?: H.Map;
  lat: number = 30.266666;
  lng: number = -97.73333;
  states = data;
  constructor() {}

  @ViewChild('map') mapDiv?: ElementRef;
  changeState($event: any) {
    const selectedState = this.states.find((item) => item.zip === $event);
    this.changeLocation(selectedState?.lat, selectedState?.lng);
  }
  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: '-za035F5KETX4r4YsmRHdJAAxix82hY8wpfrxsdQVV8',
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: this.lat, lng: this.lng },
          zoom: 3,
        }
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
    }
  }

  changeLocation(lat: any, lng: any): void {
    if (this.map) {
      this.map.setCenter({ lat, lng });
      this.map.setZoom(5);
    }
  }
}
