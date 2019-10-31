module.exports = function () {

  async function index(req, res) {
    res.render('index');
  }

  return {
    index_route: index,
  };
};