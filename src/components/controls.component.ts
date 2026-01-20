import { Component, inject, effect, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-16 bg-gray-900 border-t border-gray-800 flex items-center px-6 justify-between shadow-2xl z-20">
      
      <!-- Progress Bar (Fake) -->
      <div class="flex items-center gap-4 w-1/3">
        <span class="text-xs text-gray-500 font-mono w-12 text-right">Step</span>
        <div class="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-accent transition-all duration-300 ease-out"
            [style.width.%]="progressPercentage()"
          ></div>
        </div>
        <span class="text-xs text-gray-500 font-mono w-12">{{ store.currentStepIndex() + 1 }} / {{ store.totalSteps() }}</span>
      </div>

      <!-- Main Controls -->
      <div class="flex items-center gap-3">
        <button 
          (click)="store.reset()"
          class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all"
          title="Reset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>

        <button 
          (click)="store.prevStep()"
          [disabled]="store.isStart()"
          class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Previous Step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
        </button>

        <button 
          (click)="store.togglePlay()"
          class="w-10 h-10 bg-accent hover:bg-accent-hover text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-accent/30 transition-all scale-100 active:scale-95"
          [title]="store.isPlaying() ? 'Pause' : 'Play'"
        >
          @if (store.isPlaying()) {
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          } @else {
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          }
        </button>

        <button 
          (click)="store.nextStep()"
          [disabled]="store.isFinished()"
          class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Next Step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
        </button>
      </div>

      <!-- Speed Control -->
      <div class="w-1/3 flex justify-end">
        <select 
          #speedSelect
          (change)="store.setSpeed(+speedSelect.value)" 
          class="bg-gray-800 text-gray-300 text-xs py-1.5 px-3 rounded border border-gray-700 focus:outline-none focus:border-accent"
        >
          <option value="2000">0.5x</option>
          <option value="1000" selected>1.0x</option>
          <option value="500">2.0x</option>
        </select>
      </div>

    </div>
  `
})
export class ControlsComponent implements OnDestroy {
  store = inject(StoreService);
  private timer: any;

  progressPercentage = computed(() => {
    const total = this.store.totalSteps();
    if (total <= 1) return 0;
    return (this.store.currentStepIndex() / (total - 1)) * 100;
  });

  constructor() {
    effect(() => {
      const isPlaying = this.store.isPlaying();
      const speed = this.store.playbackSpeed();

      if (this.timer) clearInterval(this.timer);

      if (isPlaying) {
        this.timer = setInterval(() => {
          this.store.nextStep();
        }, speed);
      }
    });
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
