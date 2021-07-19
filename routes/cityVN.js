const router = require('express').Router();
const { get } = require('../handlers/database');

router.get('/', async (req, res) => {
  const data = await get('ncovcity');
  res.status(200).json(data);
});

module.exports = router;
