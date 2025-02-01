module.exports = (func) => (req, res, next) => 
     Promise.resolve(func(req, res, next)).catch(next);
//  if i want i will add {} and return 

