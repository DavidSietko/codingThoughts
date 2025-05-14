import { Answer } from "@/app/lib/types/Answer";
import styles from "./AnswerBox.module.css";

interface Props {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
}

export default function AnswerBox(props: Props) {

    const mockAnswers: Answer[] = [
  {
    id: 1,
    userId: "user123",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    language: "JavaScript",
    explanation: "Use a hash map to store the difference between target and each number.",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) return [map.get(nums[i]), i];
    map.set(target - nums[i], i);
  }
}`,
  },
  {
    id: 2,
    userId: "user123",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    language: "Python",
    explanation: "Use a dummy head to build the result linked list.",
    code: `def addTwoNumbers(l1, l2):
    dummy = ListNode()
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        carry, out = divmod(val1 + val2 + carry, 10)
        curr.next = ListNode(out)
        curr = curr.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
  },
  {
    id: 3,
    userId: "user456",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    language: "TypeScript",
    explanation: "Use sliding window with a Set to track seen characters.",
    code: `function lengthOfLongestSubstring(s: string): number {
  let set = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
  },
  {
    id: 4,
    userId: "user789",
    number: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    language: "Python",
    explanation: "Track the minimum price and calculate the profit as you go.",
    code: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
  },
  {
    id: 5,
    userId: "user789",
    number: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    language: "JavaScript",
    explanation: "Iteratively reverse the pointers of the linked list.",
    code: `function reverseList(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
  },
  {
    id: 6,
    userId: "user101",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    language: "Python",
    explanation: "Use a stack to match opening and closing brackets.",
    code: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
  },
  {
    id: 7,
    userId: "user222",
    number: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    language: "TypeScript",
    explanation: "Classic Fibonacci-style dynamic programming.",
    code: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let first = 1, second = 2;
  for (let i = 3; i <= n; i++) {
    [first, second] = [second, first + second];
  }
  return second;
}`,
  },
  {
    id: 8,
    userId: "user333",
    number: 53,
    title: "Maximum Subarray",
    difficulty: "Easy",
    language: "JavaScript",
    explanation: "Use Kadane's Algorithm to find the max subarray sum.",
    code: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}`,
  },
  {
    id: 9,
    userId: "user123",
    number: 238,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    language: "Python",
    explanation: "Use prefix and suffix product arrays.",
    code: `def productExceptSelf(nums):
    n = len(nums)
    res = [1]*n
    left = 1
    for i in range(n):
        res[i] = left
        left *= nums[i]
    right = 1
    for i in range(n-1, -1, -1):
        res[i] *= right
        right *= nums[i]
    return res`,
  },
  {
    id: 10,
    userId: "user444",
    number: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    language: "JavaScript",
    explanation: "Expand around each center to check for longest palindrome.",
    code: `function longestPalindrome(s) {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    for (let j of [i, i+1]) {
      let l = i, r = j;
      while (s[l] === s[r] && l >= 0 && r < s.length) {
        l--; r++;
      }
      if (r - l - 1 > res.length) res = s.slice(l+1, r);
    }
  }
  return res;
}`,
  },
  // 10 more abbreviated to avoid length overload, you can copy and modify
  {
    id: 11, userId: "user123", number: 9, title: "Palindrome Number", difficulty: "Easy", language: "JavaScript", explanation: "Convert number to string and compare reverse.", code: `function isPalindrome(x) { return x.toString() === x.toString().split('').reverse().join(''); }`,
  },
  {
    id: 12, userId: "user456", number: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", language: "Python", explanation: "Use DFS to find max depth.", code: `def maxDepth(root): return 1 + max(maxDepth(root.left), maxDepth(root.right)) if root else 0`,
  },
  {
    id: 13, userId: "user789", number: 198, title: "House Robber", difficulty: "Medium", language: "JavaScript", explanation: "Dynamic programming with rolling variables.", code: `function rob(nums) { let prev = 0, curr = 0; for (let num of nums) [prev, curr] = [curr, Math.max(prev + num, curr)]; return curr; }`,
  },
  {
    id: 14, userId: "user321", number: 141, title: "Linked List Cycle", difficulty: "Easy", language: "Python", explanation: "Floyd's cycle detection algorithm.", code: `def hasCycle(head): slow = fast = head; while fast and fast.next: slow = slow.next; fast = fast.next.next; if slow == fast: return True; return False`,
  },
  {
    id: 15, userId: "user111", number: 3, title: "Longest Substring Without Repeat", difficulty: "Medium", language: "JavaScript", explanation: "Sliding window technique.", code: `function lengthOfLongestSubstring(s) { let set = new Set(), l = 0, res = 0; for (let r = 0; r < s.length; r++) { while (set.has(s[r])) set.delete(s[l++]); set.add(s[r]); res = Math.max(res, r - l + 1); } return res; }`,
  },
  {
    id: 16, userId: "user222", number: 11, title: "Container With Most Water", difficulty: "Medium", language: "Python", explanation: "Two pointer approach from both ends.", code: `def maxArea(height): l, r, res = 0, len(height)-1, 0; while l < r: res = max(res, (r-l)*min(height[l], height[r])); if height[l]<height[r]: l+=1; else: r-=1; return res`,
  },
  {
    id: 17, userId: "user123", number: 42, title: "Trapping Rain Water", difficulty: "Hard", language: "JavaScript", explanation: "Use two-pointer and keep track of max bounds.", code: `function trap(height) { let l = 0, r = height.length - 1, lMax = 0, rMax = 0, res = 0; while (l < r) { if (height[l] < height[r]) { lMax = Math.max(lMax, height[l]); res += lMax - height[l]; l++; } else { rMax = Math.max(rMax, height[r]); res += rMax - height[r]; r--; } } return res; }`,
  },
  {
    id: 18, userId: "user404", number: 25, title: "Reverse Nodes in k-Group", difficulty: "Hard", language: "Python", explanation: "Reverse k nodes at a time recursively.", code: `def reverseKGroup(head, k): # omitted for brevity`,
  },
  {
    id: 19, userId: "user505", number: 146, title: "LRU Cache", difficulty: "Medium", language: "TypeScript", explanation: "Use Map and custom doubly linked list.", code: `class LRUCache { /* omitted for brevity */ }`,
  },
  {
    id: 20, userId: "user999", number: 10, title: "Regular Expression Matching", difficulty: "Hard", language: "Python", explanation: "Use dynamic programming to match complex patterns.", code: `def isMatch(s, p): # omitted for brevity`,
  },
];

    return (
        <div className={styles.container}>
            <input className={styles.searchbar} type="text" value={props.name} onChange={(e) => { props.setName(e.target.value)}} placeholder="Enter a name here..."></input>
            <ul className={styles.listContainer}>
                {mockAnswers.map((answer, index) => (
                    <li key={index} className={styles.answerContainer}>
                        <div className={styles.title}>
                            <p>{`${answer.number}.`}</p>
                            <p>{answer.title}</p>
                        </div>
                        <div className={styles.specs}>
                            <p>{`Difficulty: ${answer.difficulty}`}</p>
                            <p>{`Language: ${answer.language}`}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}