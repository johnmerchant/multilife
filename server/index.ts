import {Server} from './server';

export default Server;

if (typeof require !== 'undefined' && require.main === module) {
    const server = new Server();
    (async () => {
        try {
            console.log('starting server...');
            await server.run();
        } catch (err) {
            console.error(err);
        }
    })();
}