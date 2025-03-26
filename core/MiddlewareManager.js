class MiddlewareManager {
    constructor() {
        this.middleware = [];
    }

    use(middleware) {
        if (typeof middleware !== 'function') {
            throw new TypeError('Middleware must be a function.');
        }
        this.middleware.push(middleware);
    }

    async run(context) {
        for (const middleware of this.middleware) {
            await middleware(context); // Pass the context to each middleware
        }
    }
}

module.exports = MiddlewareManager;