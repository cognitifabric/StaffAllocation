module.exports = {
  apps : [{
    script: 'node_modules/next/dist/bin/next',
    watch: '.'
  }],

  deploy : {
    production : {
      key  : 'allocations.pem',
      user : 'ubuntu',
      host : '54.157.228.23',
      ref  : 'origin/main',
      repo : 'git@github.com:codecallogic/StaffAllocation.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
