export async function adminStatus()
{
   try {
    const myToken = localStorage.getItem("mytoken")
    if(!myToken)
    {

        return null;
    }
    const res = await fetch('https://dummyjson.com/user/me', 
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + myToken,
           },
        })
   if(!res.ok)
   {
        console.error("Response status: " + res.status)
        return null
    }
   const result = await res.json()
   return result
   
   } catch (error) {
    console.error(error.message)
    return null
   }
} 


