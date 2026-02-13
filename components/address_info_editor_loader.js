import {adminStatus} from '../services/API_Token.js'
import {updateAddressInfo} from '../services/API_Request.js'



const adminInfo = await adminStatus()
const adminID = adminInfo.id

const setCountry = document.getElementById('edit_country')
const setCityState = document.getElementById('edit_city_state')
const setPostalCode = document.getElementById('edit_postal_code')


const btnSaveChange = document.getElementById('btn_confirm_address_update')
const btnCancelChange = document.getElementById('btn_cancel_address_update')
const btnCloseFrm = document.getElementById('btn_close_address_frm')
const displayModal = document.getElementById('modal_editor')
const displayFrm = document.getElementById('address_info_editor_display')



loadAdminInfo()

btnSaveChange.addEventListener(('submit'), (e)=>
{
    e.preventDefault()
    const country = setCountry.value
    const cityState = setCityState.value
    const postalCode = setPostalCode.value

    updateAddressInfo(country, cityState, postalCode, adminID)

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
    const country = adminInfo.address.country
    const cityState = adminInfo.address.city
    const postalCode = adminInfo.address.postalCode
    setCountry.value =  country
    setCityState.value = cityState 
    setPostalCode.value = postalCode
}