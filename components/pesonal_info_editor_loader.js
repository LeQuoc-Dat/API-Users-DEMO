import {adminStatus} from '../services/API_Token.js'
import {updatePersonalInfo} from '../services/API_Request.js'

const adminInfo = await adminStatus()
const adminID = adminInfo.id

const setFirstName = document.getElementById('edit_first_name')
const setLastName = document.getElementById('edit_last_name')
const setEmail = document.getElementById('edit_email')
const setPhone = document.getElementById('edit_phone')
const setJod = document.getElementById('edit_jod')

const btnSaveChange = document.getElementById('btn_confirm_personal_update')
const btnCancelChange = document.getElementById('btn_cancel_personal_update')
const btnCloseFrm = document.getElementById('btn_close_personal_frm')
const displayModal = document.getElementById('modal_editor')
const displayFrm = document.getElementById('personal_info_editor_display')



loadAdminInfo()


btnSaveChange.addEventListener(('submit'), (e)=>
{
    e.preventDefault()
    const firstName = setFirstName.value
    const lastName = setLastName.value
    const email =  setEmail.value
    const phone = setPhone.value
    const jod = setJod.value
    updatePersonalInfo(firstName, lastName, email, phone, jod, adminID)
})

btnCloseFrm.addEventListener(('click'), ()=>
{
    displayModal.style.display = 'none'
    displayFrm.style.display = 'none'
})

btnCancelChange.addEventListener(('click'), (e)=>
{
    e.preventDefault()
    displayModal.style.display = 'none'
    displayFrm.style.display = 'none'
})


function loadAdminInfo()
{
    const firstName = adminInfo.firstName
    const lastName = adminInfo.lastName
    const email = adminInfo.email
    const phone = adminInfo.phone
    const jod = adminInfo.company.department

    setFirstName.value= firstName
    setLastName.value = lastName
    setEmail.value = email
    setPhone.value = phone
    setJod.value= jod

}