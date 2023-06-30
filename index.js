import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
                    databaseURL:"https://playground-cf67f-default-rtdb.firebaseio.com/"
 }

 const App=initializeApp(appSettings)
const database = getDatabase(App)
const endorsInDB = ref(database,"endorsement")




const textAreaEl = document.getElementById("textArea-el")
const fromEl = document.getElementById("inputFrom-el")
const toEl = document.getElementById("inputTo-el")
const endorsEl = document.getElementById("endors-el")
const btnpEl = document.getElementById("btn-p")

let toElValue = toEl.value
let fromElValue = fromEl.value
let textAreaValue = textAreaEl.value
let str = 0



btnpEl.addEventListener("click",function(){

   toElValue = toEl.value
   fromElValue = fromEl.value
   textAreaValue = textAreaEl.value
    
 if(!textAreaValue)  {
   
  endorsEl.innerHTML=`<div id="alert-container">
                     
                      <h1 id="message-error">Sorry, you must to write a endorsement message ☝️</h1>
  
                     </div>`

 }else if(!fromElValue){
  endorsEl.innerHTML=`<div id="alert-container2">
                     
                      <h1 id="message-error">Sorry, you must to write the name of the person is sending endorsement (From).☝️</h1>
  
                     </div>`
 }else if(!toElValue){
  endorsEl.innerHTML=`<div id="alert-container3">
                     
                      <h1 id="message-error">Sorry, you must to write the name of the person to whom the endorsement is addressed (To).☝️</h1>

                    </div>`
 }else{
  


      endorsEl.innerHTML=`<div class="InnerEndors">
                     
                    <h3 class="ToText">To ${toEl.value}</h3>
                     
                    <p class="textEndors">${textAreaEl.value}</p>

                   
                      
                    
                    <div id="likes-container">
                    
                    <div id="container1">
                    <h3 class="FromText">From ${fromEl.value}</h3> 
                    
                    </div>
                

                    <div id="container2">
                    <button id="likes-el">♥</button>
                    <p id="sum-el"></p>
                    
                    </div>

                    </div>

                    </div>`


                    const likesEl =document.getElementById("likes-el")
                    const sumEl =document.getElementById("sum-el")

                    
                    
                    likesEl.addEventListener("click",function(){
                    
                        
                    
                    
                       str += 1
                      let sum = str.toString()
                      sumEl.innerText = sum
                    })

                    push(endorsInDB,{"From":fromElValue,"message":textAreaValue,"To":toElValue})

    }
    clearInputfields()

            
})


onValue(endorsInDB, function(snapshot){

  let EndorsArray =  Object.entries(snapshot.val())
  console.log(EndorsArray)
  clearEndorsEl()

  for(let i = 0; i<EndorsArray;i++){

   let currentEndors = EndorsArray[i]
   let currentEndorsID = currentEndors[0]
   let currentEndorsValue = currentEndors[1]

   AppendEndorsToEndorsInDB(currentEndors)

  }
})

function clearInputfields(){

  textAreaEl.value = ""
  toEl.value = ""
  fromEl.value = ""
}

function clearEndorsEl(){
  endorsEl.innerHTML = ""
}

function AppendEndorsToEndorsInDB(item){
  let itemID = item[0]
  let itemValue = item[1]

  let CurrentInnerEndors = document.createElement(`<div class="InnerEndors2">`) 
   CurrentInnerEndors.textContent = itemValue

   endorsEl.append(CurrentInnerEndors)

}




    


