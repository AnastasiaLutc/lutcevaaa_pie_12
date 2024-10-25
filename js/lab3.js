function positive_numbers() {
    var numbers = document.getElementById("positive_numbers");
    var rezult = document.getElementById("positive_numbers_rezult");
    let is_number = /(\-?\d+)(\.\d+)?$/;

    if (numbers.value.indexOf('.') == -1 && numbers.value.indexOf(',') == -1) {
        array_numbers = numbers.value.split(' ');
        if (array_numbers.length !== 3) {
            rezult.innerHTML = "Введите ровно три числа";
        }
        for (let i = 0; i < array_numbers.length; i++) {
            if (!is_number.test(array_numbers[i])) return rezult.innerHTML = "Нельзя вводить буквы";
        }
    } else {
        rezult.innerHTML = "Введите целые числа";
    }

    let int_numbers = array_numbers.map(x => parseInt(x));
    rezult.innerHTML = int_numbers.some(n => n > 0) ? 'Хотя бы одно из чисел положительное': 'Все числа отрицательные';
}

function avg_numbers(){
    var numbers = document.getElementById("avg_numbers");
    var rezult = document.getElementById("avg_numbers_rezult");
    let is_number = /(\-?\d+)([.,](\d+))?/;

    if (numbers.value.indexOf(',') == -1) {
        array_numbers = numbers.value.split(' ');
        if (array_numbers.length !== 3 ) {
            rezult.innerHTML = "Введите ровно три числа";
        }
        for (let i = 0; i < array_numbers.length; i++) {
            if (!is_number.test(array_numbers[i])) return rezult.innerHTML = "Нельзя вводить буквы";
        }
    } else {
        return rezult.innerHTML = "Введите числа правильно (дробные через точку)";
    }

    float_numbers = array_numbers.map(x => parseFloat(x));
    let sum = 0; 
    for (let i = 0; i < float_numbers.length; i++) { 
        sum += float_numbers[i];
    }
    rezult.innerHTML = sum / float_numbers.length; 
}

function equation_system() {
    var input_x = document.getElementById("x_for_equation_system");
    var rezult = document.getElementById("equation_system_rezult");
    let is_number = /^\d+(\.\d+)?$/;
    let equation_a = 4.8;
    let equation_b = 0.51;

    if (input_x.value.indexOf(',') != -1 || !is_number.test(input_x.value)) {
        return rezult.innerHTML = "Введите число правильно (дробное через точку) ";
    } 

    float_x = parseFloat(input_x.value);

    if (float_x <= -2) {
        y = Math.log(Math.abs(float_x) + Math.sqrt(equation_a * float_x * float_x + 1));
    } else if (float_x > 5) {
        y = Math.atan(equation_b / (float_x * float_x + 1));
    } else {
        y = Math.sqrt(equation_a * equation_a + float_x * float_x);
    }

    rezult.innerHTML = y;
}