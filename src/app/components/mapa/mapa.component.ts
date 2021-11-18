import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores:Marcador[]=[];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private _snackBar: MatSnackBar,
              public dialog:MatDialog) {}

  ngOnInit(): void {
    if(localStorage.getItem('marcadores')){
         this.marcadores = JSON.parse(localStorage.getItem('marcadores')! );
    }

  }

  agregarMarcador(evento:any){
    const coords: {lat: number, lng: number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this._snackBar.open('Marcador agregado', 'Cerrar', {duration:3000});

  }
  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores))
  }

  editarMarcador(marcador:Marcador){

      const dialogRef = this.dialog.open(MapaEditarComponent,{
        width:'250px',
        data:{titulo:marcador.titulo,desc:marcador.desc}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          return;
        }
          marcador.titulo=result.titulo;
          marcador.desc=result.desc;
          this.guardarStorage();
          this._snackBar.open('Editado Correctamente', 'Cerrar', {duration:3000});
      });

  }

  borrarMarcador(index:number){
    this.marcadores.splice(index,1);
    this.guardarStorage();
    this._snackBar.open('Marcador borrado', 'Cerrar', {duration:3000});
  }
}
