const btnExpand = document.getElementById("btn_exp");
const bodyElement = document.body;
const sideBar = document.getElementById("sidebar");
const sideBarHeader = document.getElementById("sidebar_header")
const btnDisplayUsersDrop = document.getElementById('display_user_dropdown')
const userDropDownContent = document.getElementById('user_sidebar_dropdown')
const userDropDownIcon = document.getElementById('is_users_ready_to_dropdown')
const btnAdminOption = document.getElementById('btn_admin_otp')
const displayAdminOption = document.getElementById('display_admin_option')
const toggleOptionIcon = document.getElementById('admin_option_display_icon')


let IsOptionDisplay = false
let autoExpand = false
hideSideBar()


btnExpand.addEventListener("click", (e) =>
{
    e.preventDefault();
    bodyElement.classList.toggle("sb_expand");
    autoExpand = !autoExpand

})

sideBar.addEventListener("mouseenter", hideSideBar)
sideBar.addEventListener("mouseleave", hideSideBar)

btnDisplayUsersDrop.addEventListener('click', (e) =>
{
    e.preventDefault()
    userDropDownContent.classList.toggle('display_dropdown_content')
    if(userDropDownContent.classList.contains('display_dropdown_content'))
    {
        userDropDownIcon.innerHTML='<i class="fa-solid fa-chevron-up"></i>'
    }
    else
    {
        userDropDownIcon.innerHTML='<i class="fa-solid fa-chevron-down"></i>'
    }
})

btnAdminOption.addEventListener(('click'),() =>
{
    if(!IsOptionDisplay)
    {
        displayAdminOption.style.visibility ="visible"
        toggleOptionIcon.innerHTML='<i class="fa-solid fa-angle-up"></i>'
        
    }
    else
    {
        displayAdminOption.style.visibility ="hidden"
        toggleOptionIcon.innerHTML='<i class="fa-solid fa-angle-down"></i>'
    }
    IsOptionDisplay = !IsOptionDisplay

})

function hideSideBar()
{
    if(!autoExpand)
    {
        return
    }
    bodyElement.classList.toggle("sb_expand");
}


