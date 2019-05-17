// Get CPU cores
node -p "os.cpus().length"

// Supported V8 options
node --v8-options | less

// Sleep for 35sec
function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

await sleep(35000);
