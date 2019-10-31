const assert = require("assert");
const pg = require("pg");
const My_tutor = require("../My-tutor-manager/my_tutor");

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://diction:19970823@localhost:5432/tutor_database_testing";

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

// eslint-disable-next-line no-undef
describe("My Tutor testing", () => {
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    await pool.query("DELETE FROM students;");
    await pool.query("DELETE FROM tutors;");
  });

  // eslint-disable-next-line no-undef
  it("Should able to add a plate numbers to database  ", async () => {
    const instance_for_tutor = My_tutor(pool);
    await instance_for_tutor.build(
      "SBU",
      24,
      "5 YEARS",
      80,
      "BEST",
      "HELLO MY NAME",
      "MATHS",
      "PARROW"
    );
    await instance_for_tutor.build(
      "JOHN",
      24,
      "5 YEARS",
      80,
      "BEST",
      "HELLO MY NAME",
      "MATHS",
      "PARROW"
    );
    await instance_for_tutor.build(
      "JABU",
      24,
      "5 YEARS",
      80,
      "BEST",
      "HELLO MY NAME",
      "PHYSICS",
      "KHAYELITSHA"
    );
    await instance_for_tutor.search_engine("MATHS", "PARROW");

    const tutor_found = await instance_for_tutor.tutors_list();
    assert.equal(2, tutor_found.length);
  });
  // eslint-disable-next-line no-undef
  after(() => {
    pool.end();
  });
});
