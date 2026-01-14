module.exports = {
     apps: [
          {
               name: 'Doc-Station',
               script: './dist/app.js',
               instances: 1,
               exec_mode: 'fork'
          },
          {
               name: 'Doc-Station-Worker',
               script: './dist/Queue/worker.js',
               instances: 1,
               exec_mode: 'fork'
          }
     ]
};
