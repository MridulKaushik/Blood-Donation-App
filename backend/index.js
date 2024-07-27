const app = require("./app");
const dbConnection = require("./utils/db");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
  dbConnection();
});
