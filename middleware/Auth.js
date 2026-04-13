import jwt from 'jsonwebtoken'
import userController from '../controllers/userController.js'

const Authorization = (req, res, next) => {
    const authToken = req.headers['authorization']
    if (authToken != undefined) {
        const bearerToken = authToken.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, userController.JWTSecret, (error, data) => {
            if (error) {
                res.status(401).json({ error: "Acesso não autorizado. Token inválido." })
            } else {
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                }
                next()
            }
        })
    } else {
        res.status(401).json({ error: "Acesso não autorizado, você não está autenticado." })
    }
}

const AdminOnly = (req, res, next) => {
    if (req.loggedUser && req.loggedUser.role === 'ADMIN') {
        next()
    } else {
        res.status(403).json({ error: "Acesso negado. Apenas administradores podem realizar esta ação." })
    }
}

export default { Authorization, AdminOnly }