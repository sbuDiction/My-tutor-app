create table tutors (
id serial primary key,
tutor_names text not null,
age int not null,
experience text not null,
reviews int not null,
tutor_rating text not null,
tutors_bio text not null,
tutor_subject text not null,
tutros_location text not null
);

create table students (
    id serial primary key,
    student_name text not null
)