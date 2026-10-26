// ============================================================
// Node.js FILE SYSTEM (fs) module demonstration - separate from
// the main website on purpose.
// Run with:  npm run fsdemo
// It writes a small report file, reads it back, then appends to it.
// ============================================================
const fs = require("fs");
const path = require("path");

const reportPath = path.join(__dirname, "fs-demo-report.txt");

// 1. WRITE - asynchronous fs.writeFile with a callback
fs.writeFile(reportPath, "CSE Department FS Demo\nLine 1: file created\n", (err) => {
  if (err) {
    console.error("Write failed:", err.message);
    return;
  }
  console.log("1) File created.");

  // 2. READ - nested callback (illustrates asynchronous, non-blocking I/O)
  fs.readFile(reportPath, "utf8", (err, data) => {
    if (err) {
      console.error("Read failed:", err.message);
      return;
    }
    console.log("2) File content read:\n---\n" + data.trim() + "\n---");

    // 3. APPEND
    fs.appendFile(reportPath, "Line 2: appended using fs.appendFile\n", (err) => {
      if (err) {
        console.error("Append failed:", err.message);
        return;
      }
      console.log("3) Line appended. Re-read the file to verify.");
      console.log("Report saved at: " + reportPath);
    });
  });
});

// 4. EVENT LOOP demonstration - this runs FIRST even though it is written last,
// because fs operations are asynchronous and the timer is registered immediately.
console.log("0) This line prints first - the event loop does not wait for fs.");
setTimeout(() => {
  console.log("4) This timeout callback runs after the synchronous code (event loop).");
}, 100);
