import { Express, RequestHandler } from "express";

export function defineRoutes(controllers: any, application: Express) {
    for (let i = 0; i < controllers.length; i++) {
        const controller = new controllers[i]();

        const routeHandlers = Reflect.getMetadata('routeHandlers', controller);
        const controllerPath = Reflect.getMetadata('baseRoute', controller.constructor);
        const methods = Array.from(routeHandlers.keys());

        for (let j = 0; j < methods.length; j++) {
            const method = methods[j];
            const routes = routeHandlers.get(method);

            if (routes) {
                const routeNames = Array.from(routes.keys())

                for (let k = 0; k < routeNames.length; k++) {
                    const handlers = routes.get(routeNames[k]);

                    if (handlers) {
                        application[method as keyof Express](controllerPath + routeNames[k], handlers);
                        console.log('Loading route: ', method, controllerPath + routeNames[k]);
                    }
                }
            }
        }
    }
}