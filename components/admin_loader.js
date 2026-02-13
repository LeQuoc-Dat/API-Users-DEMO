import {adminStatus} from '../services/API_Token.js'


const adminNameDisplay = document.getElementById('admin_name')
const setAdminAvatar = document.getElementById('set_admin_img')
const signOut = document.getElementById('sign_out')
const signOutOpt = document.getElementById('sign_out_opt')



checkStatus()



async function checkStatus()
{
    const admin = await adminStatus()
    if(admin === null)
    {
        return
    }
    setAdminInfo(admin.lastName, admin.image)

}

function setAdminInfo(lastName, image)
{
    adminNameDisplay.innerText = lastName
    setAdminAvatar.style.backgroundImage = `url(${image})`
}
signOut.addEventListener('click', ()=>
{
    localStorage.removeItem("mytoken")
})

signOutOpt.addEventListener('click', ()=>
{
    localStorage.removeItem("mytoken")
})