import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'angular-highcharts'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-angular';
}
