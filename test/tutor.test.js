const assert = require('assert');
const pg = require('pg');
const Registration_numbers = require('../My-tutor-manager/my_tutor');

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
describe('Registration numbers test', () => {
    // eslint-disable-next-line no-undef
    beforeEach(async () => {
        await pool.query('DELETE FROM numbers;');
        await pool.query('DELETE FROM towns;');
    });

    // eslint-disable-next-line no-undef
    it('Should able to add a plate numbers to database  ', async () => {
        const reg_number_instance = Registration_numbers(pool);
        await reg_number_instance.add('CJ 123 123');

        const plate_number = await reg_number_instance.get();
        assert.equal(4, plate_number.length);
    });
    // eslint-disable-next-line no-undef
    after(() => {
        pool.end();
    });
});