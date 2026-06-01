const fs = require('fs');

const path = 'd:\\resto\\resto_frontend\\src\\app\\data.ts';
let content = fs.readFileSync(path, 'utf8');

// The file contains:
// export const restaurants = [
//   {
//     "name": ...

// Instead of regex, let's just do a string replacement where we add an "id" field to each restaurant.
// We can match `  {` after `export const restaurants = [` ... wait.
// Let's just fix it at runtime in CustomerHome.tsx and RestaurantDetails.tsx! Or export a mapped version.

