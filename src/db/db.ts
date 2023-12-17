import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado com o MongoDB');
}

export default mongoose;

/*
let db: Db;

export const connectDB = async () => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log('Conectado!');
  } catch (error) {
    console.error('Erro ao Conectar:', error);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Não conectado ao banco de dados!');
  }
  return db;
};
*/