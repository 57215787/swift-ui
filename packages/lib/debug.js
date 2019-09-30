export function noop(a, b, c) { }
export let warn = noop
export let tip = noop

const hasConsole = typeof console !== 'undefined'
warn = (msg) => {
    if (hasConsole) {
        console.error(`${msg}`)
    }
}

tip = (msg) => {
    if (hasConsole) {
        console.warn(`${msg}`)
    }
}