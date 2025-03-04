import express from 'express';
import cors from 'cors';
import Web3Router from './router/web3.router';
import dotenv from 'dotenv';
import mongooseConnection from './mongo';
import ProductRouter from './router/product.router';
dotenv.config();

const port = 8000;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/web3', Web3Router);
app.use('/product', ProductRouter);

app.listen(port, async () => {
  try {
    console.log(`Web Services listening at PORT: ${port}`);
    await mongooseConnection();
  } catch (error) {
    console.error('Error [app.listen]:', error);
  }
});