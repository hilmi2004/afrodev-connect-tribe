
const { spawn } = require('child_process');
const path = require('path');

// Start the Vite development server for frontend
const client = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start the Node.js server for backend
const server = spawn('node', ['--loader', 'ts-node/esm', path.join(__dirname, 'server', 'server.ts')], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'development' }
});

// Handle process termination
process.on('SIGINT', () => {
  client.kill();
  server.kill();
  console.log('👋 Development servers stopped');
  process.exit();
});

console.log('🚀 Development servers started!');
console.log('📱 Frontend: http://localhost:5173');
console.log('🖥️ API Server: http://localhost:5000');
