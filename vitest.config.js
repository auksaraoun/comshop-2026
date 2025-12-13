import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['./tests/custom-expect.js'], // หรือ './tests/helpers/matchers.js'
        globals: true, // ถ้าต้องการใช้ globals
    },
})