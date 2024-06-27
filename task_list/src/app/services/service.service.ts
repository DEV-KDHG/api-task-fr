import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const URL = 'http://localhost:9000/api/tasks';
const URLTask = 'http://localhost:9000/api/';
const URLState = 'http://localhost:9000/api/state';
const URLCategory = 'http://localhost:9000/api/categories';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  // Crear una nueva tarea
  createTask(taskData: { name: string; description: string; categoriaId: string; estadoId: string }): Observable<any> {
    return this.http.post(`${URLTask}/tasks`, taskData);
  }

  // Obtener todas las tareas
  getAllTasks(): Observable<any> {
    return this.http.get(URL);
  }

  // Obtener una tarea por ID
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }
  

  // Obtener una tarea por nombre
  getTaskByName(name: string): Observable<any> {
    return this.http.get(`${URL}/name/${name}`);
  }

  // Eliminar una tarea por ID
  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }
  // Actualizar una tarea por ID

updateTask(id: string, task: any): Observable<any> {
  return this.http.put<any>(`${URL}/${id}`, task);
}

  // Crear un nuevo estado
  createState(stateData: any): Observable<any> {
    return this.http.post(`${URLState}`, stateData);
  }

  // Obtener todos los estados
  getAllStates(): Observable<any> {
    return this.http.get(`${URLState}`);
  }

  // Buscar un estado por nombre
  getStateByName(nameState: string): Observable<any> {
    return this.http.get(`${URLState}/nameState/${nameState}`);
  }



// Actualizar un estado por nombre
updateStateByName(nameState: string, stateData: any): Observable<any> {
  return this.http.put(`${URLState}/name/${nameState}`, stateData);
}

// Eliminar un estado por ID
deleteStateById(id: string): Observable<any> {
  return this.http.delete(`${URLState}/${id}`);
}
// Obtener un estado por ID
getStateById(id: string): Observable<any> {
  return this.http.get(`${URLState}/${id}`);
}


// Crear una nueva categoría
createCategory(categoryData: any): Observable<any> {
  return this.http.post(`${URLCategory}`, categoryData);
}


// Obtener todas las categorías
getAllCategories(): Observable<any> {
  return this.http.get(`${URLCategory}`);
}


// Obtener una categoría por ID
getCategoryById(id: string): Observable<any> {
  return this.http.get(`${URLCategory}/${id}`);
}


// Actualizar una categoría por ID
updateCategoryById(id: string, categoryData: any): Observable<any> {
  return this.http.put(`${URLCategory}/${id}`, categoryData);
}


// Eliminar una categoría por ID
deleteCategoryById(id: string): Observable<any> {
  return this.http.delete(`${URLCategory}/${id}`);
}


// Obtener una categoría por nombre
getCategoryByName(name: string): Observable<any> {
  return this.http.get(`${URLCategory}/name/${name}`);
}


// Actualizar una categoría por nombre
updateCategoryByName(name: string, categoryData: any): Observable<any> {
  return this.http.put(`${URLCategory}/name/${name}`, categoryData);
}

}
