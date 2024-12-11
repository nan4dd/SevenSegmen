// Mapping input biner ke output 7-segment berdasarkan tabel kebenaran
const segmentMap = {
    "0000": [1, 1, 1, 1, 1, 1, 0], // 0
    "0001": [0, 1, 1, 0, 0, 0, 0], // 1
    "0010": [1, 1, 0, 1, 1, 0, 1], // 2
    "0011": [1, 1, 1, 1, 0, 0, 1], // 3
    "0100": [0, 1, 1, 0, 0, 1, 1], // 4
    "0101": [1, 0, 1, 1, 0, 1, 1], // 5
    "0110": [1, 0, 1, 1, 1, 1, 1], // 6
    "0111": [1, 1, 1, 0, 0, 0, 0], // 7
    "1000": [1, 1, 1, 1, 1, 1, 1], // 8
    "1001": [1, 1, 1, 1, 0, 1, 1], // 9
  };
  
  // Fungsi untuk memperbarui tampilan 7-segment berdasarkan input biner
  function updateDisplay(binaryInput) {
    const segments = document.querySelectorAll("svg use");
    const output = segmentMap[binaryInput];
  
    // Perbarui tampilan 7-segment
    segments.forEach((segment, index) => {
      segment.style.fill = output[index] === 1 ? "#ff3366" : "#ffccd9";
    });
  
    // Perbarui tabel kebenaran
    updateTruthTable(binaryInput, output);
  }
  
  // Fungsi untuk memperbarui tabel kebenaran
  function updateTruthTable(binaryInput, output) {
    // Pisahkan input biner menjadi W, X, Y, Z dan perbarui tabel
    const binaryColumns = ["W", "X", "Y", "Z"];
    binaryInput.split("").forEach((bit, index) => {
      document.querySelector(`td[data-col="${binaryColumns[index]}"]`).textContent = bit;
    });
  
    // Perbarui output 7-segment (a-g)
    const segmentColumns = ["a", "b", "c", "d", "e", "f", "g"];
    output.forEach((value, index) => {
      document.querySelector(`td[data-col="${segmentColumns[index]}"]`).textContent = value;
    });
  
    // Perbarui kolom DISPLAY dengan angka yang sesuai
    const displayNumber = getDisplayNumber(binaryInput);
    document.querySelector("td[colspan='2']").textContent = displayNumber;
  }
  
  // Fungsi untuk mendapatkan angka dari input biner
  function getDisplayNumber(binaryInput) {
    const numberMap = {
      "0000": 0,
      "0001": 1,
      "0010": 2,
      "0011": 3,
      "0100": 4,
      "0101": 5,
      "0110": 6,
      "0111": 7,
      "1000": 8,
      "1001": 9,
    };
    return numberMap[binaryInput] !== undefined ? numberMap[binaryInput] : "Invalid";
  }
  
  // Menambahkan event listener pada tombol keypad
  document.querySelectorAll(".keypad button").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      // Pastikan input biner selalu 4-bit dengan menambahkan 0 di depan jika perlu
      const binaryInput = (parseInt(value, 10)).toString(2).padStart(4, "0");
      updateDisplay(binaryInput);
    });
  });