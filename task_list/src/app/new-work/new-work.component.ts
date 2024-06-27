import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { NgZone } from '@angular/core'; // Importa NgZone

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.css']
})
export class NewWorkComponent implements OnInit {

  name: string = '';
  description: string = '';
  categoriaId: string = '';
  estadoId: string = '';
  selectedCategory: any; // Variable para almacenar la categoría seleccionada
  selectedState: any; // Variable para almacenar el estado seleccionado
  states: any[] = [];
  categories: any[] = [];
 
  constructor(private serviceService: ServiceService, private router: Router,  private zone: NgZone) {}

  ngOnInit() {
    this.loadAllStates();
    this.loadAllCategories();
  }

  createTask() {
    // Validación básica
    if (!this.name || !this.description || !this.selectedCategory || !this.selectedState) {
      console.error('All fields are required');
      return;
    }

    const taskData = {
      name: this.name,
      description: this.description,
      categoriaId: this.selectedCategory._id, // Usar el _id de la categoría seleccionada
      estadoId: this.selectedState._id // Usar el _id del estado seleccionado
    };

    console.log('Request body:', taskData); // Mostrar en consola el objeto que se envía

    this.serviceService.createTask(taskData).subscribe({
      next: (response) => {
        console.log('Task created successfully', response);
      this.resetForm();
      this.close.emit();
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  // Método para limpiar el formulario
  resetForm() {
    this.name = '';
    this.description = '';
    this.selectedCategory = null;
    this.selectedState = null;
  }

  loadAllStates() {
    this.serviceService.getAllStates().subscribe({
      next: (states) => {
        this.states = states;
        console.log('States:', states);
      },
      error: (error) => console.error('Error fetching states:', error)
    });
  }

  loadAllCategories() {
    this.serviceService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories:', categories);
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  isClose() {
    this.close.emit();
    
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.zone.run(() => this.router.navigate(['/task-list'])), 0);
    });
  }

  private showModalSubject = new Subject<boolean>();
  @Output() close = new EventEmitter<void>();

  isDragging = false;
  initialX = 0;
  initialY = 0;
  offsetX = 0;
  offsetY = 0;

  get showModal$() {
    return this.showModalSubject.asObservable();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.stopDragging();
    }
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX - this.offsetX;
    this.initialY = event.clientY - this.offsetY;
  }

  stopDragging() {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onDragging(event: MouseEvent) {
    if (!this.isDragging) return;

    this.offsetX = event.clientX - this.initialX;
    this.offsetY = event.clientY - this.initialY;

    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.setAttribute('style', `top: ${this.offsetY}px; left: ${this.offsetX}px;`);
    }
  }

  saveTask(event: Event) {
    event.preventDefault();
    // Lógica para guardar la nueva tarea
    this.close.emit();
  }

  onSelectCategory(category: any) {
    this.selectedCategory = category;
    this.categoriaId = category._id; // Asignar el _id de la categoría seleccionada
  }

  onSelectState(state: any) {
    this.selectedState = state;
    this.estadoId = state._id; // Asignar el _id del estado seleccionado
  }
}
