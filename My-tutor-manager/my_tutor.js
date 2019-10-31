module.exports = function Mytutor(pool) {
  //It will store the names Entered for learners who signUp,
  let error_message = "";
  let tutors_array = [];
  //It will store all the subjects the learners want help with.
  // It will store all the locations Entered by learners.
  //The learner will have to enter their name
  async function getName(name) {
    let student = name.toUppercase();
    let get_all_names = await pool.query(
      "SELECT * FROM students WHERE student_name = $1",
      [student]
    );
    if (get_all_names.rows.lenght !== 0) {
      error_message = "";
      return true;
    } else {
      await pool.query("INSERT INTO students (student_name) VALUES ($1)", [
        student
      ]);
    }
  }

  //It will get the subject the learner wants help with
  async function search_database(subject, location) {
    let loc = location.toUppercase();
    let sub = subject.toUppercase();
    let get_all_tutors = await pool.query("SELECT * FROM tutors");
    for (let x = 0; x < get_all_tutors.rows.length; x++) {
      const location = get_all_tutors.rows[x].tutor_subject;
      const subject = get_all_tutors.rows[x].tutros_location;
      if (subject === sub && location === loc) {
        tutors_array.push(get_all_tutors.rows);
      }
    }
  }

  async function build_data(
    tutor_name,
    age,
    experiance,
    reviews,
    tutor_rating,
    tutor_bio,
    tutor_subject,
    tutor_location
  ) {
    await pool.query(
      "INSERT INTO tutors (tutor_names,age,experience,reviews,tutor_rating,tutors_bio,tutor_subject,tutros_location) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        tutor_name,
        age,
        experiance,
        reviews,
        tutor_rating,
        tutor_bio,
        tutor_subject,
        tutor_location
      ]
    );
  }

  const display_tutors = () => tutors_array;

  return {
    add_student_name: getName,
    search_engine: search_database,
    tutors_list: display_tutors,
    build: build_data
  };
};
