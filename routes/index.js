require("../My-tutor-manager/my_tutor");
module.exports = function(instance_for_my_tutor) {
  async function index(req, res) {
    res.render("index");
  }

  async function build_tutor(req, res) {
    let name = req.body.name;
    let age = req.body.age;
    let experiance = req.body.experiance;
    let reviews = req.body.reviews;
    let rating = req.body.rating;
    let bio = req.body.bio;
    let subject = req.body.subject;
    let location = req.body.location;
    await instance_for_my_tutor.build(
      name,
      age,
      experiance,
      reviews,
      rating,
      bio,
      subject,
      location
    );
    res.redirect("/");
  }

  async function build(req, res) {
    res.render("build");
  }

  async function get_tutor(req, res) {
    // let data = 
    res.render("data", { data: await instance_for_my_tutor.display_tutors() });
  }

  return {
    index_route: index,
    build: build_tutor,
    tutor_builder: build,
    get: get_tutor
  };
};
