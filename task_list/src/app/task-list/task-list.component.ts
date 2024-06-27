import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  categories: any[] = [];
  states: any[] = [];
  editingTask: boolean = false;
  editedTask: any = {};
  searchQuery: string = '';
  showNewWork: boolean = false; // Variable para mostrar el panel de nueva tarea
  showEditPanel: boolean = false; // Esta variable no se usa en el código que me proporcionaste

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchCategories();
    this.fetchStates();
  }


  fetchCategories() {
    this.service.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        this.populateTaskDetails();
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  fetchStates() {
    this.service.getAllStates().subscribe(
      (data: any[]) => {
        this.states = data;
        this.populateTaskDetails();
      },
      (error) => {
        console.error('Error al obtener los estados:', error);
      }
    );
  }

  populateTaskDetails() {
    if (this.tasks.length > 0 && this.categories.length > 0 && this.states.length > 0) {
      this.tasks.forEach(task => {
        task.categoria = {
          _id: task.categoriaId._id,
          nameCategory: task.categoriaId.nameCategory
        };
        task.estado = {
          _id: task.estadoId._id,
          nameState: task.estadoId.nameState
        };
      });
      this.filteredTasks = [...this.tasks];
    }
  }
  
  fetchTasks() {
    this.service.getAllTasks().subscribe(
      (data: any[]) => {
        this.tasks = data;
        console.log('Datos de tareas obtenidos:', this.tasks); // Agregar console.log para mostrar los datos obtenidos
        this.populateTaskDetails(); // Llama a populateTaskDetails() después de obtener las tareas
        this.filteredTasks = [...this.tasks]; // Inicialmente, filtra con todas las tareas
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }
  

  showNewTaskPanel() {
    this.showNewWork = true; // Mostrar el panel de nueva tarea
  }

  closeNewTaskPanel() {
    this.showNewWork = false; // Ocultar el panel de nueva tarea
  }

  deleteTask(taskId: string) {
    if (!taskId) {
      console.error('ID de tarea no definido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.service.deleteTaskById(taskId).subscribe(
        () => {
          // Elimina la tarea del arreglo local
          this.tasks = this.tasks.filter(task => task._id !== taskId);
          this.filteredTasks = [...this.tasks]; // Actualiza las tareas filtradas también
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }

  editTask(task: any) {
    this.editedTask = { ...task };
    this.editingTask = true;
  }

  cancelEdit() {
    this.editingTask = false;
    this.editedTask = {};
  }

  saveEditedTask() {
    const { _id, ...updatedTask } = this.editedTask; // Extrae el ID y los datos actualizados
    this.service.updateTask(_id, updatedTask).subscribe(
      (updatedTask: any) => {
        // Actualiza la tarea en el arreglo local
        const index = this.tasks.findIndex(task => task._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.populateTaskDetails();
          this.filteredTasks = [...this.tasks]; // Actualiza las tareas filtradas también
        }
        this.cancelEdit();
      },
      (error) => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

  searchTasks() {
    if (!this.searchQuery.trim()) {
      this.filteredTasks = [...this.tasks]; // Restaura todas las tareas si la búsqueda está vacía
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
