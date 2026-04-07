const http = require('http');
const fs = require('fs').promises;

const database = process.argv[2];

/**
 * Helper function to count students asynchronously and return a string
 */
function getStudentsInfo(path) {
  return fs.readFile(path, 'utf8')
    .then((content) => {
      const lines = content
        .split('\n')
        .filter((line) => line.trim() !== '');
      const rows = lines.slice(1); // skip header

      let output = `Number of students: ${rows.length}\n`;

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
        output += `Number of students in ${field}: ${byField[field].length}. List: ${byField[field].join(', ')}\n`;
      });

      return output;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    getStudentsInfo(database)
      .then((info) => {
        res.end(info);
      })
      .catch((err) => {
        res.end(err.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
