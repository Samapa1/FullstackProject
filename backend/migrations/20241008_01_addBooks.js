const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.bulkInsert('books', [{
        author: "Albert Camus",
        title: "The Stranger",
        year: 1942, 
        number_of_books: 3
      }, {
        author: "Mary Shelley",
        title: "Frankenstein",
        year: 1818, 
        number_of_books: 3,
      },
      {
        author: "J.K. Rowling",
        title: "Harry Potter and The Philosopher's Stone",
        year: 1997, 
        number_of_books: 3,
      },
      {
        author: "Franz Kafka",
        title: "The Trial",
        year: 1914, 
        number_of_books: 3,
      },
      {
        author: "Delia Owens",
        title: "Where the Crawdads Sing",
        year: 2018, 
        number_of_books: 3,
      }

      
    ]);    
    
},
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('loans')
        await queryInterface.dropTable('books')
        await queryInterface.dropTable('users')
        
    },
}