module.exports = {
     apps: [
          {
               name: 'EGYStay',
               script: './dist/app.js',
               instances: 1,
               exec_mode: 'fork'
          },
          {
               name: 'EGYStay-Worker',
               script: './dist/Queue/worker.js',
               instances: 1,
               exec_mode: 'fork'
          }
     ]
};
