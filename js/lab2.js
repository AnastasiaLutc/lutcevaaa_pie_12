function area_of_circle() {
    let R1 = parseFloat(prompt("Введите R1. Учтите, что R1 > R2", ));
    let R2 = parseFloat(prompt("Введите R2. Учтите, что R1 > R2", ));
    
    if ((R1>R2)&&(R2>0)) {
        let S1 = 3.14 * R1 * R1;
        let S2 = 3.14 * R2 * R2;
        let S3 = S1 - S2;
        let rezult = 'Площадь S1 = ' + S1 + '\n' + 'Площадь S2 = ' + S2 + '\n' + 'Площадь S3 = ' + S3;
        alert(rezult);
    } else {
        alert('Введите числа заново. R1 должен быть больше R2');
    }
}

function transposition() {
    let number = prompt("Введите трехзначное число", );
    
    if (number.length == 3) {
        rezult = number[1] + number[2] + number[0];
        if (rezult[0]==0){
            rezult = number[2] + number[0];
        }
        alert('Число  ' + number + '  после перестановки ' + rezult);
    } else {
        alert('Ошибка. Введите трехзначное число.');
    }
}