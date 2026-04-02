const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RBAC System API',
      version: '1.0.0',
      description: 'API para sistema de control de acceso basado en roles (RBAC)',
      contact: {
        name: 'https://binaryworks.send-pulse.com',
        email: 'worksbinary27@gmail.com',

      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            email: { type: 'string' },
            isActive: { type: 'boolean' },
            document_type: { type: 'string' },
            document_number: { type: 'string' },
            calle: { type: 'string' },
            numero: { type: 'string' },
            entre: { type: 'string' },
            avenida: { type: 'string' },
            localidad: { type: 'string' },
            municipio: { type: 'string' },
            provincia: { type: 'string' },
            foto: { type: 'string' },
            twoFactorEnabled: { type: 'boolean' },
            lastLogin: { type: 'string', format: 'date-time' },
            pais: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                nombre: { type: 'string' },
                codigo: { type: 'string' }
              }
            },
            Roles: {
              type: 'array',
              items: { $ref: '#/components/schemas/Role' }
            }
          }
        },
        UserWithPermissions: {
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                permissions: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }
          ]
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'integer' }
          }
        },
        RoleWithPermissions: {
          allOf: [
            { $ref: '#/components/schemas/Role' },
            {
              type: 'object',
              properties: {
                Permissions: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Permission' }
                }
              }
            }
          ]
        },
        Permission: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            resource: { type: 'string' },
            action: { type: 'string' }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            message: { type: 'string' },
            type: { type: 'string', enum: ['info', 'success', 'warning', 'error'] },
            read: { type: 'boolean' },
            link: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./controllers/*.js'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;