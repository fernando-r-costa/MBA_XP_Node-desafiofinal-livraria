import Sequelize from 'sequelize'
import dbSql from '../repositories/dbSql.js'
import Cliente from './cliente.model.js'
import Livro from './livro.model.js'

const Venda = dbSql.define('vendas', {
  vendaId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  valor: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, { underscored: true })

Venda.belongsTo(Cliente, { foreignKey: 'clienteId' })
Venda.belongsTo(Livro, { foreignKey: 'livroId' })

export default Venda
