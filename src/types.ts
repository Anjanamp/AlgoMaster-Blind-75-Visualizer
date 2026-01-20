
export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  functionName: string;
  codeSnippet: string;
  defaultInput: any;
}

export interface VisualizationStep {
  lineNumber: number; // 1-based index corresponding to code snippet
  variables: Record<string, any>;
  highlights: number[]; // Indices to highlight in the visualizer (e.g., array indices)
  pointers: Record<string, number>; // Name -> Index (e.g., { 'i': 0, 'j': 1 })
  stack?: any[];
  description: string;
  output?: any;
}

export interface AlgorithmState {
  steps: VisualizationStep[];
  totalSteps: number;
}
