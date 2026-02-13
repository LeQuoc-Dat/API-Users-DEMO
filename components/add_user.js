import {insertUsers} from '../services/API_Request.js'
import {splitName} from './ultils.js'


const username = document.getElementsByName('username')
const userRole = document.getElementsByName('role')
const userGender = document.getElementsByName('gender')
const dayOfBirth = document.getElementsByName('dayOfBirth')
const monthOfBirth = document.getElementsByName('monthOfBirth')
const yearOfBirth = document.getElementsByName('yearOfBirth')
const userCompany = document.getElementsByName('company')
const userProfile = document.getElementById('user_profile')


userProfile.addEventListener('submit', (e)=>
{
    e.preventDefault()
    const fullName = username[0].value
    const [firstName, lastName] = splitName(fullName)
    const role = userRole[0].value
    const gender = userGender[0].value
    const age = getAge(dayOfBirth[0].value, monthOfBirth[0].value, yearOfBirth[0].value)
    const company = userCompany[0].value
    insertUsers(firstName, lastName, role, gender, age, company, "")

})


function getAge(day, month, year)
{
    const formatDate = day + '/' + month + '/' + year
    const birthDate = new Date(formatDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if(monthDifference < 0 || (monthDifference===0&&today.getDate()< birthDate.getDate()))
    {
        age--;
    }
    return age;
}
