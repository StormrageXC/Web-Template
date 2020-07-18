const pug = require('pug'),
    fs = require('fs'),
    // template = `a(href = url) #{title}`,
    // context = { url: 'http://baidu.com', title: 'Baidu' },
    template = fs.readFileSync('./templates/page.pug'),
    context = { messages: [{ name: 'hello' }, { name: 'hi' }] },
    fn = pug.compile(template, { filename: './templates/page.pug' });
console.log(fn(context));