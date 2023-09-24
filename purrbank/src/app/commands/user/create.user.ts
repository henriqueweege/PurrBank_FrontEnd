export class CreateUserCommand{
    
    
    constructor(
        public firstName: string, 
        public lastName: string,
        public email: string
    ) {
            
    }
    
}