const loginForm = document.getElementById('login')

isLogged()

loginForm.addEventListener('submit', (e) =>
{
    e.preventDefault()
    const userEmail = document.getElementById('input_username').value
    const userPassword = document.getElementById('input_password').value
    
    Login(userEmail, userPassword)
})

async function Login(username, password) 
{
    try {

        const loggin = await fetch('https://dummyjson.com/user/login',
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify
        ({
            username: username,
            password: password,
            expiresInMins: 60
        }),
        })
        if (!loggin.ok)
        {
            window.alert('Login fail')
            throw new Error(`Login status: ${loggin.status}`)
            
        }
        const result = await loggin.json()
        const accessToken = result.accessToken
        const refreshToken = result.refreshToken
        localStorage.setItem('mytoken', accessToken)
        isLogged()
        
    } catch (error) {
        throw console.log(error.message)
        
    }  
}

async function isLogged() {
   
    const myToken = localStorage.getItem('mytoken')
    if(!myToken)
       { return}
    const accessToken = 'Bearer '+ myToken
    console.log(accessToken)
    const res = await fetch('https://dummyjson.com/user/me', {
        method: 'GET', /* or POST/PUT/PATCH/DELETE */
        headers: {
                    'Authorization': accessToken, 
                 }, 
       // credentials: 'include'
        })
    
    if (!res.ok)
    {
        localStorage.removeItem('mytoken')
        throw console.error('status: '+ res.status)
    }
    


    window.location.href = "./pages/users_list.html"



}
//emilys
//emilyspass
//emily.johnson@x.dummyjson.com