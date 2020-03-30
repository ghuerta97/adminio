import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'app/services/configuracion.service';
import { Configuration } from 'app/model/configuracion';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  time = { hour: 13, minute: 30 };
  dias = [];
  configActual: Configuration = {} as Configuration;

  constructor(private configuracionService: ConfigurationService) {
    for (let i = 1; i < 29; i++) {
      this.dias.push(i);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.configuracionService.obtenerConfiguracion()
        .subscribe(data => {
          this.configActual = data;
          this.configActual.calculoGasto = data.calculoGasto;
          this.configActual.dia = data.dia;
          this.configActual.hora = data.hora;
          var [h, m] = this.configActual.hora.split(':');
          this.time.hour = Number(h);
          this.time.minute = Number(m);
        });
    }, 2000)
  }

  saveConfiguracion( forma, dia, hora) {

    this.configActual.dia = dia;
    this.configActual.hora = hora.hour + ':' + hora.minute;
    this.configActual.calculoGasto = forma;
    this.configuracionService.configuraBoleta(this.configActual)
      .subscribe(data => {

      });
  }
}
