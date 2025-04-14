import '../public/styles/styles.less';
import { worker } from './mocks/server.js';

worker.start().then(() => {
    fetch("/api/recipes/omelette")
        .then((response) => console.log(response));
});