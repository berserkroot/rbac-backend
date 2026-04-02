const { validationResult, body, param } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.registerRules = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username mínimo 3 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password mínimo 6 caracteres')
];

exports.loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

exports.userRules = [
  body('username').optional().trim().isLength({ min: 3 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('nombres').optional().trim(),
  body('apellidos').optional().trim(),
  body('document_type').optional().trim(),
  body('document_number').optional().trim(),
  body('calle').optional().trim(),
  body('numero').optional().trim(),
  body('entre').optional().trim(),
  body('avenida').optional().trim(),
  body('localidad').optional().trim(),
  body('municipio').optional().trim(),
  body('provincia').optional().trim(),
  body('id_pais').optional().isInt().withMessage('id_pais debe ser número')
];

exports.idParamRule = [
  param('id').isInt().withMessage('ID debe ser número')
];