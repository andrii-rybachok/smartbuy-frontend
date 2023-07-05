export class UnAuthorizedError extends Error{
    constructor(message = "Token needs to be refresh"){
        super(message);
        this.name="UnAuthorizedException";
    }
}