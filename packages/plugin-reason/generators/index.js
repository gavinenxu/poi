const path = require('path')

exports.reason = {
  effects: ['Add bsconfig.json', 'Add `*.bs.js`, `.merlin` to .gitignore'],
  prompts: [
    {
      name: 'sourceDir',
      message: 'The directory where you populate app source files',
      default: './src'
    }
  ],
  npmInstall: true,
  invokeAfterAdd: true,
  async generate({ renderTemplate, appendFile, projectName, pkg }) {
    pkg.devDependencies = Object.assign({}, pkg.devDependencies, {
      'bs-platform': '^4.0.5'
    })
    await renderTemplate(
      path.join(__dirname, 'templates/bsconfig.json'),
      'bsconfig.json',
      {
        projectName
      }
    )
    await appendFile(
      '.gitignore',
      '\n# Ignore the files generated by bucklescript\n*.bs.js\n.merlin\n'
    )
  }
}
