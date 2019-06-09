import {Server} from './server';

const server = new Server();

(async () => {
    try {
        await server.run();
    } catch (err) {
        console.error(err);
    }
})();