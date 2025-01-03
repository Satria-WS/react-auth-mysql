import eslintRecommended from 'eslint-config-eslint';  // Import ESLint recommended config
import prettierRecommended from 'eslint-config-prettier';  // Import Prettier config
import prettierPlugin from 'eslint-plugin-prettier';  // Import Prettier plugin

export default [
  // Define the main ESLint rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintRecommended.rules, // Include ESLint's recommended rules
      ...prettierRecommended.rules, // Include Prettier's recommended rules
      "prettier/prettier": "error", // Add your custom rule for Prettier
    },
  },
  // Optionally, define other configurations for specific file types here
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Apply to JavaScript and TypeScript files
    rules: {
      "no-console": "warn", // Example of a custom rule for these files
    }
  }
];