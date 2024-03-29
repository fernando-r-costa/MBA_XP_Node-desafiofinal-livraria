import Sequelize from 'sequelize'
import dbSql from '../repositories/dbSql.js'

const Autor = dbSql.define('autores', {
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
}, { underscored: true })

export default Autor
