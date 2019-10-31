const assert = require('assert');
const pg = require('pg');
const My_tutor = require('../My-tutor-manager/my_tutor');

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://diction:19970823@localhost:5432/tutor_database_testing';

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString,
    ssl: useSSL,
});

// eslint-disable-next-line no-undef
describe('My Tutor testing', () => {
    // eslint-disable-next-line no-undef
    beforeEach(async () => {
        await pool.query('DELETE FROM students;');
    });

    // eslint-disable-next-line no-undef
    it('Should able to add a plate numbers to database  ', async () => {
        const instance_for_tutor = My_tutor(pool);
        await instance_for_tutor.add('CJ 123 123');

        const plate_number = await instance_for_tutor.get();
        assert.equal(4, plate_number.length);
    });
    // eslint-disable-next-line no-undef
    after(() => {
        pool.end();
    });
});