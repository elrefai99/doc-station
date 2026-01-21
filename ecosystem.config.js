module.exports = {
     apps: [
          {
               name: 'Doc-Station',
               script: './dist/src/app.js',
               instances: 1,
               exec_mode: 'fork'
          },
          {
               name: 'Doc-Station-Worker',
               script: './dist/src/Queue/worker.js',
               instances: 1,
               exec_mode: 'fork'
          }
     ]
};
