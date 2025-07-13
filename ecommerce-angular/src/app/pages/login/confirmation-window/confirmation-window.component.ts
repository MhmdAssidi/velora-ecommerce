import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-window',
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './confirmation-window.component.html',
  styleUrl: './confirmation-window.component.scss'
})
export class ConfirmationWindowComponent implements OnInit {
confrimForm!: FormGroup; 

  constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.confrimForm = this.fb.group({ 
    confirmCode: ['', [Validators.required]],
  });
}

onSubmit(): void {
  if (this.confrimForm.invalid) {
    this.confrimForm.markAllAsTouched();
    return;
  }

}
}
