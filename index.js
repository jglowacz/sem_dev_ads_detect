import express from 'express';
import swaggerUi from'swagger-ui-express';
import openapi from './openapi.json' assert {
  type: 'json'
}

// Create an instance of the Express app
const app = express();

// Create a new instance of the Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

// Serve the Swagger UI
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Listen for requests
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});