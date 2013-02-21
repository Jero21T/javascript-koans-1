var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function (x) { return !x.containsNuts && !_(x.ingredients).any(function(y) { return y == "mushrooms" }) });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1000).filter(function(x) { return (x % 3 === 0 || x % 5 ===0) }).reduce(function(sum, y) { return sum + y });    /* try chaining range() and reduce() */

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var ingredients = _(products).chain()
                                 .map(function(x) { return x.ingredients })
                                 .flatten()
                                 .reduce(function(memo, x) {
                                     memo[x] = (memo[x] || 0) + 1;
                                     return memo;
                                 }, ingredientCount).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should find the largest prime factor of a composite number", function () {
      /* naive algorithm */
      function find_divisors(number) {
          return _.range(Math.ceil(number / 2), 1, -1).filter(function(x) { return number % x === 0 });
      }

      function is_prime(number) {
          return find_divisors(number).length === 0;
      }

      function compute_largest_prime_factor(number) {
          return _(find_divisors(number)).filter(is_prime)[0];
      }

      expect(compute_largest_prime_factor(14)).toBe(7);
      expect(compute_largest_prime_factor(3)).toBe(undefined);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
      var palindrome = 0;
      function is_palindrome(x) {
          str_num = "" + x;
          reversed = str_num.split("").reverse().join("");
          return str_num === reversed;
      }
      for (var i=999; i > 99; i--) {
          for (var j=999; j > 99; j--) {
              var num = i * j;
              if (num < palindrome) {
                  break;
              }
              if (is_palindrome(num)) {
                  palindrome = num;
              }
          }
      }
      expect(palindrome).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      var result = _.range(1, 21).reduce(function (memo, x) { return memo * x });

      expect(result).toBe(2432902008176640000);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
      function diff_sums_squares(x, y) {
          return ((x + y) * (x + y)) - (x * x + y * y);
      }
      expect(diff_sums_squares(5, 10)).toBe(100);
  });

  it("should find the 10001st prime", function () {
      function is_prime(x) {
          /* consider divisors up to the square root of x */
          for (var i = 2; i <= Math.floor(Math.sqrt(x)); i++) {
              if (x % i === 0) {
                  return false;
              }
          }
          return true;
      }
      function find_nth_prime(index) {
          var cur_index = 0;
          var cur_num = 2;
          while (true) {
              if (is_prime(cur_num)) {
                  cur_index++;
                  if (cur_index === index) {
                      return cur_num;
                  }
              }
              cur_num++;
          }
      }

      expect(find_nth_prime(10001)).toBe(104743);
  });
});
