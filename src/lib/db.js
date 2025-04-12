import mongoose from 'mongoose'
import { MONGO_URL } from '$env/static/private';

const mongoConnection = {
  isConnecting : 0,
}

const connectDB = async() => {
  if(mongoConnection.isConnecting === 1) {
    // console.log('Database is successfully connected');
    return;
  }

  if(mongoose.connections.length > 0) {
    mongoConnection.isConnecting = mongoose.connections[0].readyState;
    if(mongoConnection.isConnecting === 1){
      // console.log('Database is successfully connected');
      return;
    }
    else{
      await mongoose.disconnect();
    }
  }

  await mongoose.connect(MONGO_URL || '', {
    dbName : 'sandcastle',});
    mongoConnection.isConnecting = 1;
    // console.log('New connection to mongodb');
}

const disconnectDB = async() => {
  if(mongoConnection.isConnecting === 0) return;
  await mongoose.disconnect();
  mongoConnection.isConnecting = 0;
  // console.log('Disconnected to mongoDB');
}

export {connectDB, disconnectDB};