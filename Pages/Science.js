var categories, clues, output = "";
function getMyJSONOutput()
{

categories = [
   {
      name: 'Atoms and Molecules',
      id: 1,
      clueId: [
         "0-0", "0-1", "0-2", "0-3", "0-4"
      ]
   },
   {
      name: 'Force and Motion', 
      id: 2,
      clueId: [
        "1-0", "1-1", "1-2", "1-3", "1-4"
     ]
   },
   {
      name: 'Water Cycle', 
      id: 3,
      clueId: [
        "2-0", "2-1", "2-2", "2-3", "2-4"
     ]
   },
   {
      name: 'Fossils', 
      id: 4,
      clueId: [
        "3-0", "3-1", "3-2", "3-3", "3-4"
     ]
   }
];

clues = [ 
         { clueId: "0-0",
           question: 'What is the term for any substance composed of identical molecules consisting of atoms of two or more chemical elements?',
           answer: 'Chemical Compound',
           value: 100
         },
         { clueId: "0-1",
           question: 'What is the term for a pure chemical substance that consists of atoms belonging to a single chemical element?',
           answer: 'Elementary substance',
           value: 200
         },
         { clueId: "0-2",
           question: 'Boron trichloride can be used to speed up certain types of chemical reactions. The chemical formula for boron trichloride is BCl3. What is boron trichloride?',
           answer: 'Chemical Compound',
           value: 300
         },
         { clueId: "0-3",
           question: 'How many hydrogen atoms are there in one molecule of CHCl3?',
           answer: '1',
           value: 400
         },
         { clueId: "0-4",
           question: 'Is silver(Ag) an elementary substance, yes or no? ',
           answer: 'Yes',
           value: 500
         },
        { clueId: "1-0",
        question: 'What is classified as a push or pull?',
        answer: 'Force',
        value: 100
        },
        { clueId: "1-1",
        question: 'True or False. Friction helps objects move easier.',
        answer: 'False',
        value: 200
        },
        { clueId: "1-2",
        question: 'What is the force that causes everything to be pulled down to the Earth.',
        answer: 'Gravity',
        value: 300
        },
        { clueId: "1-3",
        question: 'True or False. When objects remain in the same place, it is called kinetic energy.',
        answer: 'False',
        value: 400
        },
        { clueId: "1-4",
        question: 'You must divide what over time in order to calculate speed?',
        answer: 'Distance',
        value: 500
    },
       { clueId: "2-0",
        question: 'How many stages are in the water cycle?',
        answer: '4',
        value: 100
        },
        { clueId: "2-1",
        question: 'True or False. Condensation is the first step in the water cycle.',
        answer: 'False',
        value: 200
        },
        { clueId: "2-2",
        question: 'True or False. Evaporation is when warmth from the sun causes water from oceans, lakes, streams, ice and soils to rise into the air and turn into water vapour (gas).',
        answer: 'True',
        value: 300
        },
        { clueId: "2-3",
        question: 'Precipitation is when water (in the form of rain, snow, hail or sleet) falls from clouds into the what?',
        answer: 'Sky',
        value: 400
        },
        { clueId: "2-4",
        question: 'What is the name of the cycle when water that falls from the clouds as rain, snow, hail or sleet, collects in the oceans, rivers, lakes, streams. Most will infiltrate (soak into) the ground and will collect as underground water?',
        answer: 'Collection',
        value: 500
    },
    {   clueId: "3-0",
        question: 'True or False. Fossils are preserved remains of ancient organisms.',
        answer: 'True',
        value: 100
        },
        { clueId: "3-1",
        question: 'In which kind of rock do we usually find a fossil?',
        answer: 'Sedimentary rock',
        value: 200
        },
        { clueId: "3-2",
        question: 'True or False. The first step in the formation of fossils is decomposition.',
        answer: 'False',
        value: 300
        },
        { clueId: "3-3",
        question: 'Where can the oldest layer be found?',
        answer: 'The bottom layer',
        value: 400
        },
        { clueId: "3-4",
        question: 'The process of how an organism is formed into a fossil is called?',
        answer: 'Fossilization',
        value: 500
        }
      ]

for (const i in categories) {
    output += "<h2> Category: " + categories[i].name + "</h2>";
}

for (const x in clues){
    output += "<h1> Value: " + clues[x].value + "</h1>";
    output += "<h1> Question: " + clues[x].question + "</h1>";
    output += "<h1> Answer: " + clues[x].answer + "</h1>";
}

}

getMyJSONOutput();

document.getElementById("game").innerHTML = output;
/* const categories = [
  {
    name: 'Atoms and Molecules',
    id: 1,
    clues: [
      "0-0", "0-1", "0-2", "0-3", "0-4"
    ]
  },
  {
    name: 'Force and Motion',
    id: 2,
    clues: [
      "1-0", "1-1", "1-2", "1-3", "1-4"
    ]
  },
  {
    name: 'Water Cycle',
    id: 3,
    clues: [
      "2-0", "2-1", "2-2", "2-3", "2-4"
    ]
  },
  {
    name: 'Fossils',
    id: 4,
    clues: [
      "3-0", "3-1", "3-2", "3-3", "3-4"
    ]
  }
];

const clues = {
  "0-0": {
    question: 'What is the term for any substance composed of identical molecules consisting of atoms of two or more chemical elements?',
    answer: 'Chemical Compound',
    value: 100
  },
  "0-1": {
    question: 'What is the term for a pure chemical substance that consists of atoms belonging to a single chemical element?',
    answer: 'Elementary substance',
    value: 200
  },
  "0-2": {
    question: 'Boron trichloride can be used to speed up certain types of chemical reactions. The chemical formula for boron trichloride is BCl3. What is boron trichloride?',
    answer: 'Chemical Compound',
    value: 300
  },
  "0-3": {
    question: 'How many hydrogen atoms are there in one molecule of CHCl3?',
    answer: '1',
    value: 400
  },
  "0-4": {
    question: 'Is silver(Ag) an elementary substance, yes or no? ',
    answer: 'Yes',
    value: 500
  },
  "1-0": {
    question: 'What is classified as a push or pull?',
    answer: 'Force',
    value: 100
  },
  "1-1": {
    question: 'True or False. Friction helps objects move easier.',
    answer: 'False',
    value: 200
  },
  "1-2": {
    question: 'What is the force that causes everything to be pulled down to the Earth.',
    answer: 'Gravity',
    value: 300
  },
  "1-3": {
    question: 'True or False. When objects remain in the same place, it is called kinetic energy.',
    answer: 'False',
    value: 400
  },
  "1-4": {
    question: 'You must divide what over time in order to calculate speed?',
    answer: 'Distance',
    value: 500
  },
  "2-0": {
    question: 'How many stages are in the water cycle?',
    answer: '4',
    value: 100
  },
  "2-1": {
    question: 'True or False. Condensation is the first step in the water cycle.',
    answer: 'False',
    value: 200
  },
  "2-2": {
    question: 'True or False. Evaporation is when warmth from the sun causes water from oceans, lakes, streams, ice and soils to rise into the air and turn into water vapour (gas).',
    answer: 'True',
    value: 300
  },
  "2-3": {
    question: 'Precipitation is when water (in the form of rain, snow, hail or sleet) falls from clouds into the what?',
    answer: 'Sky',
    value: 400
  },
  "2-4": {
    question: 'What is the name of the cycle when water that falls from the clouds as rain, snow, hail or sleet, collects in the oceans, rivers, lakes, streams. Most will infiltrate (soak into) the ground and will collect as underground water?',
    answer: 'Collection',
    value: 500
  },
  "3-0": {
    question: 'True or False. Fossils are preserved remains of ancient organisms.',
    answer: 'True',
    value: 100
  },
  "3-1": {
    question: 'In which kind of rock do we usually find a fossil?',
    answer: 'Sedimentary rock',
    value: 200
  },
  "3-2": {
    question: 'True or False. The first step in the formation of fossils is decomposition.',
    answer: 'False',
    value: 300
  },
  "3-3": {
    question: 'Where can the oldest layer be found?',
    answer: 'The bottom layer',
    value: 400
  },
  "3-4": {
    question: 'The process of how an organism is formed into a fossil is called?',
    answer: 'Fossilization',
    value: 500
  }
}; */