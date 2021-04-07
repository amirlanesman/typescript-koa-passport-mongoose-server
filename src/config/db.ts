import { ConnectionOptions, connect } from 'mongoose';
import { config } from '../config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const connectDB = async () => {
  try {
    const mongoURI: string = config.mongoUrl;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
