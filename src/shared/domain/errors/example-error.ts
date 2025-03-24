export class ExampleError extends Error {
    constructor() {
        super('Example error')
        this.name = 'ExampleError'
    }
}