import basicAuth from 'express-basic-auth'
import ClienteRepository from '../repositories/cliente.repository.js'

const autenticaUsuario = async (usuario, senha) => {
  if (!usuario || !senha) {
    return { usuarioId: null }
  }
  if (usuario === 'admin') {
    return senha === 'desafio' ? { usuarioId: 'admin' } : { usuarioId: null }
  }
  const cliente = await ClienteRepository.getClienteByEmail(usuario)
  if (!cliente || cliente.senha !== senha) {
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
  authorizer: async (usuario, senha) => {
    const { usuarioId } = await autenticaUsuario(usuario, senha)
    if (!usuarioId) {
      return { autenticado: false, usuarioId: null }
    }
    return { autenticado: true, usuarioId }
  }
})

const autorizaMiddleware = async (req, res, next) => {
  try {
    const { autenticado, usuarioId } = await autenticaMiddleware(req, res, next)
    if (!req.auth || !req.auth.user) {
      return
    }
    if (autenticado === false) {
      return res.status(401).send({ error: 'Cliente ou senha inválidos!' })
    }
    if (usuarioId === 'admin') {
      return next()
    }
    const path = req.path
    const method = req.method
    const endpointsPermitidosCliente = [
      { path: '/cliente', methods: ['PUT'] },
      { path: '/livro', methods: ['GET'] },
      { path: '/livro/:id', methods: ['GET'] },
      { path: '/livro/:id/avaliacao', methods: ['POST'] },
      { path: '/venda', methods: ['POST'] },
      { path: '/venda', methods: ['GET'] }
    ]
    const endpointPermitido = endpointsPermitidosCliente.some(endpoint => {
      const regex = new RegExp(`^${endpoint.path.replace(/\/:id/g, '/\\d+')}(/.*)?$`)
      return regex.test(path) && endpoint.methods.includes(method)
    })
    if (!endpointPermitido || path.startsWith('/venda/')) {
      return res.status(403).send('Falha na autorização: endpoint não permitido')
    }
    if (path === '/cliente' && method === 'PUT') {
      if (req.body.clienteId === usuarioId) {
        return next()
      } else {
        return res.status(403).send('Falha na autorização: você só pode atualizar seus próprios dados')
      }
    }
    if (path === '/venda' && method === 'POST') {
      if (req.body.clienteId === usuarioId) {
        return next()
      } else {
        return res.status(403).send('Falha na autorização: você só pode criar vendas para suas compras')
      }
    }
    if (path === '/venda' && method === 'GET') {
      const clienteId = parseInt(req.query.clienteId)
      if (clienteId === usuarioId) {
        return next()
      } else {
        return res.status(403).send('Falha na autorização: você só pode consultar suas próprias compras')
      }
    }
    next()
  } catch (error) {
    console.log({ error: error.message })
  }
}

export default {
  autorizaMiddleware
}
