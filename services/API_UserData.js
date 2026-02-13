import {deleteUsers, updateUsers} from './API_Request.js';
import {adminStatus} from './API_Token.js';

const usersDisplay= document.getElementById('users_display')
const usersChkbox = document.getElementById('chck_users')
const btnNextPage = document.getElementById('btn_next_page')
const btnPrevPage = document.getElementById('btn_prev_page')
const btnDeleteUsers = document.getElementById('btn_delete')
const searchbar = document.getElementById('txt_search')


const currentUserID = document.getElementById('current_user_id')
const editDisplay = document.getElementById('modal_editor')
const btnEditorExit = document.getElementById('btn_exit_editor')
const btnCancelUpdate = document.getElementById('btn_cancel_edit')
const btnUserAvatarUpload = document.getElementById('upload_new_user_avatar')
const btnUserAvatarRemove = document.getElementById('remove_user_avatar')
const avatarSelectField = document.getElementById('select_avatar_field')
const updateUserForm = document.getElementById('frm_update_user')
const updateUserFirstName = document.getElementById('update_user_first_name')
const updateUserLastName = document.getElementById('update_user_last_name')
const updateUserGender = document.getElementsByName('update_gender')
const updateUserFemaleRadio = document.getElementById('chk_gender_female')
const updateUserMaleRadio = document.getElementById('chk_gender_male')
const updateUserRole = document.getElementById('update_user_role')
const updateUserAge = document.getElementById('update_user_age')
const updateUserCompany = document.getElementById('update_user_company')
const updateUserAvatar = document.getElementById('update_user_avatar')


const sortUserByNameIncr = document.getElementById('btn_sorting_by_name_incr')
const sortUserByNameDecr = document.getElementById('btn_sorting_by_name_decr')
const sortUserByRoleIncr = document.getElementById('btn_sorting_by_role_incr')
const sortUserByRoleDecr = document.getElementById('btn_sorting_by_role_decr')
const sortUserByGenderIncr = document.getElementById('btn_sorting_by_gender_incr')
const sortUserByGenderDecr = document.getElementById('btn_sorting_by_gender_decr')
const sortUserByAgeIncr = document.getElementById('btn_sorting_by_age_incr')
const sortUserByAgeDecr = document.getElementById('btn_sorting_by_age_decr')
const sortUserByIdIncr = document.getElementById('btn_sorting_by_id_incr')
const sortUserByIdDecr = document.getElementById('btn_sorting_by_id_decr')





let overFlowItem = 0
let currentPage = 1
let usersNum = 0
let usersLimit = 30
let searchvalues ='?'
let userFeature = 'id'
let sortOrder = 'asc'
const usersPerPage = 7
const checkedUsersList =[]
btnNextPage.disabled= true;
btnPrevPage.disabled= true;

highlightSortButton(sortUserByIdIncr)
const loadUsers = async () =>
{

    refreshUserList(usersDisplay)
    const skipPages = (currentPage-1)*usersPerPage
     if ((skipPages+usersPerPage)>usersLimit)
    {
        overFlowItem = skipPages+usersPerPage - usersLimit
    }
    else
    {
        overFlowItem = 0
    }
    const allUsersURL = `https://dummyjson.com/users/${searchvalues}limit=${usersLimit}&select=id`
    const {users: allUsers} =  await fetch(allUsersURL).then(res => res.json())
    const userKeysList = keyListToString(allUsers)
    console.log(userKeysList)


    const limitUser = '&filter?key=id&value=1'
    const usersURL = `https://dummyjson.com/users/${searchvalues}limit=${usersPerPage - overFlowItem}&skip=${skipPages}&sortBy=${userFeature}&order=${sortOrder}${limitUser}`
    const {users: currentUsers} =  await fetch(usersURL).then(res => res.json())

    usersNum = Number(allUsers.length)
    for (const user of currentUsers)
       {

               const id =  user.id
               const firstName=  user.firstName
               const lastName= user.lastName
               const gender=  user.gender
               const age = user.age
               const role = user.role
               const company = user.company.name
               const image = user.image
            userDisplayer(firstName, lastName, id, role, gender, age, company , image)
       }
   
    if ((skipPages+usersPerPage)<usersNum){
        btnNextPage.disabled= false;
    }
    if (currentPage > 1)
    {
        btnPrevPage.disabled= false;
    }
    usersChkbox.addEventListener('click', ()=>
    {
        if(usersChkbox.checked)
        {
            checkAllUsers(usersDisplay, true)
            for(const user of allUsers)
            {
                let id = user.id
                let checkExisted = checkedUsersList.indexOf(id)
                if (checkExisted != -1)
                {
                    continue
                }
                checkedUsersList.push(id)
            }
        }
        else
        {
            checkAllUsers(usersDisplay, false)
            checkedUsersList.length = 0;
        }
    })
}

loadUsers()


btnDeleteUsers.addEventListener('click', () =>
{
    if (checkedUsersList.length ===0)
    {
        return
    }
    for(const userId of checkedUsersList)
    {
        deleteUsers(userId)
    }
})

btnNextPage.addEventListener('click', () => {
        currentPage++;
        btnNextPage.disabled= true;
        loadUsers()
    })
btnPrevPage.addEventListener('click', () => {
        currentPage--;
        btnPrevPage.disabled= true;
        loadUsers()
    })
searchbar.addEventListener('input', () =>
{
    setTimeout(() =>
        {
            overFlowItem = 0
            currentPage = 1
            usersNum = 0
            btnNextPage.disabled= true;
            btnPrevPage.disabled= true;
            searchvalues = 'Search?q='+searchbar.value +'&'
            console.log(searchvalues)
            if (searchvalues === "")
            {
                 console.log('1')
                 searchvalues = '?'
            }
            loadUsers()
            },300)
    
})

function userDisplayer(firstName, lastName, id, role, gender, age,  company, image)
{
    const userCheckbox = document.createElement('td')
    const userChk = document.createElement('input')
    const userID = document.createElement('td');
    const userContainer = document.createElement('tr');
    const userImg = document.createElement('td');
    const logoImg = document.createElement('img')
    const userName = document.createElement('td');
    const userCompany = document.createElement('td');
    const userGender = document.createElement('td');
    const userAge = document.createElement('td');
    const userRole= document.createElement('td');
    const userEditorContainer= document.createElement('td');
    const userEditor = document.createElement('button');
    const userEditorMenu = document.createElement('nav')
    const deleteOption = document.createElement('div')
    const editOption = document.createElement('div')
    const exitOption = document.createElement('div')

    deleteOption.innerHTML = "Delete"
    deleteOption.classList.add('editor_item')
    deleteOption.addEventListener("click", ()=>
    {
        deleteUsers(id)
    })

    editOption.innerHTML ='Update'
    editOption.classList.add('editor_item')
    editOption.addEventListener('click', ()=>
    {
        loadUserInfo(id ,firstName, lastName, role, gender, age,  company, image )
        editDisplay.style.display = 'grid'
    })

    exitOption.innerHTML ='Exit'
    exitOption.classList.add('editor_item')

    userEditorMenu.classList.add('editor_menu')
    userEditor.classList.add("user_editor")
    userContainer.classList.add("user_container");
    userChk.type ='checkbox'
    userChk.classList.add('user_checkbox')


    


    if(checkedUsersList.indexOf(id) != -1)
    {
        userChk.checked = true
    }
    userChk.addEventListener('change', () =>
    {
        if (userChk.checked)
        {
            let checkExisted = checkedUsersList.indexOf(id)
            if (checkExisted != -1)
            {
                return
            }
            else
            {
                checkedUsersList.push(id)
                if (checkedUsersList.length === usersLimit)
                {
                    usersChkbox.checked = true
                }
            }


        }
        else
        {
            let checkExisted = checkedUsersList.indexOf(id)
            checkedUsersList.splice(checkExisted,1)
            usersChkbox.checked = false
        }

    })

    

    logoImg.src = `${image}`
    userImg.classList.add('user_logo')
    userName.innerHTML =`${firstName} ${lastName}`
    userName.classList.add('highlight_text')
    userID.innerText =`${id}`
    userID.classList.add('user_id')
    
    userAge.innerText = `${age}`
    userRole.innerText = `${role}`
    userCompany.innerText =`${company}`
    userGender.innerText = `${gender}`
    userEditor.innerHTML = '<i class="fa-solid fa-ellipsis"></i>'

    userEditorMenu.appendChild(editOption)
    userEditorMenu.appendChild(deleteOption)

    userEditorMenu.appendChild(exitOption)
    

    userEditorContainer.appendChild(userEditor);
    userEditorContainer.appendChild(userEditorMenu)
    userCheckbox.appendChild(userChk);
    userImg.appendChild(logoImg);
    userContainer.appendChild(userCheckbox);
    userContainer.appendChild(userImg)
    userContainer.appendChild(userName);
    userContainer.appendChild(userID);
    userContainer.appendChild(userRole);
    userContainer.appendChild(userGender);
    userContainer.appendChild(userAge);
    userContainer.appendChild(userCompany);
    userContainer.appendChild(userEditorContainer)
    usersDisplay.appendChild(userContainer);

}


function checkAllUsers(userTable, isCheck)
{
    const userList = userTable.getElementsByTagName('tr')
    for (const user of userList)
    {
        const userChkbox = user.getElementsByTagName('input')[0]
        userChkbox.checked = isCheck
    }
}


function refreshUserList(userList)
{
    let numUsers = userList.rows.length
    
    while(numUsers>1)
    {
       userList.deleteRow(numUsers-1)
       numUsers = numUsers - 1
    }
}

function loadUserInfo(userID, userFirstName, userLastName, userRole, userGender, userAge, userComany, userImage)
{
    currentUserID.innerText = userID
    updateUserFirstName.value = userFirstName
    updateUserLastName.value = userLastName
    updateUserRole.value=userRole
    if (userGender =='male')
    {
        updateUserMaleRadio.checked=true
    }
    else
    {
        updateUserFemaleRadio.checked=true
    }
    updateUserAge.value = Number(userAge)
    updateUserCompany.value = userComany
    updateUserAvatar.src = userImage
}

updateUserForm.addEventListener('submit', (e) =>
{
    
    e.preventDefault()
    const id = Number(currentUserID.innerText)
    console.log(id)
    const firstName = updateUserFirstName.value
    const lastName = updateUserLastName.value
    const role = updateUserRole.value
    const gender = updateUserGender[0].value
    const age = Number(updateUserAge.value)
    const company = updateUserCompany.value
    const avatar = updateUserAvatar.src

    updateUsers(firstName, lastName, role, gender, age, company, avatar, id)
    
})

btnEditorExit.addEventListener('click', () =>
{
    editDisplay.style.display = 'none'
})

btnCancelUpdate.addEventListener('click', () =>
{
    editDisplay.style.display = 'none'
})

btnUserAvatarUpload.addEventListener('click', () =>
{
    avatarSelectField.value=""
    avatarSelectField.click()
})

avatarSelectField.addEventListener('change', () =>
{
    const image = avatarSelectField.files[0];
    if(!image)
    {
        return
    }
    const imageURL = URL.createObjectURL(image)
    updateUserAvatar.src = imageURL
})

btnUserAvatarRemove.addEventListener('click', ()=>
{
    updateUserAvatar.src = ""
})


/* Sort users*/


sortUserByIdIncr.addEventListener('click', ()=>
{
    sortUsers(true,'id',sortUserByIdIncr)
})
sortUserByIdDecr.addEventListener('click', ()=>
{
    sortUsers(false, 'id', sortUserByIdDecr)
})

sortUserByNameIncr.addEventListener('click', ()=>
{
    sortUsers(true,'firstName',sortUserByNameIncr)
})
sortUserByNameDecr.addEventListener('click', ()=>
{
    sortUsers(false,'firstName',sortUserByNameDecr)
})

sortUserByRoleIncr.addEventListener('click', ()=>
{
    sortUsers(true,'role',sortUserByRoleIncr)
})
sortUserByRoleDecr.addEventListener('click', ()=>
{
    sortUsers(false,'role',sortUserByRoleDecr)
})

sortUserByGenderIncr.addEventListener('click', ()=>
{
    sortUsers(true,'gender',sortUserByGenderIncr)
})
sortUserByGenderDecr.addEventListener('click', ()=>
{
    sortUsers(false,'gender',sortUserByGenderDecr)
})

sortUserByAgeIncr.addEventListener('click', ()=>
{
    sortUsers(true,'age',sortUserByAgeIncr)
})
sortUserByAgeDecr.addEventListener('click', ()=>
{
    sortUsers(false,'age',sortUserByAgeDecr)
})

function highlightSortButton(sortButton)
{
    const activedSortButton = document.querySelector('.sort_user_active')
    if (activedSortButton)
    {
        activedSortButton.classList.toggle('sort_user_active')
    }
    sortButton.classList.toggle('sort_user_active')
}

function sortUsers(isIncr, sortTarget, sortButton)
{
    highlightSortButton(sortButton)
    userFeature = sortTarget
    if (isIncr)
    {
        sortOrder = 'asc'
    }
    else
    {
        sortOrder = 'desc'
    }
    loadUsers()
}


function keyListToString(keyList)
{
    const arrKey = []
    for(const key of keyList)
    {
        let id = key.id
        arrKey.push(id)
    }
    return arrKey.join(',')
}