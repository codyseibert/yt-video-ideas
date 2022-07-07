import { Sequelize } from "sequelize";

const connectToDatabase = async () => {
  const sequelize = new Sequelize("todoapp", "root", "Host@GH247", {
    host: "localhost",
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectToDatabase;
