
export async function deleteUsers(userID)
{
    const userURL = 'https://dummyjson.com/users/' + userID
    fetch(userURL,
        {
            method: 'DELETE'
        }
    )
    .then(res =>res.json())
    .then(console.log)
}

export async function insertUsers(firstName, lastName, role, gender, age, company, image)
{
    fetch('https://dummyjson.com/users/add',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        role: role,
        gender: gender,
        age: age,
        company: JSON.stringify({
            name: company
        }),
        image: image
    })


    })
    .then(res =>res.json())
    .then(console.log)
    .then(alert('new user with name:' + firstName + ' ' + lastName + ', role: ' + role));
}

export async function updateUsers(firstName, lastName, role, gender, age, company, image, userID)
{
    const userURL = 'https://dummyjson.com/users/' + userID
    fetch(userURL,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        role: role,
        gender: gender,
        age: age,
        company: JSON.stringify({
            name: company
        }),
        image: image
    })
    })
    .then(res =>res.json())
    .then(console.log)
    .then(alert('An user with ID: ' + userID + ' has been updated'))
}

export async function updatePersonalInfo(firstName, lastName, email, phone, jod, userID)
{
    const userURL = 'https://dummyjson.com/users/' + userID
    fetch(userURL,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        company: JSON.stringify({
            department: jod
        }),
    })
    })
    .then(res =>res.json())
    .then(console.log)
    .then(alert('Personal information has been updated'))
}


export async function updateAddressInfo(country, city, postalCode, userID)
{
    const userURL = 'https://dummyjson.com/users/' + userID
    fetch(userURL,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        address: JSON.stringify({
            country: country,
            city: city,
            postalCode: postalCode
        }),
    })
    })
    .then(res =>res.json())
    .then(console.log)
    .then(alert('Address information has been updated'))
}