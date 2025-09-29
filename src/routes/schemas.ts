/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do produto.
 *           example: "Camiseta"
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto.
 *           example: 49.99
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do produto.
 *           example: "Camiseta"
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto.
 *           example: 49.99
 *
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Novo nome do produto.
 *           example: "Camiseta Estampada"
 *         price:
 *           type: number
 *           format: float
 *           description: Novo preço do produto.
 *           example: 59.90
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Flamarion"
 *         email:
 *           type: string
 *           format: email
 *           example: "flamarion@example.com"
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           example: "customer"
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: "Flamarion Fagundes"
 *         email:
 *           type: string
 *           format: email
 *           example: "flamarion@example.com"
 *         password:
 *           type: string
 *           description: Senha com no mínimo 6 caracteres.
 *           example: "123456"
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           example: "customer"
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Flamarion Fagundes Jr"
 *         email:
 *           type: string
 *           format: email
 *           example: "flamarion.jr@example.com"
 *
 *     AuthRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "flamarion@example.com"
 *         password:
 *           type: string
 *           example: "123456"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autorização.
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         cartId:
 *           type: integer
 *         productId:
 *           type: integer
 *         userId:
 *           type: integer
 *         productName:
 *           type: string
 *         productPrice:
 *           type: number
 */
export {};
