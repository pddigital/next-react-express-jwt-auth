const nextRoutes = require('next-routes')

const routes = module.exports = nextRoutes()

routes.add('index', '/')
routes.add('login', '/login')
routes.add('dashboard', '/dashboard')
routes.add('content', '/content')