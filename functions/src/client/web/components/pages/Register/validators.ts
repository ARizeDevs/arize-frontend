
export const emailValidator = (email : string) => {
    const error : any = {
        email : ''
    }
    if(!email) {
        error.email = 'Enter your email'
    } else {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            error.email = 'Enter a valid email'
        }
    }
    return error
}

export const passwordValidator = (password : string) => {
    const error : any = {
        password : ''
    }
    if(!password) {
        error.password = 'Enter your password'
    } else {
        if(password.length < 8) {
            error.password = 'Password should be 8 characters at least'
        }
    }
    return error
}

export const confirmPasswordValidator = (password : string) => {
    return (confirmPassword : string) => {
        const error : any = {
            confirmPassword : ''
        }
        if(!confirmPassword) {
            error.confirmPassword = 'Enter your password agaian'
        } else {
            if(confirmPassword !== password) {
                error.confirmPassword = 'Password and confirm-password do not match'
            }
        }
        return error
    }
}

export const registerValidator = (email : string, password : string, confirmPassword : string) => {
    return {
        ...emailValidator(email),
        ...passwordValidator(password),
        ...confirmPasswordValidator(confirmPassword)(password)
    }
}