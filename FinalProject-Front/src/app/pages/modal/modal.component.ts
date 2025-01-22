import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ModalComponent {
  title: string = '';
  description: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() createPost = new EventEmitter<{ title: string; description: string }>();

  onSubmit() {
    this.createPost.emit({ title: this.title, description: this.description });
  }

  closeModalEvent() {
    this.closeModal.emit();
  }
}
