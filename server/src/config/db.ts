import mongoose, { ConnectOptions } from "mongoose";

export default async function (): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (error) {
    console.error("Error says that " + error);
  }
}
