import { modules, students, mentors, classes } from "./hyf.js";

/**
 * We would like to have a list of everyone that is currently participating in a class.
 * This means the students, but also the mentors that are currently teaching the class.
 * The students should be self explanatory, but to find the mentors you will need to follow these steps:
 * - Check what the `currentModule` of the class is
 * - Find the mentor(s) that are `nowTeaching` that module
 *
 * Should return the list of names and their roles. So something like:
 *
 *  [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }]
 */
const getPeopleOfClass = (className) => {
  // TODO complete this function

  // we will use currentClass multiple time, so lets make a variable
  const currentClass = classes.find((e) => e.name === className);

  // it says Currently participating = we don't need non active classes but lets not have an error. so not active = console log this
  if (currentClass.active == false) {
    return "---This class is currently not active---";
  } else {
    // Find the mentor and make sure there is one.
    // In the dataset class 35 is active and in "using -apis" module but there are no teacher currently teaching it...

    const whoIsMyMentor = () => {
      const currentMentor = mentors.filter((e) => {
        return e.nowTeaching === currentClass.currentModule;
      });

      if (currentMentor.length == 0) {
        return "THERE IS NO MENTOR IN THIS ACTIVE CLASS!!";
      } else {
        return currentMentor[0].name;
      }
    };

    const mentorCurrentClass = {
      name: whoIsMyMentor(),
      role: "mentor",
    };

    // Add students and return it with mentor

    return [
      mentorCurrentClass,
      ...students
        .filter((e) => e.class === currentClass.name)
        .map((e) => {
          return { name: e.name, role: "Student" };
        }),
    ];
  }

  // WHAT IF 2 different classes was in same module. and had different teachers. this data sets assume there will  always be only one teacher teaching that module. also before running the code we would have to check the dataset for incorrectly filled values. what if user wrote "react" module for 2 different teacher? or what if there were 2 different classes on same module?
};

// Console logs for 3 different situations
console.log("Class 33: ");
console.log(getPeopleOfClass("class33")); // Non active class
console.log("Class 34: ");
console.log(getPeopleOfClass("class34"));
console.log("\n Class 35: ");
console.log(getPeopleOfClass("class35")); // active class without mentor
console.log("\nClass 36:");
console.log(getPeopleOfClass("class36")); // active class

/**
 * We would like to have a complete overview of the current active classes.
 * First find the active classes, then for each get the people of that class.
 *
 * Should return an object with the class names as properties.
 * Each class name property contains an array identical to the return from `getPeopleFromClass`. So something like:
 *
 *  {
 *    class34: [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }],
 *    class35: [{ name: 'Jane', role: 'student' }, { name: 'Steve', role: 'mentor' }]
 *  }
 */
const getActiveClasses = () => {
  // TODO complete this function
  const activeClasses = {};
  classes
    .filter((e) => e.active === true)
    .forEach((e) => {
      activeClasses[e.name] = getPeopleOfClass(e.name);
    });

  return activeClasses;
};
// You can uncomment out this line to try your function

console.log(" \n \n \n ------Second Task------ \n \n \n");
console.log(getActiveClasses());
