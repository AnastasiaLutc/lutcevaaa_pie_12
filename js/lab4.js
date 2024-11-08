function count_numbers_in_set() {
    var k_number = document.getElementById("int_K_number").value;
    var rezult = document.getElementById("count_numbers_rezult");
    let k = Number(k_number);

    if (k_number === '' || isNaN(k) || !(k % 1 === 0)) {
        return rezult.innerHTML = "Число не введено или не целое";
    } 

    let count = 0;
    let number;
    let data_set = '';

    while (true) {
        number = parseInt(prompt("Введите целое число (для завершения введите 0):"));
        data_set = data_set.concat(number, " ");
        if (number === 0) {
            break;
        } else if (number < k) {
            count++;
        }
    }

    return rezult.innerHTML = "В наборе данных [" + data_set + "].  " + count + " чисел меньше " + k;
}

function N_summand_rotate() {
    var n_number = document.getElementById("int_N_number").value;
    var rezult = document.getElementById("N_summand_rezult");
    let n = Number(n_number);

    if (n_number === '' || isNaN(n) || !(n % 1 === 0) || (n < 0)) {
        return rezult.innerHTML = "Число не введено или не целое или отрицательное";
    } 

    let summand_rotate = 0
    for (let i = 1; i <= n; i+=2) {
        summand_rotate += 1 + i/10
    }
    for (let j = 2; j <= n; j+=2) {
        summand_rotate -= 1 + j/10
    }
    rezult.innerHTML = "Сумма знакочередующегося ряда = " + summand_rotate.toFixed(1);
}