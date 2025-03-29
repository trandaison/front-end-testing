import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,

    // exclude: ["/src/*"], // Add patterns or files to exclude here
    environment: "jsdom",
  },
})
