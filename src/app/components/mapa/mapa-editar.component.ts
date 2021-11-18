import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

import{FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  form:FormGroup;
  
  constructor(
    public fb:FormBuilder,
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.form = fb.group({
      'titulo': data.titulo,
      'desc': data.desc
    });
  }

  ngOnInit(): void {
  }
  guardarCambios(){
    // Mandamos la informacion del Modal al padre
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
