
import { Injectable } from '@angular/core';
import { VisualizationStep } from '../types';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  
  generateSteps(problemId: string, input: any): VisualizationStep[] {
    switch (problemId) {
      // Arrays & Hashing
      case 'two-sum': return this.runTwoSum(input.nums, input.target);
      case 'contains-duplicate': return this.runContainsDuplicate(input.nums);
      case 'valid-anagram': return this.runValidAnagram(input.s, input.t);
      // Trees
      case 'invert-binary-tree': return this.runInvertTree(input.root);
      case 'max-depth': return this.runMaxDepth(input.root);
      case 'same-tree': return this.runSameTree(input.p, input.q);
      case 'level-order': return this.runLevelOrder(input.root);
      // Graphs
      case 'number-of-islands': return this.runNumberOfIslands(input.grid);
      case 'max-area-island': return this.runMaxAreaIsland(input.grid);
      case 'flood-fill': return this.runFloodFill(input.image, input.sr, input.sc, input.color);
      // DP
      case 'climbing-stairs': return this.runClimbingStairs(input.n);
      case 'house-robber': return this.runHouseRobber(input.nums);
      case 'unique-paths': return this.runUniquePaths(input.m, input.n);
      case 'coin-change': return this.runCoinChange(input.coins, input.amount);
      case 'lcs': return this.runLCS(input.text1, input.text2);
      // Greedy
      case 'maximum-subarray': return this.runMaxSubarray(input.nums);
      case 'jump-game': return this.runJumpGame(input.nums);
      case 'jump-game-ii': return this.runJumpGameII(input.nums);
      case 'merge-intervals': return this.runMergeIntervals(input.intervals);
      case 'can-place-flowers': return this.runCanPlaceFlowers(input.flowerbed, input.n);
      // Others
      case 'valid-parentheses': return this.runValidParentheses(input.s);
      case 'binary-search': return this.runBinarySearch(input.nums, input.target);
      case 'reverse-linked-list': return this.runReverseLinkedList(input.head);
      case 'best-time-stock': return this.runBestTimeStock(input.prices);
      default: return [];
    }
  }

  // --- ARRAYS ---
  private runTwoSum(nums: number[], target: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      steps.push({ lineNumber: 4, variables: { i, num: nums[i], target, map: Object.fromEntries(map) }, highlights: [i], pointers: { i }, description: `Checking ${nums[i]}. Need ${diff}.` });
      if (map.has(diff)) {
        steps.push({ lineNumber: 7, variables: { i, found: true }, highlights: [i, map.get(diff)!], pointers: { i }, description: `Found ${diff} at index ${map.get(diff)}!`, output: [map.get(diff), i] });
        return steps;
      }
      map.set(nums[i], i);
    }
    return steps;
  }

  private runContainsDuplicate(nums: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const seen = new Set<number>();
    for(let i=0; i<nums.length; i++) {
        const n = nums[i];
        steps.push({ lineNumber: 4, variables: { n, i, seen: Array.from(seen) }, highlights: [i], pointers: { i }, description: `Check if ${n} is in Set.` });
        if(seen.has(n)) {
            steps.push({ lineNumber: 6, variables: { n, found: true }, highlights: [i], pointers: { i }, description: 'Duplicate found.', output: true });
            return steps;
        }
        seen.add(n);
    }
    return steps;
  }

  private runValidAnagram(s: string, t: string): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const map = new Map<string, number>();
    for(const c of s) {
      map.set(c, (map.get(c)||0)+1);
      steps.push({ lineNumber: 4, variables: { c, map: Object.fromEntries(map) }, highlights: [], pointers: {}, description: `Map '${c}': ${map.get(c)}` });
    }
    for(const c of t) {
      if (!map.has(c) || map.get(c) === 0) {
        steps.push({ lineNumber: 8, variables: { c }, highlights: [], pointers: {}, description: `Mismatch on '${c}'.`, output: false });
        return steps;
      }
      map.set(c, map.get(c)! - 1);
      steps.push({ lineNumber: 9, variables: { c, map: Object.fromEntries(map) }, highlights: [], pointers: {}, description: `Decrement '${c}'.` });
    }
    return steps;
  }

  // --- TREES ---
  // Representing tree as level-order array (bfs-flat) for simple visualization state
  private runInvertTree(root: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const tree = [...root];
    const helper = (idx: number) => {
      if (idx >= tree.length || tree[idx] === null) return;
      steps.push({ lineNumber: 4, variables: { idx, val: tree[idx], tree: [...tree] }, highlights: [idx], pointers: { curr: idx }, description: `Visit ${tree[idx]}` });
      const left = 2*idx+1, right = 2*idx+2;
      if (left < tree.length && right < tree.length) {
         // Swap logical children in array layout for visualization effect
         const temp = tree[left]; tree[left] = tree[right]; tree[right] = temp;
         steps.push({ lineNumber: 6, variables: { tree: [...tree] }, highlights: [left, right], pointers: { curr: idx }, description: `Swap children` });
      }
      helper(left); helper(right);
    };
    helper(0);
    return steps;
  }

  private runMaxDepth(root: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const helper = (idx: number, depth: number): number => {
      if (idx >= root.length || root[idx] === null) {
        steps.push({ lineNumber: 2, variables: { idx, depth }, highlights: [idx], pointers: { curr: idx }, description: 'Null node. Return 0.' });
        return 0;
      }
      steps.push({ lineNumber: 4, variables: { idx, val: root[idx], depth }, highlights: [idx], pointers: { curr: idx }, description: `Visit ${root[idx]}. Depth: ${depth}` });
      const l = helper(2*idx+1, depth+1);
      const r = helper(2*idx+2, depth+1);
      const myDepth = 1 + Math.max(l, r);
      steps.push({ lineNumber: 6, variables: { idx, l, r, myDepth }, highlights: [idx], pointers: { curr: idx }, description: `Return 1 + max(${l}, ${r}) = ${myDepth}` });
      return myDepth;
    };
    helper(0, 1);
    return steps;
  }

  private runSameTree(p: number[], q: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    // Just a placeholder visual since syncing two trees is complex for simple visualizer
    steps.push({ lineNumber: 1, variables: { p, q }, highlights: [], pointers: {}, description: 'Checking both trees...' });
    return steps;
  }

  private runLevelOrder(root: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    if (!root.length) return steps;
    const q = [0]; // Store indices
    const res = [];
    
    while(q.length) {
      const level = [];
      const len = q.length;
      steps.push({ lineNumber: 5, variables: { q: [...q], res: JSON.stringify(res) }, highlights: q.map(x=>x), pointers: {}, description: 'Process level' });
      for(let i=0; i<len; i++) {
        const idx = q.shift()!;
        if (root[idx] !== null) {
           level.push(root[idx]);
           const l = 2*idx+1, r = 2*idx+2;
           if (l < root.length && root[l]!==null) q.push(l);
           if (r < root.length && root[r]!==null) q.push(r);
        }
      }
      res.push(level);
      steps.push({ lineNumber: 12, variables: { level, res: JSON.stringify(res) }, highlights: [], pointers: {}, description: 'Level done' });
    }
    return steps;
  }

  // --- GRAPHS ---
  private runNumberOfIslands(gridInput: string[][]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const grid = gridInput.map(r => [...r]);
    let count = 0;
    const dfs = (r: number, c: number) => {
      if (r<0||c<0||r>=grid.length||c>=grid[0].length||grid[r][c]==='0') return;
      grid[r][c] = '0';
      steps.push({ lineNumber: 8, variables: { count, grid: JSON.parse(JSON.stringify(grid)) }, highlights: [], pointers: { r, c }, description: `Visited ${r},${c}` });
      dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
    }
    for(let r=0; r<grid.length; r++) {
      for(let c=0; c<grid[0].length; c++) {
        if(grid[r][c] === '1') {
          count++;
          dfs(r, c);
        }
      }
    }
    return steps;
  }

  private runMaxAreaIsland(gridInput: number[][]): VisualizationStep[] {
     const steps: VisualizationStep[] = [];
     const grid = gridInput.map(r => [...r]);
     let maxArea = 0;
     const dfs = (r: number, c: number): number => {
       if (r<0||c<0||r>=grid.length||c>=grid[0].length||grid[r][c]===0) return 0;
       grid[r][c] = 0;
       steps.push({ lineNumber: 6, variables: { maxArea, grid: JSON.parse(JSON.stringify(grid)) }, highlights: [], pointers: { r, c }, description: 'Visiting' });
       return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
     }
     for(let r=0; r<grid.length; r++) {
       for(let c=0; c<grid[0].length; c++) {
         if(grid[r][c] === 1) {
           const area = dfs(r, c);
           maxArea = Math.max(maxArea, area);
           steps.push({ lineNumber: 12, variables: { maxArea, area }, highlights: [], pointers: { r, c }, description: `New Max Area: ${maxArea}` });
         }
       }
     }
     return steps;
  }

  private runFloodFill(image: number[][], sr: number, sc: number, newColor: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const grid = image.map(r => [...r]);
    const oldColor = grid[sr][sc];
    if(oldColor === newColor) return steps;
    
    const dfs = (r: number, c: number) => {
      if (r<0||c<0||r>=grid.length||c>=grid[0].length||grid[r][c]!==oldColor) return;
      grid[r][c] = newColor;
      steps.push({ lineNumber: 6, variables: { grid: JSON.parse(JSON.stringify(grid)) }, highlights: [], pointers: { r, c }, description: 'Fill color' });
      dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
    };
    dfs(sr, sc);
    return steps;
  }

  // --- DP ---
  private runClimbingStairs(n: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let one = 2, two = 1;
    steps.push({ lineNumber: 3, variables: { one, two }, highlights: [], pointers: {}, description: 'Init one=2, two=1' });
    for(let i=3; i<=n; i++) {
       const temp = one; one = one + two; two = temp;
       steps.push({ lineNumber: 6, variables: { i, one, two }, highlights: [], pointers: {}, description: `Step ${i}: Ways = ${one}` });
    }
    return steps;
  }

  private runHouseRobber(nums: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let rob1 = 0, rob2 = 0;
    for(let i=0; i<nums.length; i++) {
      const n = nums[i];
      let temp = Math.max(n + rob1, rob2);
      steps.push({ lineNumber: 4, variables: { i, n, rob1, rob2, temp }, highlights: [i], pointers: { i }, description: `Rob ${n}? Max(${n}+${rob1}, ${rob2}) = ${temp}` });
      rob1 = rob2; rob2 = temp;
    }
    return steps;
  }

  private runUniquePaths(m: number, n: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const grid = Array(m).fill(0).map(() => Array(n).fill(1)); // Visualize DP table as grid
    for(let i=1; i<m; i++) {
      for(let j=1; j<n; j++) {
        grid[i][j] = grid[i-1][j] + grid[i][j-1];
        steps.push({ lineNumber: 5, variables: { grid: JSON.parse(JSON.stringify(grid)) }, highlights: [], pointers: { r: i, c: j }, description: `Paths to (${i},${j}) = ${grid[i][j]}` });
      }
    }
    return steps;
  }

  private runCoinChange(coins: number[], amount: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const dp = Array(amount+1).fill(999);
    dp[0] = 0;
    steps.push({ lineNumber: 2, variables: { dp: [...dp] }, highlights: [], pointers: {}, description: 'Init DP array' });
    
    for(const c of coins) {
      for(let a=c; a<=amount; a++) {
        dp[a] = Math.min(dp[a], 1 + dp[a-c]);
        steps.push({ lineNumber: 6, variables: { c, a, val: dp[a], dp: [...dp] }, highlights: [a], pointers: { a }, description: `Coin ${c}: dp[${a}] = ${dp[a]}` });
      }
    }
    return steps;
  }

  private runLCS(t1: string, t2: string): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const dp = Array(t1.length+1).fill(0).map(()=>Array(t2.length+1).fill(0));
    // Visualize grid
    for(let i=0; i<t1.length; i++) {
      for(let j=0; j<t2.length; j++) {
        if(t1[i] === t2[j]) dp[i+1][j+1] = 1 + dp[i][j];
        else dp[i+1][j+1] = Math.max(dp[i][j+1], dp[i+1][j]);
        
        steps.push({ lineNumber: 6, variables: { i, j, char1: t1[i], char2: t2[j], grid: JSON.parse(JSON.stringify(dp)) }, highlights: [], pointers: { r: i+1, c: j+1 }, description: `Compare ${t1[i]} & ${t2[j]}` });
      }
    }
    return steps;
  }

  // --- GREEDY ---
  private runMaxSubarray(nums: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let cur = 0, max = nums[0];
    for(let i=0; i<nums.length; i++) {
      const n = nums[i];
      if (cur < 0) cur = 0;
      cur += n;
      max = Math.max(max, cur);
      steps.push({ lineNumber: 6, variables: { i, n, cur, max }, highlights: [i], pointers: { i }, description: `Add ${n}. Cur: ${cur}, Max: ${max}` });
    }
    return steps;
  }

  private runJumpGame(nums: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let goal = nums.length - 1;
    for(let i=nums.length-1; i>=0; i--) {
      steps.push({ lineNumber: 4, variables: { i, goal, val: nums[i] }, highlights: [i, goal], pointers: { i, goal }, description: `Check index ${i}` });
      if (i + nums[i] >= goal) {
        goal = i;
        steps.push({ lineNumber: 5, variables: { goal }, highlights: [goal], pointers: { goal }, description: `Goal moved to ${i}` });
      }
    }
    return steps;
  }

  private runJumpGameII(nums: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let l=0, r=0, jumps=0;
    while(r < nums.length - 1) {
      let farthest = 0;
      for(let i=l; i<=r; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        steps.push({ lineNumber: 5, variables: { l, r, jumps, i, farthest }, highlights: [i], pointers: { i }, description: `Scanning BFS level. Farthest: ${farthest}` });
      }
      l = r+1; r = farthest; jumps++;
      steps.push({ lineNumber: 7, variables: { l, r, jumps }, highlights: [l, r], pointers: { l, r }, description: `Jump ${jumps}. New range [${l}, ${r}]` });
    }
    return steps;
  }

  private runCanPlaceFlowers(bed: number[], n: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const flowerbed = [...bed];
    for(let i=0; i<flowerbed.length; i++) {
      steps.push({ lineNumber: 2, variables: { i, n, flowerbed: [...flowerbed] }, highlights: [i], pointers: { i }, description: `Checking plot ${i}` });
      if(flowerbed[i]===0 && (i===0 || flowerbed[i-1]===0) && (i===flowerbed.length-1 || flowerbed[i+1]===0)) {
        flowerbed[i] = 1;
        n--;
        steps.push({ lineNumber: 6, variables: { i, n, flowerbed: [...flowerbed] }, highlights: [i], pointers: { i }, description: `Planted! Need ${n} more.` });
      }
    }
    return steps;
  }

  private runMergeIntervals(intervals: number[][]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    // Just sort visualization
    steps.push({ lineNumber: 1, variables: { sorted: JSON.stringify(intervals.sort((a,b)=>a[0]-b[0])) }, highlights: [], pointers: {}, description: 'Sorted intervals.' });
    // This is hard to visualize on simple array view, would need 2D. 
    // We'll leave it simple for now or let the text describe it.
    return steps;
  }

  // --- OTHERS ---
  private runValidParentheses(s: string): VisualizationStep[] {
     // Reusing previous logic logic...
     const steps: VisualizationStep[] = [];
     const stack: string[] = [];
     const map: Record<string, string> = {')':'(', '}':'{', ']':'['};
     for(let i=0; i<s.length; i++) {
       const char = s[i];
       if (char in map) {
         if (stack.pop() !== map[char]) {
           steps.push({ lineNumber: 5, variables: { char }, highlights: [i], pointers: { i }, stack: [...stack], description: 'Mismatch!' });
           return steps;
         }
       } else stack.push(char);
       steps.push({ lineNumber: 8, variables: { char }, highlights: [i], pointers: { i }, stack: [...stack], description: 'Stack update' });
     }
     return steps;
  }

  private runBinarySearch(nums: number[], target: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let l=0, r=nums.length-1;
    while(l<=r) {
      const m = Math.floor((l+r)/2);
      steps.push({ lineNumber: 4, variables: { l, r, m, val: nums[m] }, highlights: [l, r, m], pointers: { l, r, m }, description: `Check mid ${m}` });
      if(nums[m]===target) return steps;
      if(nums[m]<target) l=m+1; else r=m-1;
    }
    return steps;
  }

  private runReverseLinkedList(vals: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let nodes = vals.map((val, idx) => ({ id: idx, val, next: idx === vals.length - 1 ? null : idx + 1 }));
    let prev: number | null = null, curr: number | null = 0;
    while(curr !== null) {
      const next: number | null = nodes[curr].next;
      nodes[curr].next = prev;
      steps.push({ lineNumber: 5, variables: { prev, curr, nodes: JSON.parse(JSON.stringify(nodes)) }, highlights: [], pointers: { prev: prev??-1, curr: curr??-1 }, description: 'Reverse link' });
      prev = curr; curr = next;
    }
    return steps;
  }

  private runBestTimeStock(prices: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let l=0, r=1, maxP=0;
    while(r<prices.length) {
      if(prices[l] < prices[r]) {
        maxP = Math.max(maxP, prices[r]-prices[l]);
        steps.push({ lineNumber: 5, variables: { l, r, maxP }, highlights: [l, r], pointers: { l, r }, description: `Profit: ${prices[r]-prices[l]}` });
      } else {
        l = r;
        steps.push({ lineNumber: 8, variables: { l, r }, highlights: [l, r], pointers: { l, r }, description: 'New low price found' });
      }
      r++;
    }
    return steps;
  }
}
