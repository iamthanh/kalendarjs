var config = {
  development: {
    database: {
      mongodb: {
        'url' : 'path to your mongodb',
        options: {
          useNewUrlParser: true
        }
      }
    },
    server: {
      host: 'localhost',
      port: 8080
    }
  }
};
module.exports = config;