const API_URL = "https://script.google.com/macros/s/AKfycbzX1NvrBNSr61U27iGFpWzDvmQ1Q6opX8bn3ru5nQEqiZMSqqmV1_XuDXJ0fVg4q4PpfQ/exec";

// Scan QR
if (document.getElementById("reader")) {
    function onScanSuccess(decodedText) {
        const salat = document.getElementById("salat").value;
        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ id: decodedText, salat }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("result").innerText = data.message || "Absensi berhasil";
        })
        .catch(err => console.error(err));
    }

    new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }).render(onScanSuccess);
}

// Rekap
function loadRekap() {
    const tanggal = document.getElementById("tanggal").value;
    const salat = document.getElementById("salat").value;
    fetch(`${API_URL}?tanggal=${tanggal}&salat=${salat}`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#rekap-table tbody");
        tbody.innerHTML = "";
        data.forEach(row => {
            tbody.innerHTML += `
                <tr>
                    <td>${row.timestamp}</td>
                    <td>${row.id}</td>
                    <td>${row.nama}</td>
                    <td>${row.kelas}</td>
                    <td>${row.salat}</td>
                    <td>${row.status}</td>
                </tr>
            `;
        });
    });
}