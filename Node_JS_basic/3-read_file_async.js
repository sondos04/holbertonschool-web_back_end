const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((content) => {
      const lines = content
        .split('\n')
        .filter((line) => line.trim().length > 0);

      const rows = lines.slice(1); // skip header
      console.log(`Number of students: ${rows.length}`);

      const byField = {};

      rows.forEach((row) => {
        const cols = row.split(',');
        if (cols.length >= 4) {
          const firstName = cols[0].trim();
          const field = cols[3].trim();
          if (!byField[field]) byField[field] = [];
          byField[field].push(firstName);
        }
      });

      Object.keys(byField).sort().forEach((field) => {
        const list = byField[field].join(', ');
        console.log(`Number of students in ${field}: ${byField[field].length}. List: ${list}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
