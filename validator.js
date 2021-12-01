function Validator(opitons) {

    // hàm validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(opitons.errorSelector);

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    function getConfirmValue(inputElement, rule) {

    }


    // lấy element của form cần validate
    var formElement = document.querySelector(opitons.form);

    if (formElement) {
        opitons.rule.forEach(function(rule) {

            var inputElement = formElement.querySelector(rule.selector);
            var buttonElement = formElement.querySelector('form-submit');
            if (inputElement) {
                // xử lý trường hợp người dùng blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // xử lý trường hợp người dùng đang nhập dữ liệu vào ô input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(opitons.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
};

// Định nghĩa rules
// Nguyên tắc của các rule:
// 1. Khi hợp lệ => undefined
// 2. Khi không hợp lệ => Nhập đầy đủ tên của bạn

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập đầy đủ tên của bạn!";
        }
    }
};

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : 'Email không hợp lệ';
        }
    }
}

Validator.isPassword = (selector) => {
    return {
        selector: selector,
        test: function(value) {
            let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return regex.test(value) ? undefined : 'Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự in hoa và 1 kí tự đặc biệt!';
        }
    }
}

Validator.passwordConfirmation = function(selector, getConfirmValue) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : 'Mật khẩu nhập lại không đúng';
        }
    }
}