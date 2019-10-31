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
    res.redirect("/tutor_builder");
  }

  async function build(req, res) {
    res.render("build");
  }

  async function get_tutor(req, res) {
    // let data =
    res.render("data", { data: await instance_for_my_tutor.display_tutors() });
  }

  async function search(req, res) {
    let name = req.body.student;
    let subject = req.body.subject;
    let location = req.body.location;
    await instance_for_my_tutor.add_student_name(name);
    await instance_for_my_tutor.search_engine(subject, location);
    res.redirect("/tutors");
  }

  async function show(req, res) {
    let array = instance_for_my_tutor.tutors_list();
    console.log(array, "route");
    res.render("tutors", { tutor: array });
  }

  async function show_ratings(req, res) {
    res.render("ratings", {
      data: await instance_for_my_tutor.display_tutors()
    });
  }

  async function chat(req, res) {
    res.render("form");
  }

  async function send(req, res) {
    res.render("form", { title: "Registration form" });
  }

  return {
    index_route: index,
    build: build_tutor,
    tutor_builder: build,
    get: get_tutor,
    search_tutor: search,
    tutor_list: show,
    rate: show_ratings,
    chat,
    send
  };
};
