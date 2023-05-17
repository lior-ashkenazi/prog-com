import mongoose, { ConnectOptions } from "mongoose";

export default async function (): Promise<void> {
  try {
    const connectionString = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (error) {
    console.error(error);
  }
}
