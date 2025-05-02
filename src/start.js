
const { spawn } = require('child_process');
const path = require('path');

// Start the Vite development server
const client = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start the Node.js server
const server = spawn('node', ['backend/index.js'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  client.kill();
  server.kill();
  process.exit();
});

console.log('🚀 Development servers started!');
console.log('📱 Client: http://localhost:5173');
console.log('🖥️ API Server: http://localhost:5000');
