export const registrationFieldsValidate = (
  firstName,
  lastName,
  middleName,
  mobileNumber,
  email,
  password,
  dob,
  gender,
  education,
  additionalSkills,
  address,
  choiceOfWorkArea
) => {
  const errorMessages = {
    firstName: validateName(firstName, "first"),
    lastName: validateName(lastName, "last"),
    middleName: validateName(middleName, "middle"),
    mobileNumber: validateMobileNumber(mobileNumber),
    email: validateEmail(email),
    password: validatePassword(password),
    dob: validateDateOfBirth(dob),
    gender: validateGender(gender),
    education: validateEducation(education),
    additionalSkills: validateAdditionalSkills(additionalSkills),
    address: validateAddress(address),
    choiceOfWorkArea: validateWorkOfChoiseArea(choiceOfWorkArea),
  };

  if (errorMessages.firstName !== null) return errorMessages.firstName;
  if (errorMessages.lastName !== null) return errorMessages.lastName;
  if (errorMessages.middleName !== null) return errorMessages.middleName;
  if (errorMessages.mobileNumber !== null) return errorMessages.mobileNumber;
  if (errorMessages.email !== null) return errorMessages.email;
  if (errorMessages.password !== null) return errorMessages.password;
  if (errorMessages.dob !== null) return errorMessages.dob;
  if (errorMessages.gender !== null) return errorMessages.gender;
  if (errorMessages.education !== null) return errorMessages.education;
  if (errorMessages.additionalSkills !== null)
    return errorMessages.additionalSkills;
  if (errorMessages.address !== null) return errorMessages.address;
  if (errorMessages.choiceOfWorkArea !== null)
    return errorMessages.choiceOfWorkArea;
  return null;
};

export function validateName(name, type) {
  if (type === "middle") {
    if (name.length > 20)
      return `${type} Name should be between 1 to 20 characters`;
  } else {
    if (name.includes(" ")) return type + "Name shouldn't contain empty space";
    if (!name || name.trim().length === 0)
      return type + "Name shouldn't be empty";
    if (!/^[a-zA-Z]+$/.test(name))
      return type + "Name should contain only alphabets";
    if (!/[a-zA-Z]/.test(name[0]))
      return "First character of name should be alphabet";
    if (name.includes("  "))
      return type + "Name shouldn't contain consecutive spaces";
    if (!/[a-zA-Z]$/.test(name))
      return "Last character of name should be alphabet";
    if (/[0-9]/.test(name)) return type + "Name shouldn't contain numbers";
    if (/[!@#$%^&*(),.?":{}|<>]/.test(name))
      return type + "Name shouldn't contain special characters";
  }
  return null;
}
export function validateMobileNumber(mobileNumber) {
  if (!mobileNumber || mobileNumber.trim().length === 0)
    return "Mobile number shouldn't be empty";
  if (mobileNumber.includes(" "))
    return "Mobile number should not contain any space";
  if (mobileNumber.length != 10) return "Mobile number should be of 10 digits";
  if (!/^[0-9]+$/.test(mobileNumber))
    return "Mobile number should contain only numbers";
  if (mobileNumber.startsWith("0"))
    return "Mobile number shouldn't start with 0";
  return null;
}
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const ipRegex =
    /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,}|(\.\d{1,3}){3})$/;

  if (!email || email.trim().length === 0) return "Email shouldn't be empty";

  const parts = email.split("@");
  if (parts.length !== 2)
    return "Email should contain exactly one '@' character";

  const localPart = parts[0];
  const domainPart = parts[1];

  if (!localPart || localPart.length > 64)
    return "Email should be between 1 to 64 characters";
  if (localPart.endsWith(".") || localPart.startsWith("."))
    return "Email shouldn't start or end with a dot";
  if (/\.{2,}/.test(localPart)) return "Email shouldn't have consecutive dots";
  if (!ipRegex.test(domainPart)) return "Email domain should be valid";
  if (!emailRegex.test(email)) return "Email should be valid";
  if (
    !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
      email
    )
  )
    return "Email should be valid";
  return null;
}
export function validatePassword(password) {
  const passwordPattern = /^[a-zA-Z0-9\W_]+$/;
  if (!password || password.trim().length === 0)
    return "Password shouldn't be empty";
  if (password.trim().length < 5 || password.trim().length > 15)
    return "Password should be between 5 to 15 characters";
  if (!passwordPattern.test(password))
    return "Password should contain Alphabets, Numbers and excluding(#%^&) special character";
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/.test(
      password
    )
  ) {
    return "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character";
  }
  return null;
}
export function validateDateOfBirth(dob) {
  const { date } = dob;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-]\d{4}$/;
  const daysInMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  const separator = date.indexOf("/") > -1 ? "/" : "-";
  const [day, month, year] = date
    .split(separator)
    .map((part) => parseInt(part, 10));
  if (month == 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    daysInMonth[2] = isLeapYear ? 29 : 28;
  }

  if (!date || date.trim().length === 0)
    return "Date of birth shouldn't be empty";
  if (!regex.test(date))
    return "Date of birth should be in the format of DD-MM-YYYY or DD/MM/YYYY";
  if (day < 1 || day > 31) return "Invalid Day value of date of birth";
  if (month < 1 || month > 12) return "Invalid Month value of date of birth";
  if (day > daysInMonth[month]) return "Invalid date of birth";

  return null;
}
export function validateGender(gender) {
  if (!gender || gender.trim().length === 0) return "Gender shouldn't be empty";
  if (!/^(male|female|other)$/.test(gender))
    return "Gender should be either male, female or other";
  return null;
}
export function validateEducation(education) {
  if (Array.isArray(education)) {
    if (education.length === 0) return "education data shouldn't be empty";
    const isEmptyDegree = education.findIndex(
      (edu) =>
        !edu.degreeType ||
        edu.degreeType.trim().length == 0 ||
        !edu.courseType ||
        edu.courseType.trim().length == 0
    );
    if (isEmptyDegree != -1) return "Degree or Corse type shouldn't be empty";
    else return null;
  } else return "education data should be in format of array";
}
export function validateAdditionalSkills(additionalSkills) {
  if (!additionalSkills || additionalSkills.trim().length === 0) return null;
  if (additionalSkills.split(",").length > 3)
    return "Maximum 3 Additional skills allowed";
  if (!/^[a-zA-Z,]+$/.test(additionalSkills))
    return "Additional skills should contain only alphabets and commas";
  return null;
}
export function validateAddress(address) {
  const { street, house, nearBy, state, city, pinCode } = address;
  if (!address) return "Address shouldn't be empty";
  if (!street || street.trim().length === 0) return "street shouldn't be empty";
  if (!state || state.trim().length === 0) return "State shouldn't be empty";
  if (!city || city.trim().length === 0) return "City shouldn't be empty";
  if (!pinCode || pinCode.trim().length === 0)
    return "pinCode shouldn't be empty";
  if (pinCode.includes(" ")) return "pinCode shouldn't contain empty space";
  if (pinCode.length > 6) return "pinCode should be of 6 digits";
  return null;
}
export function validateWorkOfChoiseArea(choiceOfWorkArea) {
  if (Array.isArray(choiceOfWorkArea)) {
    if (choiceOfWorkArea.length === 0)
      return "Choice Of Work Area's data shouldn't be empty";
    const isOneArea = choiceOfWorkArea.findIndex(
      (area) =>
        area.city &&
        area.city.trim().length >= 1 &&
        area.state &&
        area.state.trim().length >= 1
    );
    if (isOneArea == -1)
      return "Choice of Work Area should have one State and City";
    else return null;
  } else return "choiceOfWorkArea data should be in format of array";
}
