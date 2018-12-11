const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`API server started on http://localhost:${port}`);
  console.info(`Status on: http://localhost:${port}/health`);
});
