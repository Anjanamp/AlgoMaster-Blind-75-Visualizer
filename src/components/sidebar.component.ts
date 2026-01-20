
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { Problem } from '../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-gray-950 border-r border-gray-800 w-64 md:w-72 lg:w-80 flex-shrink-0">
      <div class="p-4 border-b border-gray-800">
        <h1 class="text-xl font-bold text-white tracking-tight">AlgoMaster</h1>
        <p class="text-xs text-gray-400 mt-1">Blind 75 & Neetcode 150</p>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        @for (category of categories(); track category) {
          <div class="space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2">{{ category }}</h3>
            <div class="space-y-1">
              @for (prob of getProblemsByCategory(category); track prob.id) {
                <button 
                  (click)="selectProblem(prob.id)"
                  class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex items-center justify-between group"
                  [class.bg-accent-DEFAULT]="store.selectedProblemId() === prob.id"
                  [class.text-white]="store.selectedProblemId() === prob.id"
                  [class.text-gray-400]="store.selectedProblemId() !== prob.id"
                  [class.hover:bg-gray-800]="store.selectedProblemId() !== prob.id"
                  [class.hover:text-gray-200]="store.selectedProblemId() !== prob.id"
                >
                  <span class="truncate">{{ prob.title }}</span>
                  @if (store.selectedProblemId() === prob.id) {
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                  }
                </button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #374151; border-radius: 20px; }
  `]
})
export class SidebarComponent {
  store = inject(StoreService);
  categories = this.store.categories;
  problems = this.store.problems;

  getProblemsByCategory(cat: string): Problem[] {
    return this.problems().filter(p => p.category === cat);
  }

  selectProblem(id: string) {
    this.store.selectProblem(id);
  }
}
