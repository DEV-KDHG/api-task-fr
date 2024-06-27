import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  newState = {
    nameState: '',
    description: ''
  };
  showAddStateForm = false;

  toggleAddStateForm() {
    this.showAddStateForm = !this.showAddStateForm;
  }
 

  getAllStates() {
    this.serviceService.getAllStates().subscribe(
      data => this.states = data,
      error => console.error('Error fetching states', error)
    );
  }

  constructor(private serviceService: ServiceService, private router: Router) {}
  ngOnInit(): void {
    this.getAllStates();
  }

 
  states: any[] = [];


  searchQuery = '';


  createState() {
    this.serviceService.createState(this.newState).subscribe(
      () => {
        this.getAllStates(); // Recargar la lista de estados
        this.toggleAddStateForm(); // Cerrar el formulario
        this.newState = { nameState: '', description: '' }; // Restablecer el formulario
      },
      error => console.error('Error creating state', error)
    );
  }


  searchState() {
    if (!this.searchQuery.trim()) {
      this.getAllStates(); // Si la consulta de búsqueda está vacía, cargar todos los estados
      return;
    }
    this.serviceService.getStateByName(this.searchQuery).subscribe(
      data => this.states =[data], // Asume que la respuesta es un solo estado
      error => console.error('Error searching for state', error)
    );
  }
  deleteStateById(_id: string): void {
    // Verificar si el id es undefined o no
    if (!_id) {
      console.error('El ID del estado es undefined. No se puede eliminar.');
      return; // Salir del método si el id es undefined
    }
  
    this.serviceService.deleteStateById(_id).subscribe({
      next: (response) => {
        // Manejo de la respuesta exitosa
        console.log('Estado eliminado con éxito', response);
        window.location.reload();
      },
      error: (error) => {
        // Manejo de errores
        console.error('Error al eliminar el estado', error);
      }
    });
  }






}
