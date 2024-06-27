import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkComponent } from './new-work.component';

describe('NewWorkComponent', () => {
  let component: NewWorkComponent;
  let fixture: ComponentFixture<NewWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
