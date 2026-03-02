if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
let scannedData = null;

scanner.render(onScanSuccess);

function onScanSuccess(decodedText) {
    // Check if the QR code matches your static office code
    if (decodedText === "MY_OFFICE_SECRET_CODE") {
        scannedData = decodedText;
        document.getElementById('status').innerText = "QR Verified! Select Action:";
        document.getElementById('btn-in').disabled = false;
        document.getElementById('btn-out').disabled = false;
        
        // Vibrate to give feedback
        navigator.vibrate(100);
    }
}

document.getElementById('btn-in').addEventListener('click', () => logTime('IN'));
document.getElementById('btn-out').addEventListener('click', () => logTime('OUT'));

function logTime(type) {
    const timestamp = new Date().toLocaleString();
    const entry = {
        employeeId: "EMP_123", // This would come from a login session
        type: type,
        time: timestamp
    };

    // For now, we'll log to the screen. 
    // In a real app, you'd use fetch() to send this to your backend database.
    document.getElementById('result-log').innerHTML += `<p>${type} at ${timestamp}</p>`;
    
    // Reset scanner
    alert(`${type} successful!`);
    location.reload(); 
}