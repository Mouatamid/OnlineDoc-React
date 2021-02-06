export function validateLoginForm(form){
    let invalid = [];
    invalid.push({
        key: "username",
        message: !/^([A-Za-z]+)(\w\.?)*(\w+)@\w+\.\w+$/.test(form.username) ? "Email format is invalid" : "",
        invalid: !/^([A-Za-z]+)(\w\.?)*(\w+)@\w+\.\w+$/.test(form.username)
    });

    invalid.push({
        key: "password",
        message: (form.password.length === 0) ? "Password cannot be empty" : "",
        invalid: (form.password.length === 0)
    })
    
    return invalid;
}

export function validateRegisterFormLoginInfo(form){
    let validation = [];
    validation.push({
        key: "username",
        message: !/^([A-Za-z]+)(\w\.?)*(\w+)@\w+\.\w+$/.test(form.username) ? "Email format is invalid" : "",
        invalid: !/^([A-Za-z]+)(\w\.?)*(\w+)@\w+\.\w+$/.test(form.username)
    });
    
    validation.push({
        key: "password",
        message: !/^.{6,}$/.test(form.password) ? "Password should be 6 characters at least" : "",
        invalid: !/^.{6,}$/.test(form.password)
    });

    validation.push({
        key: "confirmPassword",
        message: (form.password !== form.confirmPassword) ? "Password confirmation doesn't match" : "",
        invalid: (form.password !== form.confirmPassword)
    });
    
    return validation;
}

export function validateRegisterFormPersonalInfo(form){
    let validation = [];

    validation.push({
        key: "firstname",
        message: (form.firstname.length === 0) ? "Firstname is required" : "",
        invalid: (form.firstname.length === 0)
    });

    validation.push({
        key: "lastname",
        message: (form.lastname.length === 0) ? "Lastname is required" : "",
        invalid: (form.lastname.length === 0)
    });
    
    validation.push({
        key: "address",
        message: (form.address.length === 0) ? "Address is required" : "",
        invalid: (form.address.length === 0)
    });
    
    validation.push({
        key: "city",
        message: (parseInt(form.city) === 0) ? "City is required" : "",
        invalid: (parseInt(form.city) === 0)
    });
    
    validation.push({
        key: "phone",
        message: (!/^\d{9,10}$/.test(form.phone)) ? "Phone is invalid" : "",
        invalid: (!/^\d{9,10}$/.test(form.phone))
    });
    
    return validation;
}

export function validateRegisterFormSocialMedia(form){
    let validation = [];
    validation.push({
        key: "whatsapp",
        message: (!/\d{9,10}/.test(form.whatsapp)) ? "Whatsapp is invalid" : "",
        invalid: (!/\d{9,10}/.test(form.whatsapp))
    })
    
    return validation;
}

export function validateRegisterFormEducation(form){
    let invalid = [];
    invalid.push({
        key: "degree",
        message: (form.degree.length === 0) ? "Degree is required" : "",
        invalid: (form.degree.length === 0)
    });
    
    invalid.push({
        key: "university",
        message: (form.university.length === 0) ? "University or school is required" : "",
        invalid: (form.university.length === 0)
    });
    
    invalid.push({
        key: "graduationDate",
        message: !/^\d{4}-\d{2}-\d{2}$/.test(form.graduationDate) ? "Graduation date is required" : "",
        invalid: !/^\d{4}-\d{2}-\d{2}$/.test(form.graduationDate)
    });
    
    return invalid;
}

export function validateRegisterFormProfession(form){
    let invalid = [];

    invalid.push({
        key: "specialty",
        message: (parseInt(form.specialty) === 0) ? "Specialty is required" : "",
        invalid: (parseInt(form.specialty) === 0)
    });
    
    invalid.push({
        key: "pricing",
        message: (form.pricing.length === 0) ? "Appointment pricing is required" : "",
        invalid: (form.pricing.length === 0)
    })
    
    return invalid;
}