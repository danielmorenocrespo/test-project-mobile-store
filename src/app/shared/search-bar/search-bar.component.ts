import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private query = signal('');

  value = this.query.asReadonly();

  hasValue = computed(() => this.query().length > 0);

  @Output() searchBar = new EventEmitter<string>();

  onInput(value: string) {
    this.query.set(value);
    this.searchBar.emit(value);
  }

  clear() {
    this.query.set('');
    this.searchBar.emit('');
  }
}
