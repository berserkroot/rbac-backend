const { Pais } = require('../models');

/**
 * @swagger
 * /paises:
 *   get:
 *     summary: Obtener todos los países ordenados por nombre
 *     tags: [Países]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de países
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   codigo:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */
exports.getAll = async (req, res) => {
  try {
    const paises = await Pais.findAll({ order: [['nombre', 'ASC']] });
    res.json(paises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};