import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_CONNECTION_SQL,
  {
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  }
)

export default sequelize
