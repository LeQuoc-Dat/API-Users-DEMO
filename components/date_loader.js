const monthOpt = document.getElementById('opt_MOB')
const dayOpt = document.getElementById('opt_DOB')
const yearOpt = document.getElementById('opt_YOB')


const loadDate =() =>
{
    loadYears()
    loadDays()
    yearOpt.addEventListener('change', loadDays)
    monthOpt.addEventListener('change', loadDays)
    

    
}

loadDate()
function loadYears()
{
    yearOpt.innerHTML =""
    const max = new Date().getFullYear()
    const min = max-40
    for(let i=max; i>= min; i--)
    {
        const year = document.createElement('option')
        year.value = i
        year.innerHTML = `${i}`
        yearOpt.appendChild(year)
    }
}
function loadDays()
{
    dayOpt.innerHTML =""
    const numYearOpt = yearOpt.options.length
    if(numYearOpt === 0)
    {
        return
    }
    const chosenYear = Number(yearOpt.value)
    const chosenMonth = Number(monthOpt.value)
    const days = getDaysInMonth(chosenYear, chosenMonth)
    createDaysOPT(days) 

}

function getDaysInMonth(year, month)
{
    var date = new Date(year,month,1)
    var days = []
    while (date.getMonth() === month)
    {
        days.push(new Date(date))
        date.setDate(date.getDate()+1);
    }
    return days.length
}

function createDaysOPT(dayIndex)
{
    for(let i =0; i <=dayIndex; i++)
    {
        const day = document.createElement('option')
        day.value = i + 1
        day.innerHTML = `${i+1}`
        dayOpt.appendChild(day)
    }
}