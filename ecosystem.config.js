const date = new Date().toISOString().slice(0, 10);
module.exports = {
    apps: [
      {
        name: "DEV-TOOLS-API",       // Name of your API for reference in PM2
        script: "./index.js",          // Path to the entry point of your Node.js API
        instances: "1",            // Cluster mode: Use all available CPU cores
        exec_mode: "cluster",        // Enables the cluster mode for better performance / [cluster,fork]
        watch: true,                 // Enable watch & restart if any file changes
        ignore_watch: ["node_modules", "logs","storage"], // Ignore files/folders to watch
        env_development : {
            NODE_ENV: "development",   // Environment variables for development
        //   PORT:3000,
        },
        env_production: {
            NODE_ENV: "production",    // Environment variables for production
        //   PORT:3000,
            out_file: `./logs/out-${date}.log`,  // Log standard output with date in filename
            error_file: `./logs/err-${date}.log`,// Log errors with date in filename
            log_date_format: "YYYY-MM-DD HH:mm Z", // Log date format
        },
        max_memory_restart: "1G",    // Restart the app if it uses more than 1GB of RAM
      },
    ],
  
    deploy: {
      production: {
        user: "ssh-user",             // SSH username
        host: ["127.0.0.1"],     // Server IP or domain
        ref: "origin/main",           // Git branch to pull from
        repo: "git@repository-url.git", // Your Git repo
        path: "/var/www/your-api",    // Path to deploy the application
        "post-deploy":
          "npm install && pm2 reload ecosystem.config.js --env production", // Commands to run after deployment
      },
    },
  };
  