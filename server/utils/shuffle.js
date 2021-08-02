/**
 * Welcome to the bonus round. 
 * We need our options to be shuffled before
 * we send it to our users. Create a function that
 * will take in an array and shuffle the order of that
 * array.
 */

/**
 * Shuffles an array in place
 * @param {Array} array original array 
 * @returns {Array} shuffled array
 */
 function shuffleArray(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    //  math functions return an integer from 0 to m-1
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = shuffleArray