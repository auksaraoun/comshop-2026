import { expect } from 'vitest'

expect.extend({
    toBeISOTimestamp(received) {
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        const pass = iso8601Regex.test(received) && !isNaN(Date.parse(received))

        return {
            pass,
            message: () =>
                pass
                    ? `expected ${received} not to be ISO 8601 timestamp`
                    : `expected ${received} to be ISO 8601 timestamp`
        }
    },
    containStringInsensitive(value, contain) {
        const pass = value.toLowerCase().includes(contain.toLowerCase())
        return {
            pass,
            message: () =>
                pass
                    ? `expected "${value}" not to contain "${contain}" (case insensitive)`
                    : `expected "${value}" to contain "${contain}" (case insensitive)`
        }
    }
})
