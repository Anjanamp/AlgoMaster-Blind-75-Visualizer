
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar.component';
import { CodeViewComponent } from './components/code-view.component';
import { VisualizerComponent } from './components/visualizer.component';
import { ControlsComponent } from './components/controls.component';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CodeViewComponent, VisualizerComponent, ControlsComponent],
  template: `
    <div class="flex h-screen w-screen bg-gray-950 overflow-hidden text-gray-200">
      
      <!-- Left Sidebar -->
      <app-sidebar class="hidden md:block h-full border-r border-gray-800" />

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col min-w-0 bg-gray-900">
        
        <!-- Header -->
        <header class="h-16 px-6 border-b border-gray-800 flex items-center justify-between bg-gray-900 shrink-0">
          <div>
            <h2 class="text-xl font-bold text-white tracking-tight">{{ store.selectedProblem().title }}</h2>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 border border-green-800/50">
                {{ store.selectedProblem().difficulty }}
              </span>
              <span class="text-xs text-gray-500">•</span>
              <span class="text-xs text-gray-400 truncate max-w-md">{{ store.selectedProblem().description }}</span>
            </div>
          </div>
          
          <div class="flex gap-2">
             <!-- Mobile Menu Placeholder (if needed later) -->
          </div>
        </header>

        <!-- Workspace (Code & Visualization) -->
        <div class="flex-1 p-4 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
          
          <!-- Code Panel -->
          <div class="row-span-1 lg:col-span-5 h-full min-h-0">
            <app-code-view class="h-full" />
          </div>

          <!-- Visualization Panel -->
          <div class="row-span-1 lg:col-span-7 h-full min-h-0">
            <app-visualizer class="h-full" />
          </div>

        </div>

        <!-- Footer Controls -->
        <app-controls class="shrink-0" />
        
      </main>
    </div>
  `
})
export class AppComponent {
  store = inject(StoreService);
}
