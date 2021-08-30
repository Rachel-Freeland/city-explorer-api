function getNotFound(req, res) {
  console.error('Route not found');
  res.status(404).send('Not Found');
}

module.exports = getNotFound;