create table tutors (
id serial primary key,
tutor_names text not null,
age int not null,
experience text not null,
reviews int not null
);

create table tutor_rating (
id serial primary key,
rating_key int not null references tutors (id),
ratio_rating int
);

create table tutors_bio (
id serial primary key,
bio text not null,
bio_key int not null references tutors (id)
);

create table subjects_table (
id serial primary key,
subjects text not null,
sub_for_tutor int not null references tutors (id)
);

create table locations_table (
id serial primary key,
locations text not null,
tutors_location int not null references tutors (id)
);