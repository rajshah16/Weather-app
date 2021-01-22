



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

messageOne.textContent = 'Loading........'
messageTwo.textContent = ''

weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault() // This is will prevent the default behaviour of the form to reload 
   
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})