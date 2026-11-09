module.exports = {
  apps: [
    {
      name: 'blog',
      script: '/opt/ai-myhome-blog/start.sh',
      interpreter: 'bash',
      cwd: '/opt/ai-myhome-blog',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      // MinerU 解析文档时内存会冲高；给 Nuxt 设上限，防止拖垮整机
      max_memory_restart: '700M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 3000,
        TZ: 'Asia/Shanghai',
        AGENT_BASE_URL: 'http://127.0.0.1:8000',
        TWIKOO_BACKEND: 'http://127.0.0.1:8080',
      },
    },
  ],
}
