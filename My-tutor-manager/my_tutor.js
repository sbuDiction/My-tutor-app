module.exports = function Mytutor() {

    //It will store the names Entered for learners who signUp,
    var names = [];
    //It will store all the subjects the learners want help with.
    var subjects = [];
    // It will store all the locations Entered by learners.
    var  locations = [];
    //The learner will have to enter their name
    function getName(name) {
        names.push(name);
    }

    //It will get the subject the learner wants help with
    function getSubject(subject) {
        subjects.push(subject);
    }

    // The learner will enter his/her location
    function getLocation(location) {
        locations.push(location);
    }




    return {
        getSubject,
        getLocation,
        getName
    }
}