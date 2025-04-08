import express from 'express';
import cors from 'cors';
import Web3Router from './src/router/web3.router';
import ProductRouter from './src/router/product.router';
import ManufacturerRouter from './src/router/manufacturer.router';
import dotenv from 'dotenv';
import mongooseConnection from './src/database';
import ProductLookupRouter from './src/router/product-lookup.router';
import ProductAgentRouter from './src/router/product-agent.router';

dotenv.config();

const port = 8000;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('Nothing to see here :D');
});

app.use('/web3', Web3Router);
app.use('/product', ProductRouter);
app.use('/manufacturer', ManufacturerRouter);
app.use('/product-lookup', ProductLookupRouter);
app.use('/product-agent', ProductAgentRouter);

app.listen(port, async () => {
  try {
    console.log(`Web Services listening at PORT: ${port}`);
    await mongooseConnection();
  } catch (error) {
    console.error('Error [app.listen]:', error);
  }
});