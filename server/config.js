const config = {

    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      port : 3306,
      user: "root",
      password: "sunandplay",
      database: "test",
    },
    listPerPage: 1000,
    
};

module.exports = config;