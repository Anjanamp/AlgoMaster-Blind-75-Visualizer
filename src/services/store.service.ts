
import { Injectable, signal, computed, inject } from '@angular/core';
import { PROBLEMS, CATEGORIES } from './algorithm.data';
import { EngineService } from './engine.service';
import { Problem, VisualizationStep } from '../types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private engine = inject(EngineService);

  // State Signals
  problems = signal<Problem[]>(PROBLEMS);
  categories = signal<string[]>(CATEGORIES);
  
  selectedProblemId = signal<string>('two-sum');
  
  // Computed State
  selectedProblem = computed(() => 
    this.problems().find(p => p.id === this.selectedProblemId())!
  );

  // Execution State Signals
  isPlaying = signal(false);
  currentStepIndex = signal(0);
  playbackSpeed = signal(1000); // ms per step
  
  // Computed Execution State
  steps = computed(() => {
    const prob = this.selectedProblem();
    if (!prob) return [];
    return this.engine.generateSteps(prob.id, prob.defaultInput);
  });

  totalSteps = computed(() => this.steps().length);
  
  currentStep = computed(() => {
    const s = this.steps();
    const index = this.currentStepIndex();
    return s[index] || null;
  });

  isFinished = computed(() => this.currentStepIndex() >= this.totalSteps() - 1);
  isStart = computed(() => this.currentStepIndex() === 0);

  // Actions
  selectProblem(id: string) {
    this.selectedProblemId.set(id);
    this.reset();
  }

  nextStep() {
    if (!this.isFinished()) {
      this.currentStepIndex.update(i => i + 1);
    } else {
      this.isPlaying.set(false);
    }
  }

  prevStep() {
    if (!this.isStart()) {
      this.currentStepIndex.update(i => i - 1);
    }
  }

  reset() {
    this.isPlaying.set(false);
    this.currentStepIndex.set(0);
  }

  togglePlay() {
    this.isPlaying.update(v => !v);
  }

  setSpeed(ms: number) {
    this.playbackSpeed.set(ms);
  }
}
