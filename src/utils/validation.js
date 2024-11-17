const validator = require('validator');

const validateSignup = (req) => {
    const { 
        firstName, 
        lastName, 
        password, 
        email, 
        gender, 
        about, 
        phoneNo, 
        profileImg, 
        age, 
        skills 
    } = req.body;

    // Check for mandatory fields
    if (!firstName || !lastName || !password || !email) {
        throw new Error("All mandatory fields (firstName, lastName, password, email) must be filled.");
    }

    // Validate firstName and lastName length
    if (firstName.length < 2 || firstName.length > 50) {
        throw new Error("First name must be between 2 and 50 characters.");
    }
    if (lastName.length < 2 || lastName.length > 50) {
        throw new Error("Last name must be between 2 and 50 characters.");
    }

    // Validate email
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.");
    }

    // Validate optional fields
    if (gender && !['male', 'female', 'other'].includes(gender.toLowerCase())) {
        throw new Error("Gender must be 'male', 'female', or 'other'.");
    }

    if (about && about.length > 200) {
        throw new Error("About section must not exceed 200 characters.");
    }

    if (phoneNo && !validator.isMobilePhone(phoneNo, 'any')) {
        throw new Error("Invalid phone number.");
    }

    if (profileImg && !validator.isURL(profileImg)) {
        throw new Error("Profile image must be a valid URL.");
    }

    if (age && (isNaN(age) || age < 18 || age > 100)) {
        throw new Error("Age must be a number between 18 and 100.");
    }

    if (skills && (!Array.isArray(skills) || skills.some(skill => typeof skill !== 'string'))) {
        throw new Error("Skills must be an array of strings.");
    }

    if (skills && skills.length > 100) {
        throw new Error("You can add only 100 skills.");
    }
};


const validateEditProfile = async (req) => {
    const { 
        firstName, 
        lastName, 
        password, 
        email, 
        gender, 
        about, 
        phoneNo, 
        profileImg, 
        age, 
        skills 
    } = req.body;

    

    const validation_field = [ "firstName", "lastName", "email", "gender", "about", "skills", "phoneNo", "profileImg", "age"];
    
   const isValidField = Object.keys(req.body).every((key)=>{
         return validation_field.includes(key);
    });

    if(isValidField) {
        if ( firstName && (firstName.length < 2 || firstName.length > 50)) {
            throw new Error("First name must be between 2 and 50 characters.");
        }
        if (lastName && (lastName.length < 2 || lastName.length > 50)) {
            throw new Error("Last name must be between 2 and 50 characters.");
        }
    
        // Validate email
        if (email && !validator.isEmail(email)) {
            throw new Error("Invalid email format.");
        }
    
        // Validate password strength
        if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.");
        }
    
        // Validate optional fields
        if (gender && !['male', 'female', 'other'].includes(gender)) {
            throw new Error("Gender must be 'male', 'female', or 'other'.");
        }
    
        if (about && about.length > 200) {
            throw new Error("About section must not exceed 200 characters.");
        }
    
        if (phoneNo) {
            const strPhoneNo = phoneNo.toString();
            if(!validator.isMobilePhone(strPhoneNo, 'any')) {
                throw new Error("Invalid phone number.");
            }
            
        }
    
        if (profileImg && !validator.isURL(profileImg)) {
            throw new Error("Profile image must be a valid URL.");
        }
    
        if (age && (isNaN(age) || age < 18 || age > 100)) {
            throw new Error("Age must be a number between 18 and 100.");
        }
    
    
        if (skills && skills.length > 100) {
            throw new Error("You can add only 100 skills.");
        }
    } else {
        throw new Error("Invalid field...");
    }
   
}

module.exports = {
    validateSignup,
    validateEditProfile
}