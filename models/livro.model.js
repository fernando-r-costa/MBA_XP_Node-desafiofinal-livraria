import Sequelize from 'sequelize'
import dbSql from '../repositories/dbSql.js'
import Autor from './autor.model.js'

const Livro = dbSql.define('livros', {
  livroId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  estoque: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { underscored: true })

Livro.belongsTo(Autor, { foreignKey: 'autorId' })

export default Livro
