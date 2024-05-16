import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";
module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>"],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //   "@testing-library/react/cleanup-after-each",
  //   "@testing-library/jest-dom/extend-expect",
  // ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testEnvironment: "jsdom",
  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
