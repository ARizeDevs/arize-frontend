export const nameValidator = (name  : string) => {
    const error : any = {
        name : ''
    }
    if(!name) error.name = 'Enter your name'
    return error
}

export const surnameValidator = (surname  : string) => {
    const error : any = {
        surname : ''
    }
    if(!surname) error.surname = 'Enter your surname'
    return error
}


export const usernameValidator = (username  : string) => {
    const error : any = {
        username : ''
    }
    if(!username) error.username = 'Enter a username for yourself'
    return error
}


export const birthdayValidator = (birthday  : any) => {
    const error : any = {
        birthday : ''
    }
    if(!birthday) error.birthday = 'Enter your birthday'
    return error
}

export const locationValidator = (location  : string) => {
    const error : any = {
        location : ''
    }
    if(!location) error.location = 'Enter your location'
    return error
}


export const genderValidator = (gender  : {value:string,label:string}) => {
    const gendersList = ['Male','Female','Other']
    const error : any = {
        gender : ''
    }
    if(!gender) error.gender = 'Enter your gender'
    if(!gender.value) error.gender = 'Enter your gender'
    if(!gendersList.includes(gender.value)) error.gender = 'Enter a valid gender'
    return error
}

export const personalInfoValidator = (
    name : string,
    surname : string,
    username : string,
    birthday : any,
    location : string,
    gender : { value : string, label : string },
) => {
    return {
        ...nameValidator(name),
        ...surnameValidator(surname),
        ...usernameValidator(username),
        ...birthdayValidator(birthday),
        ...locationValidator(location),
        ...genderValidator(gender),
    }
}

