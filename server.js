const app = require('./app');
const port = 8080;

app.listen(port, () => {
    console.log(`Express server listening on ${port}`);
})