
import { Problem } from '../types';

export const PROBLEMS: Problem[] = [
  // --- ARRAYS & HASHING ---
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Find two numbers in nums that add up to target.',
    functionName: 'twoSum',
    defaultInput: { nums: [2, 7, 11, 15], target: 9 },
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Check if any value appears at least twice.',
    functionName: 'containsDuplicate',
    defaultInput: { nums: [1, 2, 3, 1] },
    codeSnippet: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Check if t is an anagram of s.',
    functionName: 'isAnagram',
    defaultInput: { s: "anagram", t: "nagaram" },
    codeSnippet: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (const c of s) map.set(c, (map.get(c)||0)+1);
  for (const c of t) {
    if (!map.has(c)) return false;
    map.set(c, map.get(c)-1);
    if (map.get(c) === 0) map.delete(c);
  }
  return map.size === 0;
}`
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Group strings that are anagrams of each other.',
    functionName: 'groupAnagrams',
    defaultInput: { strs: ["eat","tea","tan","ate","nat","bat"] },
    codeSnippet: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Return the k most frequent elements.',
    functionName: 'topKFrequent',
    defaultInput: { nums: [1,1,1,2,2,3], k: 2 },
    codeSnippet: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n)||0)+1);
  return Array.from(count.entries())
    .sort((a,b) => b[1]-a[1])
    .slice(0,k)
    .map(x => x[0]);
}`
  },

  // --- TREES ---
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Invert a binary tree (mirror image).',
    functionName: 'invertTree',
    defaultInput: { root: [4, 2, 7, 1, 3, 6, 9] },
    codeSnippet: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}`
  },
  {
    id: 'max-depth',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Find the number of nodes along the longest path from root to leaf.',
    functionName: 'maxDepth',
    defaultInput: { root: [3, 9, 20, null, null, 15, 7] },
    codeSnippet: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(
    maxDepth(root.left), 
    maxDepth(root.right)
  );
}`
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Check if two binary trees are identical.',
    functionName: 'isSameTree',
    defaultInput: { p: [1,2,3], q: [1,2,3] },
    codeSnippet: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && 
         isSameTree(p.right, q.right);
}`
  },
  {
    id: 'level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    description: 'Return the level order traversal of nodes values.',
    functionName: 'levelOrder',
    defaultInput: { root: [3, 9, 20, null, null, 15, 7] },
    codeSnippet: `function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length) {
    const level = [];
    const len = q.length;
    for (let i=0; i<len; i++) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`
  },
  {
    id: 'subtree-another',
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Check if tree T is a subtree of tree S.',
    functionName: 'isSubtree',
    defaultInput: { root: [3,4,5,1,2], subRoot: [4,1,2] },
    codeSnippet: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || 
         isSubtree(root.right, subRoot);
}`
  },

  // --- GRAPHS ---
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Count islands (1s) in a grid.',
    functionName: 'numIslands',
    defaultInput: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] },
    codeSnippet: `function numIslands(grid) {
  let count = 0;
  for (let r=0; r<grid.length; r++) {
    for (let c=0; c<grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(grid, r, c);
      }
    }
  }
  return count;
}`
  },
  {
    id: 'max-area-island',
    title: 'Max Area of Island',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Find the maximum area of an island.',
    functionName: 'maxAreaOfIsland',
    defaultInput: { grid: [[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,0]] },
    codeSnippet: `function maxAreaOfIsland(grid) {
  let maxArea = 0;
  for (let r=0; r<R; r++) {
    for (let c=0; c<C; c++) {
      if (grid[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }
  return maxArea;
}`
  },
  {
    id: 'flood-fill',
    title: 'Flood Fill',
    difficulty: 'Easy',
    category: 'Graphs',
    description: 'Perform flood fill on the image starting from pixel (sr, sc).',
    functionName: 'floodFill',
    defaultInput: { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, color: 2 },
    codeSnippet: `function floodFill(image, sr, sc, color) {
  const oldColor = image[sr][sc];
  if (oldColor === color) return image;
  
  function dfs(r, c) {
    if (r<0 || c<0 || r>=R || c>=C || img[r][c]!==old) return;
    img[r][c] = color;
    dfs(r+1, c); dfs(r-1, c);
    dfs(r, c+1); dfs(r, c-1);
  }
  dfs(sr, sc);
  return image;
}`
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Min minutes until all oranges are rotten (BFS).',
    functionName: 'orangesRotting',
    defaultInput: { grid: [[2,1,1],[1,1,0],[0,1,1]] },
    codeSnippet: `function orangesRotting(grid) {
  let q = [];
  let fresh = 0;
  // Init Queue with rotten oranges
  // BFS
  return fresh === 0 ? time : -1;
}`
  },
  {
    id: 'pacific-atlantic',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Find cells that can flow to both Pacific and Atlantic oceans.',
    functionName: 'pacificAtlantic',
    defaultInput: { heights: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] },
    codeSnippet: `function pacificAtlantic(heights) {
  const pac = new Set();
  const atl = new Set();
  // DFS from borders
  // Intersect sets
  return res;
}`
  },

  // --- DP ---
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'DP',
    description: 'Count distinct ways to climb to the top.',
    functionName: 'climbStairs',
    defaultInput: { n: 5 },
    codeSnippet: `function climbStairs(n) {
  if (n <= 2) return n;
  let one = 2, two = 1;
  for (let i = 3; i <= n; i++) {
    let temp = one;
    one = one + two;
    two = temp;
  }
  return one;
}`
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'DP',
    description: 'Maximize money robbed without alerting police (no adjacent houses).',
    functionName: 'rob',
    defaultInput: { nums: [1, 2, 3, 1] },
    codeSnippet: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    let temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    category: 'DP',
    description: 'Find number of unique paths from top-left to bottom-right.',
    functionName: 'uniquePaths',
    defaultInput: { m: 3, n: 7 },
    codeSnippet: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let i = 0; i < m - 1; i++) {
    for (let j = 1; j < n; j++) {
      row[j] = row[j] + row[j-1];
    }
  }
  return row[n-1];
}`
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'DP',
    description: 'Fewest coins needed to make up amount.',
    functionName: 'coinChange',
    defaultInput: { coins: [1, 2, 5], amount: 11 },
    codeSnippet: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) {
      dp[a] = Math.min(dp[a], 1 + dp[a-c]);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`
  },
  {
    id: 'lcs',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    category: 'DP',
    description: 'Length of longest common subsequence.',
    functionName: 'longestCommonSubsequence',
    defaultInput: { text1: "abcde", text2: "ace" },
    codeSnippet: `function longestCommonSubsequence(t1, t2) {
  const dp = Array(t1.length + 1).fill(0).map(() => Array(t2.length+1).fill(0));
  for (let i=0; i<t1.length; i++) {
    for (let j=0; j<t2.length; j++) {
      if (t1[i] === t2[j]) dp[i+1][j+1] = 1 + dp[i][j];
      else dp[i+1][j+1] = Math.max(dp[i][j+1], dp[i+1][j]);
    }
  }
  return dp[t1.length][t2.length];
}`
  },

  // --- GREEDY ---
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    category: 'Greedy',
    description: 'Largest sum contiguous subarray.',
    functionName: 'maxSubArray',
    defaultInput: { nums: [-2,1,-3,4,-1,2,1,-5,4] },
    codeSnippet: `function maxSubArray(nums) {
  let maxSub = nums[0];
  let curSum = 0;
  for (const n of nums) {
    if (curSum < 0) curSum = 0;
    curSum += n;
    maxSub = Math.max(maxSub, curSum);
  }
  return maxSub;
}`
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    category: 'Greedy',
    description: 'Can you reach the last index?',
    functionName: 'canJump',
    defaultInput: { nums: [2, 3, 1, 1, 4] },
    codeSnippet: `function canJump(nums) {
  let goal = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (i + nums[i] >= goal) goal = i;
  }
  return goal === 0;
}`
  },
  {
    id: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    category: 'Greedy',
    description: 'Minimum jumps to reach last index.',
    functionName: 'jump',
    defaultInput: { nums: [2, 3, 1, 1, 4] },
    codeSnippet: `function jump(nums) {
  let jumps = 0, l = 0, r = 0;
  while (r < nums.length - 1) {
    let farthest = 0;
    for (let i = l; i <= r; i++) 
      farthest = Math.max(farthest, i + nums[i]);
    l = r + 1;
    r = farthest;
    jumps++;
  }
  return jumps;
}`
  },
  {
    id: 'can-place-flowers',
    title: 'Can Place Flowers',
    difficulty: 'Easy',
    category: 'Greedy',
    description: 'Can n flowers be planted without violating no-adjacent rule?',
    functionName: 'canPlaceFlowers',
    defaultInput: { flowerbed: [1,0,0,0,1], n: 1 },
    codeSnippet: `function canPlaceFlowers(flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0 && 
       (i===0 || flowerbed[i-1]===0) && 
       (i===len-1 || flowerbed[i+1]===0)) {
       flowerbed[i] = 1;
       n--;
    }
  }
  return n <= 0;
}`
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Greedy',
    description: 'Merge overlapping intervals.',
    functionName: 'merge',
    defaultInput: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
    codeSnippet: `function merge(intervals) {
  intervals.sort((a,b) => a[0]-b[0]);
  const res = [intervals[0]];
  for (const curr of intervals) {
    const last = res[res.length-1];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }
  return res;
}`
  },
  
  // --- STACK ---
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Check for valid bracket sequence.',
    functionName: 'isValid',
    defaultInput: { s: "()[]{}" },
    codeSnippet: `...`
  },
  
  // --- BINARY SEARCH ---
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: 'Standard binary search.',
    functionName: 'search',
    defaultInput: { nums: [-1,0,3,5,9,12], target: 9 },
    codeSnippet: `...`
  },

  // --- LINKED LIST ---
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'Reverse a linked list.',
    functionName: 'reverseList',
    defaultInput: { head: [1,2,3,4,5] },
    codeSnippet: `...`
  },
  
  // --- SLIDING WINDOW ---
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    description: 'Max profit from one buy and one sell.',
    functionName: 'maxProfit',
    defaultInput: { prices: [7,1,5,3,6,4] },
    codeSnippet: `...`
  }
];

export const CATEGORIES = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Greedy',
  'Backtracking',
  'Graphs',
  'DP'
];
