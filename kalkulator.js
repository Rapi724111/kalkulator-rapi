$(function () {
    let input1 = "";
    let input2 = "";
    let operasiSelected = null;

    function updateTemporer() {
        let tampilan = "";
        if (input1) tampilan += input1;
        if (operasiSelected) tampilan += " " + operasiSelected;
        if (input2) tampilan += " " + input2;

        $("#hasil-temporer").text(tampilan || "...");
    }

    $(".tombol-angka").click(function () {
        let angka = $(this).text();
        
        if (operasiSelected == null) {
            input1 += angka;
            $("#input1").text(input1);
        } else {
            input2 += angka;
            $("#input2").text(input2);
        }
        updateTemporer();
    });

    $(".tombol-operasi").click(function () {
        if (operasiSelected == null) {
            operasiSelected = $(this).text();
            $("#operasi-selected").text(operasiSelected);
            updateTemporer();
        }
    });

    $(".tombol-clear").click(function () {
        input1 = "";
        input2 = "";
        operasiSelected = null;
        $("#input1").text("...");
        $("#input2").text("...");
        $("#operasi-selected").text("...");
        $("#hasil").text("hasil");
        $("#hasil-temporer").text("...");
    });

    // Tombol hapus untuk menghapus karakter terakhir dari input
    $(".tombol-hapus").click(function () {
        if (operasiSelected == null) {
            // Hapus karakter terakhir dari input1
            input1 = input1.slice(0, -1);
            $("#input1").text(input1 || "...");
        } else {
            // Hapus karakter terakhir dari input2
            input2 = input2.slice(0, -1);
            $("#input2").text(input2 || "...");
        }
        updateTemporer();
    });

    $("#btn-hitung").click(function () {
        if (input1 && input2 && operasiSelected) {
            let hasil;
            // Mengganti koma dengan titik untuk parsing angka
            let num1 = parseFloat(input1.replace(',', '.'));
            let num2 = parseFloat(input2.replace(',', '.'));

            switch (operasiSelected) {
                case "+":
                    hasil = num1 + num2;
                    break;
                case "-":
                    hasil = num1 - num2;
                    break;
                case "x":
                    hasil = num1 * num2;
                    break;
                case "/":
                    hasil = num1 / num2;
                    break;
                case "^":
                    hasil = Math.pow(num1, num2);
                    break;
                case "%":
                    hasil = num1 % num2;
                    break;
            }

            $("#hasil").text(hasil);
            $("#hasil-temporer").text("="); // Tampilkan '=' di kolom hasil-temporer
            
            // Reset input tanpa menyimpan hasil ke input1
            input1 = "";
            input2 = "";
            operasiSelected = null;
            $("#input1").text("...");
            $("#input2").text("...");
            $("#operasi-selected").text("...");
        }
    });

    $(".toggle-negatif").click(function () {
        if (operasiSelected == null && input1) {
            input1 = (-parseFloat(input1.replace(',', '.'))).toString().replace('.', ',');
            $("#input1").text(input1);
            updateTemporer();
        } else if (operasiSelected && input2) {
            input2 = (-parseFloat(input2.replace(',', '.'))).toString().replace('.', ',');
            $("#input2").text(input2);
            updateTemporer();
        }
    });

    $(".tombol-faktorial").click(function () {
        if (operasiSelected == null && input1) {
            let num = parseInt(input1);
            if (num >= 0) {
                let hasil = 1;
                for (let i = 2; i <= num; i++) {
                    hasil *= i;
                }
                $("#hasil").text(hasil); // Tampilkan hasil faktorial hanya di kolom hasil
            }
        }
    });

    $(".decimal, .tombol-koma").click(function () {
        // Tombol koma untuk input1
        if (operasiSelected == null) {
            if (!input1.includes(",")) {
                input1 = input1 ? input1 + ',' : '0,';
                $("#input1").text(input1);
            }
        } else {
            // Tombol koma untuk input2
            if (!input2.includes(",")) {
                input2 = input2 ? input2 + ',' : '0,';
                $("#input2").text(input2);
            }
        }
        updateTemporer();
    });
});
