import basicAuth from 'express-basic-auth'
import ClienteRepository from '../repositories/cliente.repository.js'

async function autenticaUsuario (usuario, senha) {
  if (usuario === 'admin' && senha === 'desafio') {
    return { usuarioId: 'admin' }
  }
  const cliente = await ClienteRepository.getClienteByEmail(usuario)
  if (!cliente) {
    return { usuarioId: null }
  }
  if (cliente.email === usuario && cliente.senha === senha) {
    return { usuarioId: cliente.clienteId }
  }
  return null
}

const autenticaMiddleware = basicAuth({
  challenge: true,
  unauthorizedResponse: 'Acesso não autenticado!',
  authorizeAsync: true,
  authorizer: async (usuario, senha, req) => {
    const { usuarioId } = await autenticaUsuario(usuario, senha)
    if (!usuarioId) {
      return false
    }
    req.user = usuarioId
    return true
  }
})

const autorizaMiddleware = async (req, res, next) => {
  try {
    const autenticado = await autenticaMiddleware(req, res, next)
    if (!req.auth || !req.auth.user) {
      return
    }
    if (autenticado === false) {
      return res.status(401).send({ error: 'Cliente ou senha inválidos!' })
    }
    const usuarioId = req.auth.user
    if (usuarioId === 'admin') {
      return next()
    }
    const path = req.path
    const method = req.method
    const endpointsPermitidosCliente = [
      { path: '/cliente/:id', methods: ['PUT'] },
      { path: '/livro', methods: ['GET'] },
      { path: '/livro/:id', methods: ['GET'] },
      { path: '/livro/:id/avaliacao', methods: ['POST'] },
      { path: '/venda', methods: ['POST'] },
      { path: '/venda/:id', methods: ['GET'] }
    ]
    if (path === '/cliente' && method === 'PUT') {
      if (req.params.id === usuarioId) {
        return next()
      } else {
        return res.status(403).send('Falha na autorização: você só pode atualizar seus próprios dados')
      }
    }
    if (path === '/venda' && method === 'GET') {
      const clienteId = req.query.clienteId
      if (clienteId === usuarioId) {
        return next()
      } else {
        return res.status(403).send('Falha na autorização: você só pode consultar suas próprias vendas')
      }
    }
    const endpointPermitido = endpointsPermitidosCliente.some(endpoint => endpoint.path === path && endpoint.methods.includes(method))

    if (!endpointPermitido) {
      return res.status(403).send('Falha na autorização: endpoint não permitido')
    }
    next()
  } catch (error) {
    console.log({ error: error.message })
  }
}

export default {
  autorizaMiddleware
}
