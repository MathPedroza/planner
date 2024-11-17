const express = require('express');
const router = express.Router();
const { generateToken } = require('../auth');
const lembreteController = require('../controllers/lembretesController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'password') {
    const token = generateToken({ username });
    return res.json({ token });
  }
  
  return res.status(401).json({ message: 'Credenciais inválidas' });
});

router.get('/exemplo', authenticateToken, lembreteController.getLembretes);

module.exports = router;