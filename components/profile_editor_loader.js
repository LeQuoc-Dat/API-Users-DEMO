import {adminStatus} from '../services/API_Token.js'



const displayModal = document.getElementById('modal_editor')
const displayPesonalFrm = document.getElementById('personal_info_editor_display')
const displayAddressFrm = document.getElementById('address_info_editor_display')

const btnOpenPersonalFrm0 = document.getElementById('btn_open_personal_1_editor') 
const btnOpenPersonalFrm = document.getElementById('btn_open_personal_2_editor') 
const btnOpenAddressFrm = document.getElementById('btn_open_address_editor') 

btnOpenPersonalFrm0.disabled = true
btnOpenPersonalFrm.disabled = true
btnOpenAddressFrm.disabled = true
blockEdit()

btnOpenAddressFrm.addEventListener(('click'), ()=>
{
    displayModal.style.display ='grid'
    displayAddressFrm.style.display='flex'
})


btnOpenPersonalFrm.addEventListener(('click'), ()=>
{
    displayModal.style.display ='grid'
    displayPesonalFrm.style.display='flex'
})

btnOpenPersonalFrm0.addEventListener(('click'), ()=>
{
    displayModal.style.display ='grid'
    displayPesonalFrm.style.display='flex'
})

async function blockEdit()
{
    const admin = await adminStatus()
    if (admin.id === null)
    {
        return
    }
    admin
    btnOpenPersonalFrm0.disabled = false
    btnOpenPersonalFrm.disabled = false
    btnOpenAddressFrm.disabled = false

    
}