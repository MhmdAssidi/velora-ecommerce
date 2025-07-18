import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
@Input() label!:string;   //there is ! means we will assign to it a value later
  @Input() color: string ='primary';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() icon: string | null = null;
  @Input() appearance: string = 'primary';
  @Input() imgIcon: string | null = null;
  @Input() customClass: string | null = null;
  @Output() onBtnClicked: EventEmitter<any> = new EventEmitter;

}
