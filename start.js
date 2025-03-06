const concurrently = require("concurrently");
concurrently(
  [
    { command: "npm run dev -w react", name: "react" },
    { command: "npm run dev -w node", name: "node" },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
);
