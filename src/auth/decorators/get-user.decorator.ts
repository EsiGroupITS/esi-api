import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


// Decorador para obtener la información de un usuario, esta data la extraemos de la request.
export const GetUser = createParamDecorator(

    ( data:string, ctx: ExecutionContext) => {     //ExecutionContex es el contexto en el cual se está ejecutando la función y nos da acceso, entre otras cosas, a la request, que es lo que necesitamos para tomar el usuario

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if( !user )
            throw new InternalServerErrorException('User not found (request)');

        return ( !data )
            ? user
            : user[data];
    }
);