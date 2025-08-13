export function fuzzyMatch(input: string, options: string[]): string {
  const lowerInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  let bestMatch = options[0] || '';
  let maxScore = 0;

  for (const option of options) {
    const lowerOption = option.toLowerCase().replace(/[^a-z0-9]/g, '');
    let score = 0;
    for (let i = 0; i < lowerInput.length; i++) {
      if (lowerOption.includes(lowerInput[i])) score++;
    }
    const levenshtein = (a: string, b: string): number => {
      const dp = Array(a.length + 1).fill(0).map(() => Array(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
          );
        }
      }
      return dp[a.length][b.length];
    };
    const levScore = 1 / (1 + levenshtein(lowerInput, lowerOption));
    score += levScore * 10;
    if (score > maxScore) {
      maxScore = score;
      bestMatch = option;
    }
  }
  return bestMatch;
}