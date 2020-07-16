const fs = require('fs'),
    http = require('http'),
    ejs = require('ejs'),
    template = fs.readFileSync('./blog.ejs', 'utf8');

function getEntry() {
    const entries = [];
    let entriesRaw = fs.readFileSync('./blog.text', 'utf8').split('---');
    entriesRaw.forEach(entryRaw => {
        const entry = {},
            lines = entryRaw.split('\n');
        lines.forEach(line => {
            if (!line.indexOf('title: ')) {
                entry.title = line.replace('title: ', '');
            } else if (!line.indexOf('date: ')) {
                entry.date = line.replace('date: ', '');
            } else {
                entry.body = entry.body || '';
                entry.body += line;
            }
        })
        entries.push(entry);
    })
    return entries;
}

function blogPage(entries) {
    let output = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>template</title>
    <style>
        .entry_title {
            font-weight: bold;
        }
        .entry_date {
            font-style: italic;
        }
        .entry_body {
            margin-bottom: 1em;
        }
    </style>
</head>
<body>
    `;
    entries.forEach(entry => {
        output += `
        <div class="entry_title">${entry.title}</div>
        <div class="entry_date">${entry.date}</div>
        <div class="entry_body">${entry.body}</div>
        `
    });
    output += `
    </body>
    </html>
    `;
    return output;
}
server = http.createServer((req, res) => {
    const entries = getEntry();
    // const output = blogPage(entries);
    // const template = `<%- entries %>`,
    // entries = `<script>alert(1)</script>`;
    fs.readFile('./blog.ejs', (err, data) => {
        const template = data.toString();
        const cache = false,
            filename = './blog.ejs';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(ejs.render(template, { entries }, { filename, cache }));
    })

});
server.listen(8080);