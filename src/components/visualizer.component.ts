
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-gray-850 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
      <div class="px-4 py-2 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <span class="text-gray-400 text-xs font-semibold">Memory & Visualization</span>
        <span class="text-gray-500 text-xs">{{ store.selectedProblem().category }}</span>
      </div>

      <div class="flex-1 p-6 relative overflow-auto flex flex-col items-center justify-center bg-[#1e1e1e]">
        
        <!-- Status Overlay -->
        <div class="absolute top-4 left-0 right-0 text-center px-4 z-10">
           @if (store.currentStep(); as step) {
             <div class="inline-block bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 shadow-lg backdrop-blur-sm bg-opacity-90">
                <span class="text-sm text-gray-200">{{ step.description }}</span>
             </div>
           } @else {
             <div class="text-gray-500 italic">Press Play to start...</div>
           }
        </div>

        <div class="w-full max-w-3xl mt-12 flex flex-col items-center gap-12">
          
          <!-- ARRAY / GENERIC -->
          @if (showArray()) {
            <div class="flex flex-wrap justify-center gap-3">
              @for (item of currentInputArray(); track $index) {
                <div class="relative group mt-8">
                   <div class="absolute -top-6 left-0 right-0 text-center text-[10px] text-gray-500 font-mono">{{ $index }}</div>
                   <div 
                    class="w-12 h-12 flex items-center justify-center rounded-lg border-2 text-lg font-bold transition-all duration-300"
                    [class.bg-blue-600]="isHighlighted($index)"
                    [class.border-blue-400]="isHighlighted($index)"
                    [class.text-white]="isHighlighted($index)"
                    [class.bg-gray-800]="!isHighlighted($index)"
                    [class.border-gray-600]="!isHighlighted($index)"
                    [class.text-gray-300]="!isHighlighted($index)"
                   >
                     {{ item }}
                   </div>
                   @for (ptr of getPointersAt($index); track ptr.name) {
                     <div 
                      class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                      [style.bottom.px]="-35 - (ptr.offset * 20)" 
                     >
                       <div class="w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px]" [style.border-bottom-color]="ptr.color"></div>
                       <span class="text-xs font-bold mt-0.5" [style.color]="ptr.color">{{ ptr.name }}</span>
                     </div>
                   }
                </div>
              }
            </div>
          }

          <!-- LINKED LIST -->
          @if (isLinkedList()) {
            <div class="flex flex-wrap justify-center gap-2 items-center">
               <div class="text-xs text-gray-500 font-mono mr-2">null</div>
               @for (node of getLinkedListNodes(); track node.id) {
                 <div class="flex items-center">
                    <div class="relative">
                      <div class="w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold bg-gray-800 text-gray-200 border-gray-600 z-10 relative">
                        {{ node.val }}
                      </div>
                      @for (ptr of getPointersAt(node.id); track ptr.name) {
                         <div 
                          class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                          [style.top.px]="-30 - (ptr.offset * 15)" 
                         >
                           <span class="text-xs font-bold mb-0.5" [style.color]="ptr.color">{{ ptr.name }}</span>
                           <div class="w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px]" [style.border-top-color]="ptr.color"></div>
                         </div>
                       }
                    </div>
                    @if (node.next !== null && node.next !== -1) {
                      <div class="w-12 h-0.5 bg-gray-600 mx-1 relative">
                        <div class="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-600 rotate-45"></div>
                      </div>
                    } @else {
                      <div class="text-xs text-gray-500 font-mono ml-2">null</div>
                    }
                 </div>
               }
            </div>
          }

          <!-- TREE -->
          @if (isTree()) {
             <div class="flex flex-col items-center gap-8">
               @for (level of getTreeLevels(); track $index) {
                 <div class="flex justify-center gap-4 md:gap-8">
                   @for (node of level; track $index) {
                     <div class="relative">
                        <div 
                          class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 z-10 relative bg-gray-800 border-gray-600 text-gray-200"
                          [class.opacity-25]="node.val === null"
                          [class.border-blue-400]="isHighlighted(node.idx)"
                          [class.bg-blue-900]="isHighlighted(node.idx)"
                        >
                          {{ node.val }}
                        </div>
                        @for (ptr of getPointersAt(node.idx); track ptr.name) {
                           <div 
                            class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                            [style.top.px]="-30 - (ptr.offset * 15)" 
                           >
                             <span class="text-xs font-bold mb-0.5" [style.color]="ptr.color">{{ ptr.name }}</span>
                           </div>
                         }
                     </div>
                   }
                 </div>
               }
             </div>
          }

          <!-- GRID (Graphs / DP 2D) -->
          @if (showGrid()) {
            <div class="grid gap-1" [style.grid-template-columns]="'repeat(' + getGridCols() + ', minmax(0, 1fr))'">
              @for (cell of getGridCells(); track cell.key) {
                 <div 
                   class="w-12 h-12 flex items-center justify-center border transition-all duration-200 font-mono relative text-sm"
                   [class.bg-blue-600]="cell.val === '1'"
                   [class.bg-gray-800]="cell.val !== '1'"
                   [class.border-blue-500]="cell.val === '1'"
                   [class.border-gray-700]="cell.val !== '1'"
                   [class.border-yellow-400]="hasPointerAt(cell.r, cell.c)"
                   [class.border-4]="hasPointerAt(cell.r, cell.c)"
                 >
                   {{ cell.val }}
                 </div>
              }
            </div>
          }

          <!-- MAP / SET -->
          @if (getMapEntries().length > 0) {
             <div class="flex flex-col items-center w-full">
               <h4 class="text-xs uppercase text-gray-500 mb-3 font-semibold tracking-wider">Map / Set</h4>
               <div class="flex flex-wrap justify-center gap-4 border border-gray-700 rounded-xl p-4 bg-gray-900/50 min-w-[200px]">
                 @for (entry of getMapEntries(); track entry.key) {
                   <div class="flex flex-col items-center bg-gray-800 rounded px-3 py-2 border border-gray-600 animate-fade-in min-w-[60px]">
                     <span class="text-xs text-gray-400 mb-1 border-b border-gray-700 pb-1 w-full text-center">{{ entry.key }}</span>
                     <span class="text-lg font-mono font-bold text-blue-400">{{ entry.value }}</span>
                   </div>
                 }
               </div>
             </div>
          }

          <!-- VARIABLES -->
          <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-gray-800 pt-6">
             @for (variable of getVariables(); track variable.key) {
               @if (isValidVariable(variable.key)) {
                 <div class="flex flex-col p-3 rounded bg-gray-800/50 border border-gray-700/50 overflow-hidden">
                    <span class="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">{{ variable.key }}</span>
                    <span class="font-mono text-sm text-gray-200 truncate" [title]="formatVariable(variable.value)">
                      {{ formatVariable(variable.value) }}
                    </span>
                 </div>
               }
             }
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class VisualizerComponent {
  store = inject(StoreService);

  // --- Dynamic View Triggers ---
  showGrid = computed(() => {
    const input = this.store.selectedProblem().defaultInput;
    const vars = this.store.currentStep()?.variables;
    // Show grid if input has 'grid' OR variables has 'grid' OR category is Graphs/Matrix
    return !!(input?.grid || vars?.['grid'] || input?.image || vars?.['image'] || this.store.selectedProblem().category === 'Graphs');
  });

  isLinkedList = computed(() => this.store.selectedProblem().category === 'Linked List');
  
  isTree = computed(() => this.store.selectedProblem().category === 'Trees');

  showArray = computed(() => {
    // Show array if not one of the complex views
    return !this.showGrid() && !this.isLinkedList() && !this.isTree();
  });

  // --- Helpers ---
  currentInputArray = computed(() => {
     const input = this.store.selectedProblem().defaultInput;
     const vars = this.store.currentStep()?.variables;
     // Priority to DP arrays if they exist
     if (vars?.['dp'] && Array.isArray(vars['dp'])) return vars['dp'];
     if (Array.isArray(input.nums)) return input.nums;
     if (Array.isArray(input.prices)) return input.prices;
     if (Array.isArray(input.flowerbed)) return input.flowerbed;
     if (Array.isArray(input.coins)) return input.coins;
     if (typeof input.s === 'string') return input.s.split('');
     return [];
  });

  getTreeLevels() {
    const vars = this.store.currentStep()?.variables;
    const treeArr = vars?.['tree'] || this.store.selectedProblem().defaultInput.root || [];
    if (!treeArr) return [];
    const levels = [];
    let idx = 0, items = 1;
    while (idx < treeArr.length) {
      const level = [];
      for (let i = 0; i < items; i++) {
        if (idx < treeArr.length) level.push({ val: treeArr[idx], idx: idx++ });
      }
      levels.push(level);
      items *= 2;
    }
    return levels;
  }

  getGridCols() {
    const vars = this.store.currentStep()?.variables;
    const grid = vars?.['grid'] || this.store.selectedProblem().defaultInput.grid;
    return grid ? grid[0].length : 0;
  }

  getGridCells() {
    const vars = this.store.currentStep()?.variables;
    const grid = vars?.['grid'] || this.store.selectedProblem().defaultInput.grid;
    if (!grid) return [];
    const cells = [];
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        cells.push({ r, c, val: grid[r][c], key: `${r}-${c}` });
      }
    }
    return cells;
  }

  hasPointerAt(r: number, c: number): boolean {
    const step = this.store.currentStep();
    return step?.pointers?.['r'] === r && step?.pointers?.['c'] === c;
  }

  getLinkedListNodes() {
    return this.store.currentStep()?.variables?.['nodes'] || [];
  }

  isHighlighted(index: number): boolean {
    return this.store.currentStep()?.highlights?.includes(index) ?? false;
  }

  getPointersAt(index: number) {
    const step = this.store.currentStep();
    if (!step?.pointers) return [];
    const colors: Record<string, string> = { 'i':'#10b981', 'j':'#8b5cf6', 'curr':'#ef4444', 'l':'#3b82f6', 'r':'#f59e0b' };
    return Object.entries(step.pointers)
      .filter(([k, v]) => v === index && k !== 'r' && k !== 'c') // Exclude grid coords
      .map(([name], idx) => ({ name, color: colors[name.toLowerCase()] || '#9ca3af', offset: idx }));
  }

  getMapEntries() {
    const map = this.store.currentStep()?.variables?.['map'];
    return map ? Object.entries(map).map(([key, value]) => ({ key, value })) : [];
  }

  getVariables() {
    const vars = this.store.currentStep()?.variables;
    return vars ? Object.entries(vars).map(([key, value]) => ({ key, value })) : [];
  }

  isValidVariable(key: string): boolean {
    return !['map', 'nodes', 'tree', 'grid', 'dp'].includes(key);
  }

  formatVariable(val: any): string {
    return (typeof val === 'object' && val !== null) ? JSON.stringify(val) : String(val);
  }
}
