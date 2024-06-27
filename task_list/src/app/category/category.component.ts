import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = []; // Array to store categories


  showAddCategoryForm = false;
  showAddStateForm = false;
  searchQuery = '';
  newCategory = { nameCategory: '', description: '' }; // Category object


  constructor(private serviceService: ServiceService, private router: Router) {}


 


  toggleAddStateForm() {
    this.showAddStateForm = !this.showAddStateForm;
  }




  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories() {
    this.serviceService.getAllCategories().subscribe(
      data => (this.categories = data),
      error => console.error('Error fetching categories', error)
    );
  }


  createCategory() {
    this.serviceService.createCategory(this.newCategory).subscribe(
      () => {
        this.getAllCategories(); // Refresh the list of categories
        this.toggleAddCategoryForm(); // Close the form
        this.newCategory = { nameCategory: '', description: '' }; // Reset the form
      },
      error => console.error('Error creating category', error)
    );
  }


  getCategoryById(id: string) {
    this.serviceService.getCategoryById(id).subscribe(
      data => {
        // Handle retrieved category data (e.g., display details)
        console.log('Retrieved category:', data);
      },
      error => console.error('Error fetching category by ID', error)
    );
  }


  updateCategoryById(id: string, categoryData: any) {
    this.serviceService.updateCategoryById(id, categoryData).subscribe(
      () => {
        // Handle successful update (e.g., display success message, refresh list)
        console.log('Category updated successfully');
        // You might want to refresh the list here
      },
      error => console.error('Error updating category by ID', error)
    );
  }


  deleteCategoryById(id: string) {
    this.serviceService.deleteCategoryById(id).subscribe(
      () => {
        this.getAllCategories(); // Refresh the list after deletion
        console.log('Category deleted successfully');
      },
      error => console.error('Error deleting category by ID', error)
    );
  }


  getCategoryByName(nameCategory: string) {
    this.serviceService.getCategoryByName(nameCategory).subscribe(
      data => {
        // Handle retrieved category data (e.g., display details)
        console.log('Retrieved category by name:', data);
      },
      error => console.error('Error fetching category by name', error)
    );
  }


  // Update category by name (if supported by your backend API)
  updateCategoryByName(name: string, categoryData: any) {
    this.serviceService.updateCategoryByName(name, categoryData).subscribe(
      () => {
        // Handle successful update (e.g., display success message, refresh list)
        console.log('Category updated successfully');
        // You might want to refresh the list here
      },
      error => console.error('Error updating category by name', error)
    );
  }


  searchCategory() {
    if (!this.searchQuery.trim()) {
      this.getAllCategories(); // If search query is empty, load all categories
      return;
    }
 
    this.serviceService.getCategoryByName(this.searchQuery).subscribe(
      data => (this.categories = [data]), // Assume response is a single category
      error => console.error('Error searching for category', error)
    );
  }
 


  toggleAddCategoryForm() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }
}
