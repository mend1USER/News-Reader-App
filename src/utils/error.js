const ERROR_MESSAGE = {
    INVALID_LOGIN_CREDENTIALS: 'Неверный Пароль или Логин. Повторите Еще Раз!'
}


export function error(code) {
    return ERROR_MESSAGE[code] ? ERROR_MESSAGE[code] : 'Пройзошла Ошибка...'
}