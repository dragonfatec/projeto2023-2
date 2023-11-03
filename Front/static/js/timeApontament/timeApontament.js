import getClient from "./getClients.js";
//import getRCByClient from "./getRCByClient.js";
import getRCs from "../resultCenter/getRCs.js";

const url = "http://localhost:8080/sendtime";


const selectClient = document.getElementById("clients");
selectClient.addEventListener("click", eventUser => getClient(eventUser), { once: true });

const selectRC = document.getElementById("resultCenters");
selectRC.addEventListener("click", eventRc => getRCs(eventRc), { once : true});


async function save(startDate, finishDate, typeSend, resultCenters, client){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            registration: localStorage.getItem("registration"),
            startDate: startDate,
            finishDate: finishDate,
            typeSend: typeSend,
            resultCenters: resultCenters,
            client: client
        })
    }).then(resp => {

        console.log(resp)
        
        if(resp.status == 200){
            $('#modal').modal('show');
        }else {
            window.alert(`Error to save: ${resp.status}`);
        }
    })
    .catch(error => console.log(error))
}

async function getForm(eventSave){
    eventSave.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const finishDate = document.getElementById("finishDate").value;
    const typeSend = document.getElementById("typeSend").value;
    const resultCenters = document.getElementById("resultCenters").value;
    const client = document.getElementById("clients").value;

    await save(startDate,finishDate,typeSend,resultCenters,client);
}


const form = document.getElementById("form_time");
form.addEventListener("submit", eventSave => getForm(eventSave));