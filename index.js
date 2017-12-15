const app = require('./src/App').getInstance();

app.bootstrap().then(() => app.start());
