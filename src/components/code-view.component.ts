
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-code-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-gray-850 rounded-lg border border-gray-700 overflow-hidden font-mono text-sm shadow-xl">
      <div class="px-4 py-2 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <span class="text-gray-400 text-xs font-semibold">JavaScript / TypeScript</span>
        <div class="flex space-x-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      
      <div class="flex-1 overflow-auto p-4 relative bg-[#1e1e1e]">
        <div class="absolute top-0 left-0 bottom-0 w-10 bg-[#1e1e1e] border-r border-gray-800/50 text-right pr-2 pt-4 select-none z-10">
           @for (line of codeLines(); track $index) {
             <div class="text-gray-600 text-xs leading-6">{{ $index + 1 }}</div>
           }
        </div>
        
        <div class="pl-8 pt-0">
          @for (line of codeLines(); track $index) {
            <div 
              class="leading-6 whitespace-pre px-2 rounded w-full transition-colors duration-200"
              [class.bg-yellow-900]="activeLine() === ($index + 1)"
              [class.bg-opacity-40]="activeLine() === ($index + 1)"
              [class.border-l-2]="activeLine() === ($index + 1)"
              [class.border-yellow-500]="activeLine() === ($index + 1)"
            >
              <span [class.text-gray-300]="true">{{ line }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class CodeViewComponent {
  store = inject(StoreService);
  
  codeLines = computed(() => {
    return this.store.selectedProblem().codeSnippet.split('\n');
  });

  activeLine = computed(() => {
    return this.store.currentStep()?.lineNumber ?? -1;
  });
}
