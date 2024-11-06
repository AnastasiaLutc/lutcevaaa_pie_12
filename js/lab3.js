function positive_numbers() {
    var a_number = document.getElementById("a_number").value;
    var b_number = document.getElementById("b_number").value;
    var c_number = document.getElementById("c_number").value;
    var rezult = document.getElementById("positive_numbers_rezult");

    if (a_number === '' || b_number === '' || c_number === '') {
        return rezult.innerHTML = "В одном из полей пусто";
    } else {
        a_number = Number(a_number);
        b_number = Number(b_number);
        c_number = Number(c_number);
    }

    if (!isNaN(a_number + b_number + c_number) && Number.isInteger(a_number) && Number.isInteger(b_number) && Number.isInteger(c_number)) {
        if (a_number < 0 && b_number < 0 && c_number < 0) {
            rezult.innerHTML = 'Все числа отрицательные';
        } else {
            rezult.innerHTML = 'Хотя бы одно из чисел положительное';
        }
    } else {
        rezult.innerHTML = "Введите целые числа";
    }
}

function avg_numbers(){
    var a = document.getElementById("a_number_avg").value;
    var b = document.getElementById("b_number_avg").value;
    var c = document.getElementById("c_number_avg").value;
    var rezult = document.getElementById("avg_numbers_rezult");

    if (a === '' || b === '' || c=== '') {
        return rezult.innerHTML = "В одном из полей пусто";
    } else {
        a = Number(a);
        b = Number(b);
        c = Number(c);
    }

    if (!isNaN(a + b + c)) {
        if (((b<=a) && (a<=c))||((b>=a) && (a>=c))){
            rezult.innerHTML = "Среднее из чисел " + a;
        } else if (((a<=b) && (b<=c))||((a>=b) && (b>=c))) {
            rezult.innerHTML = "Среднее из чисел " + b;
        } else {
            rezult.innerHTML = "Среднее из чисел " + c;
        }      
    } else {
        rezult.innerHTML = "Введите числа правильно (дробные через точку) ";
    }
}

function equation_system() {
    var x = document.getElementById("x_for_equation_system").value;
    var rezult = document.getElementById("equation_system_rezult");
    let a = 4.8;
    let b = 0.51;

    if (x === '') {
        return rezult.innerHTML = "В поле пусто";
    } else {
        x = Number(x);
    }   

    if (!isNaN(x)) {
        if (x <= -2) {
            y = Math.log(Math.abs(x) + Math.sqrt(a * x * x + 1));
        } else if (x > 5) {
            y = Math.atan(b / (x * x + 1));
        } else {
            y = Math.sqrt(a * a + x * x);
        }
        rezult.innerHTML = y;
        
    } else {
        rezult.innerHTML = "Введите число правильно (дробное через точку) ";
    }

}