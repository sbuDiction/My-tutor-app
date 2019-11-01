module.exports = function Mytutor(pool) {
  let error_message = "";
  let newList;

  async function getName(name) {
    // console.log(name);

    let student = name.toUpperCase();
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

  async function search_database(subject, location) {
    let loc = location.toUpperCase();
    let sub = subject.toUpperCase();
    let search_tutor = await pool.query('SELECT * FROM tutors WHERE tutor_subject = $1 AND tutros_location = $2', [sub, loc])
    if(search_tutor.rows.length !== 0){
      newList = search_tutor.rows
      return newList
    }else {
      newList = ''
      error_message = 'Unfortunately there are no tutors avialable currently'
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

  async function tutors() {
    let get_tuturs = await pool.query("SELECT * FROM tutors");
    return get_tuturs.rows;
  }

  const display_tutors = function() {
    return newList;
  };
  const display_message = () => error_message;

  return {
    add_student_name: getName,
    search_engine: search_database,
    tutors_list: display_tutors,
    build: build_data,
    display_tutors: tutors,
    errors: display_message
  };
};
