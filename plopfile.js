module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name'
      },
    ],
    actions: [
      { 
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: 'plop-templates/Component/Component.js.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile:
          'plop-templates/Component/Component.module.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/Component/index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/index.js',
        templateFile: 'plop-templates/injectable-index.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/components/index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/components/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });
  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter page name'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.js',
        templateFile: 'plop-templates/Page.js.hbs',
      },
    ],
  });
};