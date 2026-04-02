const { AppSetting } = require('../models');
const { getPolicy } = require('../services/passwordPolicyService');

/**
 * @swagger
 * /password-policy:
 *   get:
 *     summary: Obtener la política de contraseñas actual
 *     tags: [Password Policy]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Política de contraseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 minLength:
 *                   type: integer
 *                   example: 8
 *                 requireUppercase:
 *                   type: boolean
 *                   example: true
 *                 requireNumber:
 *                   type: boolean
 *                   example: true
 *                 requireSymbol:
 *                   type: boolean
 *                   example: true
 *                 expiryDays:
 *                   type: integer
 *                   example: 90
 *                 historyLimit:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Error del servidor
 */
exports.getPolicy = async (req, res) => {
  try {
    const policy = await getPolicy();
    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /password-policy:
 *   put:
 *     summary: Actualizar la política de contraseñas
 *     tags: [Password Policy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minLength:
 *                 type: integer
 *                 example: 8
 *               requireUppercase:
 *                 type: boolean
 *                 example: true
 *               requireNumber:
 *                 type: boolean
 *                 example: true
 *               requireSymbol:
 *                 type: boolean
 *                 example: true
 *               expiryDays:
 *                 type: integer
 *                 example: 90
 *               historyLimit:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Políticas actualizadas correctamente
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
exports.updatePolicy = async (req, res) => {
  try {
    const { minLength, requireUppercase, requireNumber, requireSymbol, expiryDays, historyLimit } = req.body;
    const updates = [
      { key: 'password_min_length', value: String(minLength) },
      { key: 'password_require_uppercase', value: String(requireUppercase) },
      { key: 'password_require_number', value: String(requireNumber) },
      { key: 'password_require_symbol', value: String(requireSymbol) },
      { key: 'password_expiry_days', value: String(expiryDays) },
      { key: 'password_history_limit', value: String(historyLimit) }
    ];
    for (const upd of updates) {
      await AppSetting.upsert({ key: upd.key, value: upd.value });
    }
    res.json({ message: 'Políticas actualizadas correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};