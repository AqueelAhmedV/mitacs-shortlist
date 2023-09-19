import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import './md-popover.css'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { BASE_URL } from "../../endpoints"


const backgroundList = [{
    value: 0,
    label: 'Accounting'
  }, {
    value: 1,
    label: 'Actuarial Science'
  }, {
    value: 2,
    label: 'Agriculture'
  }, {
    value: 3,
    label: 'American Studies'
  }, {
    value: 4,
    label: 'Anatomy'
  }, {
    value: 5,
    label: 'Anthropology'
  }, {
    value: 6,
    label: 'Arabic Language'
  }, {
    value: 7,
    label: 'Archaeology'
  }, {
    value: 8,
    label: 'Architecture'
  }, {
    value: 9,
    label: 'Art'
  }, {
    value: 10,
    label: 'Art History'
  }, {
    value: 11,
    label: 'Asian Studies'
  }, {
    value: 12,
    label: 'Astronomy'
  }, {
    value: 13,
    label: 'Astrophysics'
  }, {
    value: 14,
    label: 'Atmospheric Science'
  }, {
    value: 15,
    label: 'Australian Studies'
  }, {
    value: 16,
    label: 'Aviation'
  }, {
    value: 17,
    label: 'Banking'
  }, {
    value: 18,
    label: 'Biochemistry'
  },
  // {value: 19, label: 'Biological Sceinces'},
  {
    value: 20,
    label: 'Biological Sciences'
  },
  // {value: 21, label: 'Biologie'},
  {
    value: 22,
    label: 'Biology'
  }, {
    value: 23,
    label: 'Botany'
  }, {
    value: 24,
    label: 'Business'
  }, {
    value: 25,
    label: 'Canadian Studies'
  }, {
    value: 26,
    label: 'Ceramics'
  }, {
    value: 27,
    label: 'Chemistry'
  },
  // {value: 28, label: 'Chimie'},
  {
    value: 29,
    label: 'Chinese Language'
  }, {
    value: 30,
    label: 'Chiropractic'
  }, {
    value: 31,
    label: 'City/Regional Planning'
  }, {
    value: 32,
    label: 'Classics'
  }, {
    value: 33,
    label: 'Communication'
  }, {
    value: 34,
    label: 'Comparative Development'
  }, {
    value: 35,
    label: 'Comparative Literature'
  }, {
    value: 202,
    label: 'Computer Science'
  }, {
    value: 37,
    label: 'Cultural Studies'
  }, {
    value: 38,
    label: 'Dentistry'
  }, {
    value: 39,
    label: 'Design'
  }, {
    value: 40,
    label: 'Development Studies'
  }, {
    value: 41,
    label: 'Drama'
  }, {
    value: 42,
    label: 'Earth Science'
  }, {
    value: 43,
    label: 'East Asian Studies'
  }, {
    value: 44,
    label: 'Ecology'
  }, {
    value: 45,
    label: 'Econometrics'
  }, {
    value: 46,
    label: 'Economics'
  }, {
    value: 47,
    label: 'Educ-Admin'
  }, {
    value: 48,
    label: 'Educ-Art'
  }, {
    value: 49,
    label: 'Educ-Curriculum Studies'
  }, {
    value: 50,
    label: 'Educ-Elementary'
  }, {
    value: 51,
    label: 'Educ-Foundations'
  }, {
    value: 52,
    label: 'Educ-Languages'
  }, {
    value: 53,
    label: 'Educ-Music'
  }, {
    value: 54,
    label: 'Educ-Phys Ed'
  }, {
    value: 55,
    label: 'Educ-Psychology'
  }, {
    value: 56,
    label: 'Educ-Religion'
  }, {
    value: 57,
    label: 'Educ-Science'
  }, {
    value: 58,
    label: 'Educ-Secondary'
  }, {
    value: 59,
    label: 'Educ-Social Studies'
  }, {
    value: 60,
    label: 'Educ-Special Ed'
  }, {
    value: 61,
    label: 'Educ-Vocational'
  }, {
    value: 62,
    label: 'Education'
  }, {
    value: 63,
    label: 'Electronic Systems'
  }, {
    value: 64,
    label: 'Engg-Aeronautical'
  }, {
    value: 65,
    label: 'Engg-Biological'
  }, {
    value: 66,
    label: 'Engg-Biomedical'
  }, {
    value: 67,
    label: 'Engg-Ceramic'
  }, {
    value: 68,
    label: 'Engg-Chemical'
  }, {
    value: 69,
    label: 'Engg-Civil'
  }, {
    value: 70,
    label: 'Engg-Computer'
  }, {
    value: 71,
    label: 'Engg-Electrical'
  }, {
    value: 73,
    label: 'Engg-Enviromental'
  }, {
    value: 75,
    label: 'Engg-Fuel'
  }, {
    value: 76,
    label: 'Engg-Geological'
  }, {
    value: 77,
    label: 'Engg-Industrial'
  }, {
    value: 78,
    label: 'Engg-Manufacturing'
  }, {
    value: 80,
    label: 'Engg-Materials'
  }, {
    value: 81,
    label: 'Engg-Mechanical'
  }, {
    value: 82,
    label: 'Engg-Metallurgical'
  }, {
    value: 83,
    label: 'Engg-Mineral'
  }, {
    value: 84,
    label: 'Engg-Mining'
  }, {
    value: 85,
    label: 'Engg-Petroleum'
  }, {
    value: 86,
    label: 'Engg-Software'
  }, {
    value: 87,
    label: 'Engg-Systems and Technology'
  }, {
    value: 88,
    label: 'Engineering'
  }, {
    value: 89,
    label: 'English Literature'
  },
  // {value: 90, label: 'Enseignment Secondaire'},
  // {value: 91, label: 'Enseignment primaire'},
  {
    value: 92,
    label: 'Entomology'
  }, {
    value: 93,
    label: 'Environmental Studies'
  }, {
    value: 94,
    label: 'Ergonomics'
  }, {
    value: 95,
    label: 'European Studies'
  }, {
    value: 96,
    label: 'Film Studies'
  }, {
    value: 97,
    label: 'Finance'
  }, {
    value: 98,
    label: 'Fine Arts'
  }, {
    value: 99,
    label: 'Food Science'
  }, {
    value: 100,
    label: 'Forestry'
  }, {
    value: 101,
    label: 'French Language'
  }, {
    value: 102,
    label: 'French Studies'
  }, {
    value: 103,
    label: 'Genetics'
  }, {
    value: 104,
    label: 'Geography'
  }, {
    value: 105,
    label: 'Geology'
  }, {
    value: 106,
    label: 'Geomatics'
  }, {
    value: 107,
    label: 'German Language'
  }, {
    value: 108,
    label: 'German Studies'
  }, {
    value: 109,
    label: 'Greek Language'
  }, {
    value: 110,
    label: 'Health Studies'
  }, {
    value: 111,
    label: 'Hebrew Language'
  }, {
    value: 112,
    label: 'Hindi Language'
  }, {
    value: 113,
    label: 'Hispanic Studies'
  },
  // {value: 114, label: 'Histoire'},
  {
    value: 115,
    label: 'History'
  }, {
    value: 116,
    label: 'History-Ancient'
  }, {
    value: 117,
    label: 'Hospitality'
  }, {
    value: 118,
    label: 'Human Ecology'
  }, {
    value: 119,
    label: 'Humanities'
  }, {
    value: 120,
    label: 'Immunology'
  }, {
    value: 121,
    label: 'Indonesian Language'
  }, {
    value: 122,
    label: 'Indonesian Studies'
  }, {
    value: 123,
    label: 'Industrial Design and Technology'
  }, {
    value: 124,
    label: 'Industrial Relations'
  }, {
    value: 125,
    label: 'Information Studies'
  }, {
    value: 128,
    label: 'Interior Design'
  }, {
    value: 129,
    label: 'International Business'
  }, {
    value: 130,
    label: 'International Business and Trade'
  }, {
    value: 131,
    label: 'International Studies'
  }, {
    value: 132,
    label: 'Islamic Studies'
  }, {
    value: 133,
    label: 'Italian Language'
  }, {
    value: 134,
    label: 'Italian Studies'
  }, {
    value: 135,
    label: 'Japanese Language'
  }, {
    value: 136,
    label: 'Japanese Studies'
  }, {
    value: 137,
    label: 'Jewish Studies'
  }, {
    value: 138,
    label: 'Journalism'
  }, {
    value: 139,
    label: 'Korean Language'
  }, {
    value: 140,
    label: 'Korean Studies'
  }, {
    value: 141,
    label: 'Land Information'
  }, {
    value: 142,
    label: 'Landscaping'
  }, {
    value: 143,
    label: 'Language Studies'
  },
  // {value: 144, label: 'Langues Modernes'},
  {
    value: 145,
    label: 'Latin American Studies'
  }, {
    value: 146,
    label: 'Latin Language'
  }, {
    value: 147,
    label: 'Law'
  }, {
    value: 148,
    label: 'Law-Business'
  }, {
    value: 149,
    label: 'Law-International'
  }, {
    value: 150,
    label: 'Library Studies'
  }, {
    value: 151,
    label: 'Linguistics'
  }, {
    value: 153,
    label: 'Management'
  }, {
    value: 154,
    label: 'Management Information Systems'
  }, {
    value: 155,
    label: 'Manufacturing'
  }, {
    value: 156,
    label: 'Maritime Studies'
  }, {
    value: 157,
    label: 'Marketing'
  }, {
    value: 158,
    label: 'Mathematics'
  }, {
    value: 159,
    label: 'Media Studies'
  }, {
    value: 160,
    label: 'Medical Sciences'
  }, {
    value: 161,
    label: 'Medicine'
  }, {
    value: 162,
    label: 'Meterology'
  }, {
    value: 163,
    label: 'Microbiology'
  }, {
    value: 164,
    label: 'Modern Languages'
  }, {
    value: 165,
    label: 'Molecular Biology'
  }, {
    value: 166,
    label: 'Music'
  },
  // {value: 167, label: 'Musique'},
  {
    value: 168,
    label: 'Native Studies'
  }, {
    value: 169,
    label: 'Neuroscience'
  }, {
    value: 170,
    label: 'Nursing'
  }, {
    value: 171,
    label: 'Nutrition'
  }, {
    value: 172,
    label: 'Occupational Health'
  }, {
    value: 173,
    label: 'Optometry'
  }, {
    value: 174,
    label: 'Parasitology'
  }, {
    value: 175,
    label: 'Pathology'
  }, {
    value: 176,
    label: 'Pharmacology'
  }, {
    value: 177,
    label: 'Pharmacy'
  }, {
    value: 178,
    label: 'Philosophy'
  }, {
    value: 180,
    label: 'Photomedia'
  }, {
    value: 181,
    label: 'Physics'
  }, {
    value: 182,
    label: 'Physiology'
  }, {
    value: 184,
    label: 'Planning'
  }, {
    value: 185,
    label: 'Political Science'
  }, {
    value: 91,
    label: 'Primary Education'
  },
  // {value: 186, label: 'Psychologie'},
  {
    value: 187,
    label: 'Psychology'
  }, {
    value: 188,
    label: 'Public Health'
  }, {
    value: 189,
    label: 'Public Policy and Administration'
  }, {
    value: 190,
    label: 'Public Relations'
  }, {
    value: 191,
    label: 'Quantitative Surveying'
  }, {
    value: 193,
    label: 'Radiation Science'
  }, {
    value: 194,
    label: 'Recreation'
  }, {
    value: 195,
    label: 'Rehabilitation Medicine'
  }, {
    value: 196,
    label: 'Religious Studies'
  }, {
    value: 197,
    label: 'Russian Language'
  }, {
    value: 198,
    label: 'Russian Studies'
  }, {
    value: 222,
    label: 'Sanskrit Language'
  }, {
    value: 199,
    label: 'Scandinavian Languages'
  }, {
    value: 223,
    label: 'Scandinavian Studies'
  },
  // {value: 200, label: 'Science Politique'},
  {
    value: 201,
    label: 'Science and Technology'
  },
  // {value: 202, label: 'Science des Ordinateurs'},
  // {value: 203, label: 'Sciences Politiques'},
  // {value: 204, label: 'Sciences de la Terre'},
  {
    value: 90,
    label: 'Secondary Education'
  }, {
    value: 205,
    label: 'Social Work'
  },
  // {value: 206, label: 'Sociologie'},
  {
    value: 207,
    label: 'Sociology'
  }, {
    value: 208,
    label: 'Soil Science'
  }, {
    value: 209,
    label: 'Spanish Language'
  }, {
    value: 210,
    label: 'Sports Science'
  }, {
    value: 211,
    label: 'Statistics'
  }, {
    value: 212,
    label: 'Studies Science and Technology'
  }, {
    value: 213,
    label: 'Surveying'
  },
  // {value: 214, label: 'Tourism'},
  {
    value: 215,
    label: 'Tourism'
  }, {
    value: 216,
    label: 'Translation'
  }, {
    value: 217,
    label: 'Urdu Language'
  }, {
    value: 218,
    label: 'Veterinary Science and Medicine'
  }, {
    value: 219,
    label: 'Womens Studies'
  }, {
    value: 221,
    label: 'Zoology'
  }];

  function getBackgrounds(arr) {
    // console.log(arr)
    return arr.map((v, i) => {
        return backgroundList.find((o) => o.value === v)?.label
    }).join(", ")
  }
  
const internshipQuestions = [
    "Analyzing data or information",
    "Conducting surveys or administering questionnaires",
    "Conducting interviews",
    "Creating drawings, models, or designs",
    "Gathering information from archives, published works, documents, or recordings",
    "Making observations outside of a laboratory or controlled environment",
    "Performing controlled experiments",
    "Programming, scripting, or coding",
    "Reading research literature",
    "Solving mathematical problems",
    "Using hand or machine tools, laboratory equipment, or scientific instruments",
    "Writing reports",
    "Meeting or discussing with the supervisor",
    "Working on tasks that require teamwork"
]

const keyStrFull = "ProjectID,ProjectTitle,ProjectTitle2,LanguageUsed,projectDescription,projectDescription2,lang1,ResearchAreaDescription,ResearchAreaDescription2,ProjectDescription,ProjectDescription2,StudentRoles,StudentRoles2,StudentSkills,StudentSkills2,StartDate,isStartDateFlexible,NotesOnStartDate,City,Province,PreferredBackgroundCollection,InternshipQ1,InternshipQ2,InternshipQ3,InternshipQ4,InternshipQ5,InternshipQ6,InternshipQ7,InternshipQ8,InternshipQ9,InternshipQ10,InternshipQ11,InternshipQ12,InternshipQ13,InternshipQ14,InternshipQ15,InternshipQ16,Professor.FirstName,Professor.LastName,Professor.FacultyProvince,Professor.UniversityName,Professor.CampusName,Professor.UniversityID,Professor"
const stringArray = keyStrFull.split(",")

export const ProjectDetails = ({projectId}) => {

  const [row, setRow] = useState({});
  useEffect(() => {
    if (projectId && projectId!=="") {
      axios.get(`${BASE_URL}/mitexl-project-details/${projectId}`)
      .then(({data}) => {
        // console.log(data)
        let i = 0;
        let newObj = data.replaceAll('"', "").split(",").reduce((prev, curr) => {
          prev[stringArray[i]] = curr
          i ++;
          return prev
        }, {})
        setRow(newObj)
      }) 
      .catch(console.log)
    }
  }, [projectId])


    let markdownContent;
    if (Object.keys(row).length>0)
    markdownContent = `
# ${row.ProjectTitle}
---
**Project ID:** ${row.ProjectID}

**Language Used:** ${row.LanguageUsed}\\
**City:** ${row.City}
**Province:** ${row.Province}

**Project Title 2:** ${row.ProjectTitle2}

## Project Description
${row.projectDescription.replaceAll("\n", " ")}

## Research Area Description
${row.ResearchAreaDescription}

## Student Roles
${row.StudentRoles}

## Start Date
**Date:** ${row.StartDate}
**Flexible Start Date:** ${row.isStartDateFlexible}
**Notes on Start Date:** ${row.NotesOnStartDate}


## Professor

**First Name:** ${row["Professor.FirstName"]}\\
**Last Name:** ${row["Professor.LastName"]}\\
**Faculty Province:** ${row["Professor.FacultyProvince"]}\\
**University Name:** ${row["Professor.UniversityName"]}\\
**Campus Name:** ${row["Professor.CampusName"]}\\
**University ID:** ${row["Professor.UniversityID"]}


## Preferred Background Collection
${getBackgrounds(JSON.parse(row.PreferredBackgroundCollection.replaceAll(";",',')))}

## Student Skills
${row.StudentSkills}

## Internship Questions

1. ${internshipQuestions[0]}: **${row.InternshipQ1}**
2. ${internshipQuestions[1]}: **${row.InternshipQ2}**
3. ${internshipQuestions[2]}: **${row.InternshipQ3}**
4. ${internshipQuestions[3]}: **${row.InternshipQ4}**
5. ${internshipQuestions[4]}: **${row.InternshipQ5}**
6. ${internshipQuestions[5]}: **${row.InternshipQ6}**
7. ${internshipQuestions[6]}: **${row.InternshipQ7}**
8. ${internshipQuestions[7]}: **${row.InternshipQ8}**
9. ${internshipQuestions[8]}: **${row.InternshipQ9}**
10. ${internshipQuestions[9]}: **${row.InternshipQ10}**
11. ${internshipQuestions[10]}: **${row.InternshipQ11}**
12. ${internshipQuestions[11]}: **${row.InternshipQ12}**
13. ${internshipQuestions[12]}: **${row.InternshipQ13}**
14. ${internshipQuestions[13]}: **${row.InternshipQ14}**

## Project Description 2
${row.ProjectDescription2}

## Research Area Description 2
${row.ResearchAreaDescription2}

## Student Roles 2
${row.StudentRoles2}

## Student Skills 2
${row.StudentSkills2}







`;
    return (
      <div className='markdown min-w-full search-highlight'>
        {Object.keys(row).length>0?<ReactMarkdown >{markdownContent}</ReactMarkdown>:
        <div className='w-full h-full flex justify-center items-center'>
          <CircularProgress/>
        </div>}
      </div>
    );
  }