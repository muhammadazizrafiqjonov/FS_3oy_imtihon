export class InternalServerError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "InternalServerError"
    }
}

export class BadrequestError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "BadrequestError"
    }
}

export class NotFoundError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "NotFoundError"
    }
}

export class ConflictError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "ConflictError"
    }
}

export class ForbiddenError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "ForbiddenError"
    }
}

export class UnauthorizedError extends Error{
    constructor(status, message){
        super(),
        this.status = status,
        this.message = message,
        this.name = "UnauthorizedError"
    }
}