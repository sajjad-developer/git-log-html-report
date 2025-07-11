// vitest.config.js
export default {
  test: {
    testTimeout: 30000, // 30 seconds for long-running CLI tests
    environment: "node", // for Node.js CLI environment
    globals: true, // enables global describe, it, expect
  },
};
