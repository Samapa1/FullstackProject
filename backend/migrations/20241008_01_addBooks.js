const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.bulkInsert('books', [{
        author: "Albert Camus",
        title: "The Stranger",
        year: 1942, 
        language: "english",
        class: "84.2",
        genre: "novels, classics",
        number_of_books: 3
      }, {
        author: "Mary Shelley",
        title: "Frankenstein",
        year: 1960, 
        language: "english",
        class: "84.2",
        genre: "novels, classics",
        number_of_books: 3,
      },
      {
        author: "Franz Kafka",
        title: "The Trial",
        year: 1914, 
        language: "english",
        class: "84.2",
        genre: "novels, classics",
        number_of_books: 3,
      },
      {
        author: "Emily Brontë", 
        title: "Wuthering Heights",
        language: "english",
        year: 1977, 
        class: "84.2",
        genre: "novels, classics",
        number_of_books: 1
      },
      {
        author: "Miguel de Cervantes", 
        title: "Don Quijote",
        language: "english",
        year: 1980, 
        class: "84.2",
        genre: "novels, classics",
        number_of_books: 1
      },
      {
        author: "S.T. Davids",
        title: "Tales of The Reindeer 1",
        year: 1998, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 3,
      },
      {
        author: "S.T. Davids",
        title: "Tales of The Reindeer 2",
        year: 1999, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 3,
      },
      {
        author: "S.T. Davids",
        title: "Tales of The Reindeer 3",
        year: 2001, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 4,
      },
      {
        author: "S.T. Davids",
        title: "Tales of The Reindeer 4",
        year: 2002, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 4,
      },
      {
        author: "S.T. Davids",
        title: "Tales of The Reindeer 5",
        year: 2003, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 4,
      },
      {
        author: "Ann McKensie", 
        title: "Christmas Tales",
        year: 2022, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 2
      },
      {
        author: "Ann McKensie", 
        title: "Christmas Tales 2",
        year: 2023, 
        language: "english",
        class: "85",
        genre: "tales",
        number_of_books: 2
      },
      {
        author: "Anna Mäkelä", 
        title: "Tyttö ja koira",
        year: 2022, 
        language: "finnish",
        class: "85",
        genre: "tales",
        number_of_books: 2
      },
      {
        author: "Anna Mäkelä", 
        title: "Varjot",
        year: 2023, 
        language: "finnish",
        class: "84.2",
        genre: "novels",
        number_of_books: 1
      },
      {
        author: "Martti Järvinen", 
        title: "Chemistry 1",
        year: 2023, 
        language: "english",
        class: "5",
        subjects: "chemistry, physical chemistry, chemical reactions",
        number_of_books: 5
      },
      {
        author: "Martti Järvinen", 
        title: "Chemistry 2",
        year: 2024, 
        language: "english",
        class: "5",
        subjects: "chemistry, analytical chemistry, chemical reactions",
        number_of_books: 5
      },
      {
        author: "Martti Järvinen", 
        title: "Introduction to Computer Science 1",
        year: 2010, 
        language: "english",
        class: "6",
        subjects: "Computer Science, Programming, Python, Java",
        number_of_books: 6
      },
      {
        author: "Martti Järvinen", 
        title: "Introduction to Computer Science 2",
        year: 2012, 
        language: "english",
        class: "6",
        subjects: "Computer Science, Programming, JavaScript, TypeScript",
        number_of_books: 6
      },
      {
        author: "Martti Järvinen", 
        title: "Physics 1",
        year: 2006, 
        language: "english",
        class: "5",
        subjects: "Physics",
        number_of_books: 5
      },
      {
        author: "Martti Järvinen", 
        title: "Physics 2",
        year: 2006, 
        language: "english",
        class: "5",
        subjects: "Physics",
        number_of_books: 5
      },
      {
        author: "Ian McKensie", 
        title: "Mathematics",
        year: 2022, 
        language: "english",
        class: "5",
        subjects: "mathematics, matrices",
        number_of_books: 2
      },
      {
        author: "Riitta Tappurainen", 
        title: "Häivähdys",
        year: 2021, 
        language: "finnish",
        class: "84.2",
        genre: "novels",
        number_of_books: 1
      },
      {
        author: "Riitta Tappurainen", 
        title: "Jää",
        year: 2001, 
        language: "finnish",
        class: "84.2",
        genre: "novels",
        number_of_books: 1
      },
      {
        author: "Riitta Tappurainen", 
        title: "Kadoksissa",
        year: 2005, 
        language: "finnish",
        class: "84.2",
        genre: "novels",
        number_of_books: 1
      },
      {
        author: "Lily McDonald", 
        title: "One Day in Paris",
        year: 2016, 
        language: "english",
        class: "84.2",
        genre: "novels",
        number_of_books: 1
      },
      {
        author: "Lily McDonald", 
        title: "Night train",
        year: 2017, 
        language: "english",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 1
      },
      {
        author: "Laura Simmons", 
        title: "Flowers",
        year: 2001, 
        language: "english",
        class: "84.2",
        genre: "poems",
        number_of_books: 2
      },
      {
        author: "Laura Simmons", 
        title: "Old days",
        year: 2002, 
        language: "english",
        class: "84.2",
        genre: "poems",
        number_of_books: 2
      },
      {
        author: "Lily McDonald", 
        title: "Village murders",
        year: 2009, 
        language: "english",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 4
      },
      {
        author: "Ville Vainikkala", 
        title: "Kohde",
        year: 2023, 
        language: "finnish",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 2
      },
      {
        author: "Ville Vainikkala", 
        title: "Hautausmaalla",
        year: 2022, 
        language: "finnish",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 1
      },
      {
        author: "Ian McKensie", 
        title: "Python for Beginners",
        year: 2022, 
        language: "english",
        class: "5",
        subjects: "Python, Computer Science",
        number_of_books: 2
      },
      {
        author: "Ian McKensie", 
        title: "JavaScript for Beginners",
        year: 2023, 
        language: "english",
        class: "5",
        subjects: "JavaScript, Computer Science",
        number_of_books: 4
      },
      {
        author: "Ian McKensie", 
        title: "C++",
        year: 2024, 
        language: "english",
        class: "5",
        subjects: "C++, Games, Computer Science",
        number_of_books: 2
      },
      {
        author: "Ian McKensie", 
        title: "Scala For Beginners",
        year: 2022, 
        language: "english",
        class: "5",
        subjects: "Scala, Computer Science",
        number_of_books: 4
      },
      {
        author: "Ian McKensie", 
        title: "Full Stack Development 1",
        year: 2023, 
        language: "english",
        class: "5",
        subjects: "Fullstack, JavaScript, Computer Science",
        number_of_books: 6
      },
      {
        author: "Ian McKensie", 
        title: "Full Stack Development 2",
        year: 2024, 
        language: "english",
        class: "5",
        subjects: "Fullstack, JavaScript, TypeScript, Docker, Computer Science",
        number_of_books: 6
      },
      {
        author: "Anna Mäkelä", 
        title: "Tyttö ja lehmä",
        year: 2016, 
        language: "finnish",
        class: "85",
        genre: "tales",
        number_of_books: 1
      },
      {
        author: "Anna Mäkelä", 
        title: "Tytön ja lehmän joulu",
        year: 2017, 
        language: "finnish",
        class: "85",
        genre: "tales",
        number_of_books: 2
      },
      {
        author: "Anna Mäkelä", 
        title: "Tyttö ja koira telttailemassa",
        year: 2018, 
        language: "finnish",
        class: "85",
        genre: "tales",
        number_of_books: 5
      },
      {
        author: "Liina Loikkanen", 
        title: "Neulomisopas",
        year: 2016, 
        language: "finnish",
        class: "7",
        subjects: "neulominen, villasukat, käsityöt",
        number_of_books: 4
      },
      {
        author: "Liina Loikkanen", 
        title: "Virkkaussopas",
        year: 2011, 
        language: "finnish",
        class: "7",
        subjects: "virkkaus, käsityöt",
        number_of_books: 2
      },
      {
        author: "Liina Loikkanen", 
        title: "Norjalaiset villapaidat - opas aloittelijoille",
        year: 2017, 
        language: "finnish",
        class: "7",
        subjects: "neulominen, villapaidat, käsityöt",
        number_of_books: 4
      },
      {
        author: "Lindsay Simmons", 
        title: "Murder in London",
        year: 2024, 
        language: "english",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 4
      },
      {
        author: "Lindsay Simmons", 
        title: "The Runners",
        year: 2022, 
        language: "english",
        class: "84.2",
        genre: "novels, thrillers",
        number_of_books: 4
      },
      {
        author: "Ian McKensie", 
        title: "Secrets of AI",
        year: 2024, 
        language: "english",
        class: "5",
        subjects: "Artificial intellingence, programming",
        number_of_books: 7
      },
      {
        author: "Ian McKensie", 
        title: "Containers",
        year: 2020, 
        language: "english",
        class: "5",
        subjects: "Containers, Docker, programming",
        number_of_books: 3
      },
      {
        author: "Tom Stanley", 
        title: "Project Management",
        year: 2006, 
        language: "english",
        class: "6",
        subjects: "Project Management, Consulting, Techology Companies",
        number_of_books: 5
      },
      {
        author: "Tom Stanley", 
        title: "Leadership",
        year: 2008, 
        language: "english",
        class: "6",
        subjects: "Leadership, Consulting, Techology Companies",
        number_of_books: 5
      },
      {
        author: "Tom Stanley", 
        title: "Leadership and communication",
        year: 2009, 
        language: "english",
        class: "6",
        subjects: "Leadership, Communication, Consulting, Techology Companies",
        number_of_books: 4
      },
    ]);    
    
},
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('loans')
        await queryInterface.dropTable('books')
        await queryInterface.dropTable('users')
        
    },
}