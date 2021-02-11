const request = require("request");

const fetchBreedDescription = function(breedName, callback) {
  request(
    `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      const data = JSON.parse(body);
      // The case where we request a breed from command line that results in an
      // empty array from the website with no value. (So if the breed doesn't
      // exist)
      if (data[0] === undefined) {
        return callback(
          null,
          `No results for the command line argument: ${breedName}\nPlease give a valid 'breed' argument..`
        );
      }
      // If indeed the argument is valid and we receive a result return the
      // callback with the given values.
      return callback(null, data[0].description);
    }
  );
};

module.exports = { fetchBreedDescription };
