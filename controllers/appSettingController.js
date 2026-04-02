const { AppSetting } = require('../models');

/**
 * @swagger
 * /app-settings:
 *   get:
 *     summary: Obtener todas las configuraciones de la aplicación
 *     tags: [App Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Objeto con las configuraciones clave-valor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *               example:
 *                 site_name: "Mi App"
 *                 password_min_length: "8"
 *       500:
 *         description: Error del servidor
 */
exports.getAll = async (req, res) => {
  try {
    const settings = await AppSetting.findAll();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /app-settings:
 *   put:
 *     summary: Actualizar configuraciones de la aplicación (upsert)
 *     tags: [App Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties:
 *               type: string
 *             example:
 *               site_name: "Mi Nueva App"
 *               password_min_length: "10"
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error del servidor
 */
exports.update = async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await AppSetting.upsert({ key, value });
    }
    res.json({ message: 'Configuración actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};