module.exports = {
  apps: [
    {
      name: "temanbeli-backend",
      script: "./index.js",

      // Mengaktifkan autorestart (otomatis retry/reboot jika aplikasi crash/down)
      autorestart: true,

      // Menunggu sesaat dengan delay eksponensial jika crash berturut-turut
      // agar tidak menghabisi CPU server
      exp_backoff_restart_delay: 100,

      // Batas memori yang cukup lega untuk Node.js Express (512MB)
      // Jika melampaui ini, PM2 akan otomatis melakukan soft-restart
      max_memory_restart: "512M",


      // Environment khusus saat dijalankan oleh PM2
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};
