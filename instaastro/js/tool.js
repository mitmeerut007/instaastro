$(document).ready(function () {
    var today = new Date().toISOString().split('T')[0];
    $(".minCurrentDate").attr('max', today);
});

function validatedate(inputText) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
   if(!inputText.match(regEx)) {
        return false;
    } else {
        return true;
    }
}

function getSum(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function getDeathYear(date) {
    let val = getSum(date.getFullYear()) + getSum(date.getMonth()) + getSum(date.getDate());
    let result = new Date().getFullYear() + getSum(val) * 3;
    return result;
}

function validateEmptyDateFormForDeath() {
    var a = document.forms["death-Form"]["inputDOB"].value;
    var b = document.forms["death-Form"]["inputGender"].value;
    var dateFormatCheck = validatedate(a);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("death-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("death-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < a) {
        var y = document.getElementById("death-erm1");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("death-erm1");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (b == "" || b == null) {
        var x = document.getElementById("death-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("death-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function isValidDeathForm() {
    var check = validateEmptyDateFormForDeath();
    if (check) {
        var date = document.forms["death-Form"]["inputDOB"].value;
        let birthday = new Date(date);
        deathyear = getDeathYear(birthday);
        document.getElementById('death-year').innerHTML = deathyear;
        target = $("#custom-death-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}


let glist = {
    Male: 1,
    Female: 2
}
let zlist = {
    Areis: 1,
    Taurus: 2,
    Gemini: 3,
    Cancer: 4,
    Leo: 5,
    Virgo: 6,
    Libra: 7,
    Scorpio: 8,
    Sagittarius: 9,
    Capricorn: 10,
    Aquarius: 11,
    Pisces: 12
}
function getFriendshipScore(name1, name2, gender1, gender2, zodiac1, zodiac2, date1, date2) {
    console.log(name1, name2, gender1, gender2, date1, date2, zodiac1, zodiac2);
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        }
        else if ('friends'.split('').includes(nameA1[i])) {
            score += 10;
        }
        else if (name2.includes(nameA1[i])) {
            score += 15;
        }
        else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        }
        else if ('friends'.split('').includes(nameA2[i])) {
            score += 10;
        }
        else if (name1.includes(nameA2[i])) {
            score += 15;
        }
        else {
            score += 0;
        }
    }
    score = score + SumOnDate(date1) + SumOnDate(date2) + zlist[zodiac1] + zlist[zodiac2] + glist[gender1] + glist[gender2];
    while (score > 100) {
        score = score % 100;
    }
    return score;
}
function SumOnDate(date) {
    let val = getSumForFriendship(date.getFullYear()) + getSumForFriendship(date.getMonth()) + getSumForFriendship(date.getDate());
    let result = getSum(val);
    return result;
}
function getSumForFriendship(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function validateEmptyDateFormForFrienship() {
    var c = document.forms["friendship-Form"]["inputDOB"].value;
    var b = document.forms["friendship-Form"]["inputGender"].value;
    var a = document.forms["friendship-Form"]["inputName"].value;
    var d = document.forms["friendship-Form"]["inputZodiac"].value;
    var g = document.forms["friendship-Form"]["inputFriendDOB"].value;
    var f = document.forms["friendship-Form"]["inputFriendGender"].value;
    var e = document.forms["friendship-Form"]["inputFriendName"].value;
    var h = document.forms["friendship-Form"]["inputFriendZodiac"].value;

    var dateFormatCheck = validatedate(c);
    var dateFormatCheck2 = validatedate(g);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == "" || a == null) {
        var x = document.getElementById("frienship-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == "" || b == null) {
        var x = document.getElementById("frienship-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("frienship-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("frienship-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("frienship-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == "" || d == null) {
        var x = document.getElementById("frienship-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == "" || e == null) {
        var x = document.getElementById("frienship-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == "" || f == null) {
        var x = document.getElementById("frienship-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("frienship-erm7");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("frienship-erm7");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < g) {
        var y = document.getElementById("frienship-erm7");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm7");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (h == "" || h == null) {
        var x = document.getElementById("frienship-erm8");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("frienship-erm8");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function isValidFriendshipForm() {
    var check = validateEmptyDateFormForFrienship();
    if (check) {
        var user_dob = document.forms["friendship-Form"]["inputDOB"].value;
        user_dob = new Date(user_dob);
        var user_gender = document.forms["friendship-Form"]["inputGender"].value;
        var user_name = document.forms["friendship-Form"]["inputName"].value;
        var user_zodiac = document.forms["friendship-Form"]["inputZodiac"].value;
        var friend_dob = document.forms["friendship-Form"]["inputFriendDOB"].value;
        friend_dob = new Date(friend_dob);
        var friend_gender = document.forms["friendship-Form"]["inputFriendGender"].value;
        var friend_name = document.forms["friendship-Form"]["inputFriendName"].value;
        var friend_zodiac = document.forms["friendship-Form"]["inputFriendZodiac"].value;
        score = getFriendshipScore(user_name, friend_name, user_gender, friend_gender, user_zodiac, friend_zodiac, user_dob, friend_dob);
        document.getElementById('friendship-score').innerHTML = score + "%";
        document.getElementById('user-name').innerHTML = user_name;
        document.getElementById('friend-name').innerHTML = friend_name;
        target = $("#custom-friendship-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}
// namamk starts here
function getSumForNamank(n) {
    let sum = 0;
    while (n > 0 || sum > 9) {
        if (n == 0) {
            n = sum;
            sum = 0;
        }
        sum = sum + n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

function getNamankOnDate(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSumForNamank(val);
    return result;
}


// for validating for if there is any empty field
function validateEmptyDateFormForNamank() {
    var a = document.forms["destiny-Form"]["day"].value;
    var b = document.forms["destiny-Form"]["month"].value;
    var c = document.forms["destiny-Form"]["year"].value;
    var x = document.getElementById("destiny-erm4");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("destiny-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("destiny-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("destiny-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    }
    else {
        var x = document.getElementById("destiny-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("destiny-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    }
    else {
        var x = document.getElementById("destiny-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForNamank() {
    var a = document.forms["destiny-Form"]["day"].value;
    var b = document.forms["destiny-Form"]["month"].value;
    var c = document.forms["destiny-Form"]["year"].value;
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("destiny-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("destiny-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidDestinyForm() {
    var check = validateEmptyDateFormForNamank();
    var checkdate = validDateForNamank();
    if (check) {
        var checkdate = validDateForNamank();
        if (checkdate) {
            var a = document.forms["destiny-Form"]["day"].value;
            var b = document.forms["destiny-Form"]["month"].value;
            var c = document.forms["destiny-Form"]["year"].value;
            var result = getNamankOnDate(a, b, c);
            var id = result.toString();
            var d = document.getElementById("destiny-number");
            d.className = "active";
            document.getElementById('destiny-number').innerHTML = result;
            document.getElementById(id).click();
        }
    }
}
//   destiny form validation ends here
//   namank ends here

// sun sign starts here
function validateEmptyDateFormForSunSign() {
    var a = document.forms["sun-sign-Form"]["day"].value;
    var b = document.forms["sun-sign-Form"]["month"].value;
    var c = document.forms["sun-sign-Form"]["year"].value;
    var x = document.getElementById("sun-sign-erm4");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("sun-sign-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("sun-sign-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("sun-sign-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    }
    else {
        var x = document.getElementById("sun-sign-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("sun-sign-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    }
    else {
        var x = document.getElementById("sun-sign-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function validDateForSunSign() {
    var a = document.forms["sun-sign-Form"]["day"].value;
    var b = document.forms["sun-sign-Form"]["month"].value;
    var c = document.forms["sun-sign-Form"]["year"].value;
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("sun-sign-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("sun-sign-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function SunSignCalculator(day, month) {
    let astro_sign = "";
    // checks month and date within the
    // valid range of a specified zodiac
    if (month == 12) {
        if (day < 22)
            astro_sign = "Sagittarius";
        else
            astro_sign = "Capricorn";
    }
    else if (month == 1) {
        if (day < 20)
            astro_sign = "Capricorn";
        else
            astro_sign = "Aquarius";
    }
    else if (month == 2) {
        if (day < 19)
            astro_sign = "Aquarius";
        else
            astro_sign = "Pisces";
    }
    else if (month == 3) {
        if (day < 21)
            astro_sign = "Pisces";
        else
            astro_sign = "Aries";
    }
    else if (month == 4) {
        if (day < 20)
            astro_sign = "Aries";
        else
            astro_sign = "Taurus";
    }
    else if (month == 5) {
        if (day < 21)
            astro_sign = "Taurus";
        else
            astro_sign = "Gemini";
    }
    else if (month == 6) {
        if (day < 21)
            astro_sign = "Gemini";
        else
            astro_sign = "Cancer";
    }
    else if (month == 7) {
        if (day < 23)
            astro_sign = "Cancer";
        else
            astro_sign = "Leo";
    }
    else if (month == 8) {
        if (day < 23)
            astro_sign = "Leo";
        else
            astro_sign = "Virgo";
    }
    else if (month == 9) {
        if (day < 23)
            astro_sign = "Virgo";
        else
            astro_sign = "Libra";
    }
    else if (month == 10) {
        if (day < 23)
            astro_sign = "Libra";
        else
            astro_sign = "Scorpio";
    }
    else if (month == 11) {
        if (day < 22)
            astro_sign = "Scorpio";
        else
            astro_sign = "Sagittarius";
    }
    return astro_sign;
}

function isValidSunSignForm() {
    var check = validateEmptyDateFormForSunSign();
    var checkdate = validDateForSunSign();
    if (check) {
        var checkdate = validDateForSunSign();
        if (checkdate) {
            list = ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio'];
            for (let i = 0; i < list.length; i++) {
                id = list[i];
                var x = document.getElementById(id);
                if (x.style.display === "block") {
                    x.style.display = "none";
                }
            }
            var a = document.forms["sun-sign-Form"]["day"].value;
            var b = document.forms["sun-sign-Form"]["month"].value;
            var c = document.forms["sun-sign-Form"]["year"].value;
            var result = SunSignCalculator(a, b);
            document.getElementById('sun-sign').innerHTML = " " + result;
            var x = document.getElementById(result);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            target = $("#custom-sunsign-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}


// love calculator begins from here
function validateEmptyDateFormForLove(b, c, d, a, e, f, g, h, i, j, k, l) {
    var x = document.getElementById("love-erm11");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (k == null || k == "") {
        var x = document.getElementById("love-gender1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-gender1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (l == null || l == "") {
        var x = document.getElementById("love-gender2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-gender2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (g == null || g == "") {
        var x = document.getElementById("love-erm7");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm7");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (h == null || h == "") {
        var x = document.getElementById("love-erm8");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm8");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (i == null || i == "") {
        var x = document.getElementById("love-erm13");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm9");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else if (i < 0 || i > 100) {
        var x = document.getElementById("love-erm9");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm13");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm9");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm13");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (j == null || j == "") {
        var x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm10");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else if (j < 0 || j > 100) {
        var x = document.getElementById("love-erm10");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm12");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm10");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function validDateForLoveTwins(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm12");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm12");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function validDateForLoveMale(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm11");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function validDateForLoveFemale(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("love-erm11");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("love-erm11");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function getLoveScore(name1, name2, day1, month1, year1, day2, month2, year2, scale1, scale2) {
    let score = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let nameA1 = name1.split('');
    let nameA2 = name2.split('');
    for (let i = 0; i < nameA1.length; i++) {
        if (vowels.includes(nameA1[i])) {
            score += 5;
        }
        else if ('Love'.split('').includes(nameA1[i])) {
            score += 10;
        }
        else if (name2.includes(nameA1[i])) {
            score += 15;
        }
        else {
            score += 0;
        }
    }
    for (let i = 0; i < nameA2.length; i++) {
        if (vowels.includes(nameA2[i])) {
            score += 5;
        }
        else if ('Love'.split('').includes(nameA2[i])) {
            score += 10;
        }
        else if (name1.includes(nameA2[i])) {
            score += 15;
        }
        else {
            score += 0;
        }
    }

    score = score + getSum(day1) + getSum(month1) + getSum(year1) + getSum(day2) + getSum(month2) + getSum(year2) + parseInt(scale1) + parseInt(scale2);
    console.log(score);
    while (score > 100) {
        score = score % 100;
    }
    return score;
}

function isValidLoveForm() {
    var b = document.forms["love-Form"]["male-day"].value;
    var c = document.forms["love-Form"]["male-month"].value;
    var d = document.forms["love-Form"]["male-year"].value;
    var a = document.forms["love-Form"]["inputyourName"].value;
    var e = document.forms["love-Form"]["inputpartnerName"].value;
    var f = document.forms["love-Form"]["female-day"].value;
    var g = document.forms["love-Form"]["female-month"].value;
    var h = document.forms["love-Form"]["female-year"].value;
    var i = document.forms["love-Form"]["inputyourScore"].value;
    var j = document.forms["love-Form"]["inputpartnerScore"].value;
    var k = document.forms["love-Form"]["inputGender"].value;
    var l = document.forms["love-Form"]["partnerGender"].value;
    var check = validateEmptyDateFormForLove(b, c, d, a, e, f, g, h, i, j, k, l);
    var checkdate = validDateForLoveMale(b, c, d);
    checkdate = validDateForLoveFemale(f, g, h);
    if (check) {
        checkdate = validDateForLoveFemale(f, g, h);
        checkdate = validDateForLoveMale(b, c, d);
        if (checkdate) {
            score = getLoveScore(a, e, b, c, d, f, g, h, i, j);
            console.log(score);
            document.getElementById('love-score').innerHTML = score;
            target = $("#custom-love-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

// love Compatibility
function validateEmptyDatecompatForLove(a, b, c, d, e, f) {
    var x = document.getElementById("love-erm11");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var x = document.getElementById("love-erm12");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getloveCompatibility(date1,date2){
    let d1=getSum(date1);
    let d2=getSum(date2);
    let val=Math.abs(d1-d2);
    let score=val*5;
    for(let i=0;i<val;i++){
        score+=5;
    }
    while(score>100){
        score=score%100;
    }
    return score;
}

function isValidLoveCompatibilityForm() {
    var a = document.forms["love-Form"]["day"].value;
    var b = document.forms["love-Form"]["month"].value;
    var c = document.forms["love-Form"]["year"].value;
    var d = document.forms["love-Form"]["normal-girl-day"].value;
    var e = document.forms["love-Form"]["normal-girl-month"].value;
    var f = document.forms["love-Form"]["normal-girl-year"].value;
    var check = validateEmptyDatecompatForLove(a, b, c, d, e, f);
    var checkdate = validDateForLoveMale(a, b, c);
    var girlcheckdate = validDateForLoveTwins(d, e, f);
    if (check) {
        checkdate = validDateForLoveMale(a, b, c);
        girlcheckdate = validDateForLoveTwins(d, e, f);
        if (checkdate && girlcheckdate) {
            score = getloveCompatibility(a, d);
            document.getElementById('love-score').innerHTML = score;
            target = $("#custom-love-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}

function checkEmptyFlameForm(a, b){
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("lucky-color-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function checkEmptyLuckyColorForm(a, b) {
    var dateFormatCheck = validatedate(b);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("lucky-color-erm2");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("lucky-color-erm2");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < b) {
        var y = document.getElementById("lucky-color-erm2");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("lucky-color-erm2");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    return flag;
}
function getLuckyColorCalc(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    switch (result) {
        case 1:
            return {
                'lucky': ['Orange', 'Yellow', 'Gold'],
                'unlucky': ['Black', 'Maroon']
            }
        case 2:
            return {
                'lucky': ['Green', 'Yellow', 'Silver'],
                'unlucky': ['Red', 'Black']
            }
        case 3:
            return {
                'lucky': ['Yellow', 'Orange', 'Pink'],
                'unlucky': ['Black', 'Dark Blue', 'Dark Green']
            }
        case 4:
            return {
                'lucky': ['Blue'],
                'unlucky': ['Black']
            }
        case 5:
            return {
                'lucky': ['Grey'],
                'unlucky': ['Dark Green', ' Black']
            }
        case 6:
            return {
                'lucky': ['Dark Blue', 'Dark Green'],
                'unlucky': ['White', 'Yellow Rose']
            }
        case 7:
            return {
                'lucky': ['Light Green', ' Light Yellow', ' Light Blue'],
                'unlucky': ['Black', 'Red']
            }
        case 8:
            return {
                'lucky': ['Yellow', 'Dark Green', 'Dark Blue'],
                'unlucky': ['Black', 'Red']
            }
        case 9:
            return {
                'lucky': ['Red'],
                'unlucky': ['White']
            }
    }
    return {}
}

function isValidLuckyColorForm() {
    b = document.forms["lucky-color-Form"]["inputDOB"].value;
    a = document.forms["lucky-color-Form"]["inputname"].value;
    check = checkEmptyLuckyColorForm(a, b);
    if (check) {
        b = new Date(b);
        var year = b.getFullYear();
        var month = b.getMonth();
        var day = b.getDay();
        var colors = getLuckyColorCalc(day, month, year);
        var lucky_colors_together = "";
        var unlucky_colors_together = "";
        var lucky_colors = colors['lucky'];
        var unlucky_colors = colors['unlucky'];
        for (let i = 0; i < lucky_colors.length; i++) {
            if (lucky_colors_together === "") {
                lucky_colors_together += lucky_colors[i];
            } else {
     lucky_colors_together = lucky_colors_together + " " + lucky_colors[i];
            }

        }
        for (let i = 0; i < unlucky_colors.length; i++) {
            if(unlucky_colors_together === ""){
                unlucky_colors_together += unlucky_colors[i];
            }else{
    unlucky_colors_together = unlucky_colors_together + " " + unlucky_colors[i];
            }
        }
        console.log(lucky_colors_together);
        console.log(unlucky_colors_together);

        document.getElementById('lucky-colors').innerHTML = lucky_colors_together;
        document.getElementById('unlucky-colors').innerHTML = unlucky_colors_together;
        target = $("#custom-lucky-color-modal").attr('data-target-custom');
        $(target).modal('show');

    }

}
function checkEmptyMarriageForm(a, b, c) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("marriage-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("marriage-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("marriage-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("marriage-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function checkValidDateForMarriage(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("marriage-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("marriage-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getMarriageCalc(date, month, year) {
    // console.log(date.getDate());
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    return result;
}
function getMarriageNumberResult(result){
    switch (result) {
        case 1: return "This is relationship suggests dynamism, enthusiasm and determination between both partners and this will be matched with complete wisdom and understanding. This relationship has been built on a heated passion that will turn into a mutual agreement to leading a responsible life"
        case 2: return "Two is a number of the couple so you will probably discover in time that you match just like puzzle pieces as long as you lean on each other and spend as much time together as possible. However, a number 2 divorce might be under the risk of possesivity and jealousy if the two of you don't know how to balance your impulses. It's also important for you to synchronize your activies or even work in the same domain. This marriage is also based on home comfort and you both have the desire to have a house and a big family."
        case 3: return "The number 3 is representative of communication, general love, and communication with others, but also faith in self, others and the world around you. Congratulations on your marriage!"
        case 4: return "Four is a number of the relationship. It describes equality, balance and fairness. It stands for logic, reason and stability. The number four is usually rational and practical. This combination indicates a stable relationship and enduring love. Their love helps them prosper in life and their partnership is sound due to their mellow temperaments and commitment to each other."
        case 5: return "Two passionate people, both with interests and hobbies that take them far from each other. The ideal companion for those who thrive on change and new encounters. If you like to explore different concepts and cultures, this is the ideal person for you. In marriage based on passion, you can count on your beloved to satisfy all your needs and desires. Until the very end of life, this is your number one choice!"
        case 6: return "The number 6 symbolizes good health, powerful feelings and is usually a lucky number that indicates mutual powerful feelings and love. Whether it be lust or heart-felt love, the number 6 is passionate and romantic. It is also practical and usually works hard to build a family."
        case 7: return "Number 7 relationship partners face their life together with great responsibility and support. These people form a couple based on intellectual affinity and cooperate in good confidence. They may have some moments when they feel stuck but these people often try to maintain their individuality while they build something new together."
        case 8: return "The number eight is the symbol of infinity. It is the ultimate goal for everyone â€“ everlasting and continuous existence. This number is also related to a sense of protection, power and authority. While the number seven is somewhat gloomy, the number eight is optimistic and promising."
        case 9: return "You might have heard that Number 9 is all about Romance. And it is. This number is your relationship number if you are looking for an ideal marriage partner. Number 9's have the ability to express their feelings in a beautiful way and mostly they are known to be philanthropic too."
    }
    return {}
}

function isValidMarriageForm() {
    var a = document.forms["marriage-Form"]["day"].value;
    var b = document.forms["marriage-Form"]["month"].value;
    var c = document.forms["marriage-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getMarriageCalc(a, b, c);
            document.getElementById('marriage-score').innerHTML = score;
            console.log(score);
            document.getElementById('data-result').innerHTML = getMarriageNumberResult(score);
            target = $("#custom-marriage-modal").attr('data-target-custom');
            $(target).modal('show');
        }

    }

}


function checkEmptyLifeNumberForm(a, b, c) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("life-number-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("life-number-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("life-number-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("life-number-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}
function checkValidDateForLifeNumber(a, b, c) {
    var flag = true;
    if (b == 2) {
        if (c % 100 === 0 && c % 400 === 0) {
            if (a > 29) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else if (c % 4 == 0) {
            if (a > 29) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        } else {
            if (a > 28) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    } else {
        if (b == 4 || b == 6 || b == 9 || b == 11) {
            if (a > 30) {
                var x = document.getElementById("life-number-erm4");
                if (x.style.display === "none") {
                    x.style.display = "block";
                }
                flag = false;
            }
        }
    }
    if (flag) {
        var x = document.getElementById("life-number-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLifeNumberCalc(date, month, year) {
    // console.log(date.getDate());
    let val = getSum(date) + getSum(month) + getSum(year);
    let result = getSum(val);
    return result;
}
function getLifePathCalc(date, month, year) {
    let val = getSum(date) + getSum(month) + getSum(year);
    val = getSum(val);
     if(val===2){
        return 11;
     }else if(val === 0){
         return 9;
     }
    return val;

}

function isValidLifeNumberForm() {
    var a = document.forms["life-number-Form"]["day"].value;
    var b = document.forms["life-number-Form"]["month"].value;
    var c = document.forms["life-number-Form"]["year"].value;
    var check = checkEmptyLifeNumberForm(a, b, c);
    var validdate = checkValidDateForLifeNumber(a, b, c);
    if (check) {
        validdate = checkValidDateForLifeNumber(a, b, c);
        if (validdate) {
            var score = getLifePathCalc(a, b, c);
            for(let i = 1; i <= 9; i++){
                 if(i === 2){
                     id = "text-";
                     id = id + "11";
                    var x = document.getElementById(id);
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
                 }else{
                     id = "text-";
                     id = id + i.toString();
                     var x = document.getElementById(id);
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
                 }
            }

            document.getElementById('life-number-score').innerHTML = score;
            id = "text-";
            id = id + score.toString();
            var x = document.getElementById(id);
            console.log(id);
            if (x.style.display === "none") {
                x.style.display = "block";
            }
            target = $("#custom-life-number-modal").attr('data-target-custom');
            $(target).modal('show');
        }

    }

}



/************************************************************************************* */


// boyfriend & grilfriend Calculator begins from here

function getBoyfriendScore(str1,str2,ques1,ques2,yearKnown){    
    let score=0;
    let name1=str1.toLowerCase();
    let name2=str2.toLowerCase();
    let vowels=['a','e','i','o','u'];
    let nameA1=name1.split('');
    let nameA2=name2.split('');
    for(let i=0;i<nameA1.length;i++){
        if(vowels.includes(nameA1[i])){
            score += 5;
        }
        else if('Relationship'.split('').includes(nameA1[i])){
            score += 10;
        }
        else if(name2.includes(nameA1[i])){
            score += 15;
        }
        else{
            score += 0;
        }
    }
    for(let i=0;i<nameA2.length;i++){
        if(vowels.includes(nameA2[i])){
            score += 5;
        }
        else if('Relationship'.split('').includes(nameA2[i])){
            score+=10;
        }
        else if(name1.includes(nameA2[i])){
            score += 15;
        }
        else{
            score += 0;
        }
    }
    score=score+(parseInt(ques1)*3)+(parseInt(ques2)*3)+parseInt(yearKnown);
	while(score>100){
        score= score % 100;
    }
    return score;
}

function isValidBoyfriendForm() {
    var a = document.forms["boyfriend-Form"]["inputName"].value;
    var b = document.forms["boyfriend-Form"]["inputPartnerName"].value;
    var c = document.forms["boyfriend-Form"]["cheatOnPast"].value;
    var d = document.forms["boyfriend-Form"]["loveFirstSight"].value;
    var e = document.forms["boyfriend-Form"]["relationship"].value;
    var check = checkEmptyBreakupForm(a, b, c, d, e);
    if (check) {
            var score = getBoyfriendScore(a, b, c, d, e);
            document.getElementById('person-name-1').innerHTML = a;
            document.getElementById('person-name-2').innerHTML = b;
            document.getElementById('meter-score').innerHTML = score;
            target = $("#custom-boyfriend-modal").attr('data-target-custom');
            $(target).modal('show');

            $(".meter-calculator-value").each(function(){
                var $bar = $(this).find(".bar");
                var $val = $(this).find("#meter-score");
                var perc = parseInt( score, 10);
                $({p:0}).animate({p:perc}, {
                    duration: 2000,
                    easing: "swing",
                    step: function(p) {
                    $bar.css({
                        transform: "rotate("+ (45+(p*1.8)) +"deg)",
                    });
                    $val.text(p|0);
                    }
                });
            });
        }
}



//mionr expression number logic

function isValidMinorExpressionForm(){
    var textValue = document.forms["expression-Form"]["inputName"].value;
    let a = textValue.toLowerCase();
    var check = validateEmptyExpressionForm(a);
    if (check) {
        score = getExpressionScore(a);
        document.getElementById('expression-score').innerHTML = score;
        document.getElementById('data-result').innerHTML = getMinorExpressionNumberResult(score);
        target = $("#custom-expression-modal").attr('data-target-custom');
        $(target).modal('show');
    }
}

//mionr expression result logic

function getMinorExpressionNumberResult(result){
    switch (result) {
        case 1: return "<strong>Always Reliable and Responsible</strong><br/> Do you know how to decode minor expression number 1? The expression number 1 careers demonstrate that it would be brilliant to stick to your schedule and be more consistent. Accordingly, you will consistently be on the right track."
        case 2: return "<strong>Dependable In All Divine Matters</strong><br/> First things first, do you know how to encounter your minor expression number 2? The expression number 2 shows that you love to disconnect from the world's noises to pray and read the scriptures."
        case 3: return "<strong>Often Having a Positive Attitude</strong><br/> What does your minor expression number 3 mean? The expression number 3 numerology indicates that with the work pressures and hustle-bustle of the current world, it is easy to lose track or get despaired. However, allowing an overriding feeling of pessimism will affect your productivity negatively."
        case 4: return "<strong>They Love Cleanliness</strong><br/> What does your minor expression number 4 mean? First, the expression four numerology shows that you will make more significant progress and achievement if you become more organised."
        case 5: return "<strong>Zealous Game Changers</strong><br/> What does minor expression number 5 mean? The expression number 5 numerology indicates that keeping the bigger picture in mind would be excellent as you handle tasks daily. Therefore, the minor number 5 tells you to think about how you would wish your future to look."
        case 6: return "<strong>Easy Rapport with Everyone</strong><br/> What does minor expression number 6 mean? The expression number 6 numerology says that it would be helpful to be more attentive when talking with someone."
        case 7: return "<strong>Deep Logical Understanding</strong><br/> What does minor expression number 7 mean? The seven numerologies indicate that you love staying quiet, reserved, and introverted. You love being alone and like to socialise with a few people or none."
        case 8: return "<strong>Having Big Dreams and Visions</strong><br/> What does your minor expression number 8 mean? It would be excellent to be hardworking and always striving to be more successful. So, the expression number 8 careers say that let your passion for learning and progress be unmatched."
        case 9: return "<strong>Feeling for Others Wants and Needs</strong><br/> How to interpret minor expression number 9? The nine numerologies indicate that it would be excellent if you would strive to improve the livelihood of others as possible."
        case 11: return "<strong>Self-Aware and Alert for Details </strong><br/> How can you decipher minor expression number 11? The expression number 11 states that it would be excellent to give your ears to your gut feeling. Please attend to the voices within yourself. Also, expression 11 urges you to go beyond your worries and insecurities. Gladly embrace your intuition and live a more fulfilling life."
        case 22: return "<strong>A Passionate Self-Starter</strong><br/> How do you interpret minor expression number 22? The expression number 22 careers signal that you need to identify the best ways to advance your interest, studies, or learning. Indeed it would help if you were a proactive go-getter."
    }
    return {}
}


function isValidCareerForm() {
    var a = document.forms["career-Form"]["day"].value;
    var b = document.forms["career-Form"]["month"].value;
    var c = document.forms["career-Form"]["year"].value;
    var check = checkEmptyMarriageForm(a, b, c);
    var validdate = checkValidDateForMarriage(a, b, c);
    if (check) {
        validdate = checkValidDateForMarriage(a, b, c);
        if (validdate) {
            var score = getMarriageCalc(a, b, c);
            document.getElementById('marriage-score').innerHTML = score;
            document.getElementById('data-result').innerHTML = getCareerNumberResult(score);
            target = $("#custom-marriage-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }
}


// Mangal Dosha calculator

function validateEmptyMangalDoshaForm(a, b, c, d, e) {
    var dateFormatCheck = validatedate(c);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("mangal-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("mangal-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("mangal-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("mangal-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("mangal-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("mangal-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("mangal-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("mangal-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function isValidMangalDoshaForm(){
    var a = document.forms["mangal-dosha-Form"]["inputName"].value;
    var b = document.forms["mangal-dosha-Form"]["inputGender"].value;
    var c = document.forms["mangal-dosha-Form"]["inputBirthDate"].value;
    var d = document.forms["mangal-dosha-Form"]["inputBirthTime"].value;
    var e = document.forms["mangal-dosha-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        window.location.href="result/";
    }
}

// Nakshatra Finder Calculator

function isValidNakshatraFinderForm(){
    var a = document.forms["nakshatra-finder-Form"]["inputName"].value;
    var b = document.forms["nakshatra-finder-Form"]["inputGender"].value;
    var c = document.forms["nakshatra-finder-Form"]["inputBirthDate"].value;
    var d = document.forms["nakshatra-finder-Form"]["inputBirthTime"].value;
    var e = document.forms["nakshatra-finder-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        // window.location.href="result/";
        return {
            "name":a,
            "gender":b,
            "dob":c,
            "time":d,
            "place":e
        }
    }
}

// Kaal Sarp Calculator

function isValidKaalSarpForm(){
    var a = document.forms["kaal-sarp-Form"]["inputName"].value;
    var b = document.forms["kaal-sarp-Form"]["inputGender"].value;
    var c = document.forms["kaal-sarp-Form"]["inputBirthDate"].value;
    var d = document.forms["kaal-sarp-Form"]["inputBirthTime"].value;
    var e = document.forms["kaal-sarp-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        return {
            "name":a,
            "gender":b,
            "dob":c,
            "time":d,
            "place":e
        }
    }
}

// Sade Sati Calculator

function isValidSadeSatiForm(){
    var a = document.forms["sade-sati-Form"]["inputName"].value;
    var b = document.forms["sade-sati-Form"]["inputGender"].value;
    var c = document.forms["sade-sati-Form"]["inputBirthDate"].value;
    var d = document.forms["sade-sati-Form"]["inputBirthTime"].value;
    var e = document.forms["sade-sati-Form"]["id_birth_place"].value;
    var check = validateEmptyMangalDoshaForm(a, b, c, d, e);
    if (check) {
        window.location.href="result/";
    }
}

// Maturity Number Calculator begins from here
function getMaturityNumberResult(result){
    switch (result) {
        case 1: return "Number one defines leadership, power and responsibility. This implies that you will have excellent leadership skills and will take responsibility for the work that you will be doing."
        case 2: return "If you have maturity number 2, this depicts that in the later stage of your life, you will develop emotional intelligence and an understanding of nature. One another trait of having this number is that you will have enough time in the later stage of your life to work on your interest and discover your hidden talents."
        case 3: return "Creativity, art, music and spirituality will enter your life if you have maturity number 3. Your life will be happening and productive because your quality of work will be excellent."
        case 4: return "You will spend a lot of time building the life you want. You will show great dedication in your work if you are a person of maturity number 4. Your life will have some setbacks, but you will defeat everything that comes to a stop you, and in the latter part of your life, this will be your strength."
        case 5: return "Gaining experience is an integral part of your life if you are a person of maturity number 5. You will always be a hustler and benefit from this personality. Explore more to gain experience and travel to places that bring peace to your mind."
        case 6: return "In the later stages of life, you will shift your focus toward relationships with your family, friends and partner. You will have to dedicate some time to sorting out your stuff and maintaining a work-life balance if you are a person with maturity number 6."
        case 7: return "You will have strong fundamentals in your early life, but as time passes, you will develop an interest in the spiritual side of life, and you will start figuring out things with a spiritual aspect."
        case 8: return "In the later stage of your life, people with maturity number 8 will have a successful career and will be at their peak. They will work hard and win in every aspect of life."
        case 9: return "You will direct yourself to charity and make donations for the benefit of society."
        case 11: return ""
        case 22: return ""
        case 33: return ""
    }
    return {}
}

function checkEmptyMaturityForm(a, b, c, d) {
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("maturity-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("maturity-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("maturity-erm3");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm3");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("maturity-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("maturity-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    return flag;
}

function getLifePathCalc(date,month,year){
    let val = getNewSum(date)+getNewSum(month)+getNewSum(year);
    let result = getNewSum(val);
    if(result === 2){
        return 11;
    }
    return result;
}

function getExpressionCalc(name){
    let score = 0;
    for (let i = 0; i < name.length; i++) {
      score += dataset[name.charAt(i)];
    }
    let result = getNewSum(score);
    return result;
}

function maturityNumber(name,day,month,year){
    return getNewSum(getExpressionCalc(name) + getLifePathCalc(day,month,year))
}

function isValidMaturityForm() {
    var a = document.forms["maturity-number-form"]["name"].value;
    var b = document.forms["maturity-number-form"]["day"].value;
    var c = document.forms["maturity-number-form"]["month"].value;
    var d = document.forms["maturity-number-form"]["year"].value;
    var check = checkEmptyMaturityForm(a, b, c, d);
    var validdate = checkValidDateForMarriage(b, c, d);
    if (check) {
        validdate = checkValidDateForMarriage(b, c, d);
        if (validdate) {
            var score = maturityNumber(a, b, c, d);
            document.getElementById('maturity-score').innerHTML = score;
            document.getElementById('data-result').innerHTML = getMaturityNumberResult(score);
            target = $("#custom-maturity-modal").attr('data-target-custom');
            $(target).modal('show');
        }
    }

}

// Love Partner Report Calculator

function validateEmptyLovePartnerForm(a, b, c, d, e, f){
    var dateFormatCheck = validatedate(c);
    var dateFormatCheck2 = validatedate(f);
    const todayDate = new Date().toLocaleDateString('af-ZA');
    var flag = true;
    if (a == null || a == "") {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm1");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (b == null || b == "") {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (c == null || c == "") {
        var x = document.getElementById("love-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck === false) {
        var y = document.getElementById("love-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < c) {
        var y = document.getElementById("love-erm3");
        var x = document.getElementById("invalid_date_format");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm3");
        var y = document.getElementById("invalid_date_format");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    if (d == null || d == "") {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm4");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (e == null || e == "") {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm5");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }
    if (f == null || f == "") {
        var x = document.getElementById("love-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (dateFormatCheck2 === false) {
        var y = document.getElementById("love-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else if (todayDate < f) {
        var y = document.getElementById("love-erm6");
        var x = document.getElementById("invalid_date_format2");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
        flag = false;
    } else {
        var x = document.getElementById("love-erm6");
        var y = document.getElementById("invalid_date_format2");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        if (y.style.display === "block") {
            y.style.display = "none";
        }
    }
    return flag;
}

function isValidLovePartnerForm(){
    var a = document.forms["love-partner-Form"]["inputName"].value;
    var b = document.forms["love-partner-Form"]["inputGender"].value;
    var c = document.forms["love-partner-Form"]["inputBirthDate"].value;
    var d = document.forms["love-partner-Form"]["partnerName"].value;
    var e = document.forms["love-partner-Form"]["partnerGender"].value;
    var f = document.forms["love-partner-Form"]["partnerBirthDate"].value;
    var check = validateEmptyLovePartnerForm(a, b, c, d, e, f);
    if (check) {
        window.location.href="result/";
    }
}

