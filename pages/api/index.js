module.exports = async (req, res) => {
  console.log('called index');
  try {
    res.status(200).json({result: 'sucesss'});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
