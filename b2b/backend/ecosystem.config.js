module.exports = {
  apps: [
    {
      name: "b2b-backend",
      script: "./server.js",
      cwd: "/var/www/html/b2b/backend",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "/var/log/pm2/b2b-backend-error.log",
      out_file: "/var/log/pm2/b2b-backend-out.log",
      log_file: "/var/log/pm2/b2b-backend.log",
      time: true,
    },
  ],
};
