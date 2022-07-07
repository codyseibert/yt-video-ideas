import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  ideas: {
    type: DataTypes.ARRAY,
  },
});

User.sync({ force: true })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

export default User;
