const Configuration = {
  ignorePatterns: [".commitlintrc.ts"],
  extends: ["@commitlint/cli", "@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2, // Level: error (2), warning (1), or disabled (0)
      "always",
      [
        "feat", // Feature addition
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code formatting (non-functional changes)
        "refactor", // Code refactoring
        "test", // Adding or updating tests
        "build",
        "ci",
        "chore", // Miscellaneous tasks
        "revert",
      ],
    ],
    "subject-case": [
      2,
      "always",
      ["sentence-case", "start-case", "lower-case"], // Allowed cases
    ],
  },
};

export default Configuration;
