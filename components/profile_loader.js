import {adminStatus} from '../services/API_Token.js'

const setFullName = document.getElementById('admin_fullname')
const setIntroJod = document.getElementById('admin_jod_intro')
const setIntroCityState = document.getElementById('admin_city_state_intro')
const setFirstName = document.getElementById('admin_first_name_profile')
const setLastName = document.getElementById('admin_last_name_profile')
const setEmail = document.getElementById('admin_email_profile')
const setPhone = document.getElementById('admin_phone_profile')
const setJod = document.getElementById('admin_jod_profile')
const setCountry = document.getElementById('admin_country_profile')
const setCityState = document.getElementById('admin_city_state_profile')
const setPostalCode = document.getElementById('admin_postal_code_profile')
const setAvatar = document.getElementById('admin_avatar_profile')


loadProfileInfo()
async function loadProfileInfo() 
{
    const admin = await adminStatus()
    if(admin === null)
    {
        return
    }
    console.log(admin)

    const fullName = `${admin.firstName} ${admin.lastName}`
    setFullName.innerText = fullName
    setIntroJod.innerText = admin.company.department
    setIntroCityState.innerText = admin.address.city + ', ' + admin.address.country
    setFirstName.innerText = admin.firstName
    setLastName.innerText = admin.lastName
    setEmail.innerText = admin.email
    setPhone.innerText = admin.phone
    setJod.innerText = admin.company.department
    setCountry.innerText = admin.address.country
    setCityState.innerText = admin.address.city + ', ' + admin.address.country
    setPostalCode.innerText = admin.address.postalCode
    setAvatar.style.backgroundImage = `url(${admin.image})`
}
