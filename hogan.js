const hogan = require('hogan.js'),
    md = require('github-flavored-markdown'),
    templateSource = `
   {{#markdown}}**Name**: {{name}} {{/markdown}}
    `,
    context = { name: 'cbw', markdown: () => text => md.parse(text) },
    // templateSource = `
    //     {{#message}}
    //     <h1>{{title}}</h1>
    //     <div>{{content}}</div>
    //     {{/message}}
    //     {{^message}}
    //     nothing
    //     {{/message}}`,
    // context = { messages: [{ title: 'hello', content: 'world' }] },
    template = hogan.compile(templateSource);
console.log(template.render(context));