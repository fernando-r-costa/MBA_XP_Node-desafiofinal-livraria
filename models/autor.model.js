import Sequelize from 'sequelize'
import dbSql from '../repositories/dbSql.js'

const Autor = dbSql.define('Autor', {
  autorId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  tableName: 'autores'
})

export default Autor
