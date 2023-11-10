module.exports = {
  apps : [{
    name: "client",
    script: 'npm start'
  }],

  deploy : {
    production : {
      key  : 'allocations.pem',
      user : 'ubuntu',
      host : '54.82.246.0',
      ref  : 'origin/main',
      repo : 'git@github.com:codecallogic/StaffAllocation.git',
      path : '/home/ubuntu/client',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};

// module.exports = {
//   apps : [{
//     name   : "client",
//     script: 'npm start'
//   }],

//   deploy : {
//     production : {
//       key  : 'allocations.pem',
//       user : 'ubuntu',
//       host : '34.227.152.167',
//       ref  : 'origin/main',
//       repo : 'git@github.com:codecallogic/StaffAllocation.git',
//       path : '/home/ubuntu/client',
//       'pre-deploy-local': '',
//       'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': '',
//       'ssh_options': 'ForwardAgent=yes'
//     }
//   }
// };
