const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "prisma", ".env");
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, 'DATABASE_URL="file:./dev.db"\n');
}
