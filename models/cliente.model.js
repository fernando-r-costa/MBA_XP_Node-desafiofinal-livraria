import Sequelize from 'sequelize'
import dbSql from '../repositories/dbSql.js'

const Cliente = dbSql.define('clientes', {
  clienteId: {
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
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['senha'] }
  }
})

export default Cliente
