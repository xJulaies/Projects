import mongoose from "mongoose";
import { settings } from "./settings";

export default async function connectDB() {
  try {
    await handleConnection();
  } catch (error) {
    console.log("Database Error: ", error);
  }
}

async function handleConnection() {
  await mongoose.connect(settings.MONGODB_URI!, {
    dbName: "TestAPI_1",
  });
  console.log("Connection to database: success!");

  mongoose.connection.on("disconnected", () => {
    console.log("Connection to server lost!");
    reConnectDB();
  });
}

async function reConnectDB() {
  const timeout = setTimeout(async () => {
    try {
      console.log("Trying to reconnect to database . . .");
      await handleConnection();
      clearTimeout(timeout);
    } catch (error) {
      console.log("Error while attempting to reconnect");
      reConnectDB();
    }
  }, 5000);
}
