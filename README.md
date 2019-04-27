# TypeScript Bare Bones Template (v1.0) - bdjeffyp

This template consists of a bare bones project that is ready for TypeScript coding right out of the box. The entry point, `index.ts`, consists of simple code that you can erase and add your custom code.

## Why TypeScript?
TypeScript is a "superset" of JavaScript, by using strong typing of variables. When you save your code changes, Webpack starts the TypeScript compiler, which converts the code into JavaScript for the browser to use. If you have an error, such as trying to assign a number into a string variable, the compiler will halt and tell you where the error occurred. This gives you an advantage of avoiding type mismatch issues that JavaScript would ignore!

## Learning TypeScript
Since TypeScript is just an evolved form of JavaScript, there isn't too much more to learn! I do encourage you to gloss over the [TypeScript documentation](https://www.typescriptlang.org/docs/home.html) to learn about the various data types, type conversions, and other TS advantages.

## Linting
This project includes the TSLint module to check code styling. While TSLint is expected to be merged with ESLint sometime this year, I have included it for now. I plan on updating this template once that change occurs. You can check your code in the Terminal window with the command `npm run check:tslint`.
