const url = "http://localhost:8080/sendtime/consult";

const table = document.getElementById("tr");

async function getTime(){

    const response = await fetch(url, 
        {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    
    const data = await response.json();

    console.log(data);

    data.map((resp) => {
        const tr = document.createElement("tr");
        const user = document.createElement("td");
        const startDate = document.createElement("td");
        const finishDate = document.createElement("td");
        const typeSend = document.createElement("td");
        const status = document.createElement("td");

        user.innerText = resp.user.name;
        startDate.innerText = resp.startDate;
        finishDate.innerText = resp.finishDate;
        typeSend.innerText = resp.typeSend;
        status.innerText = resp.status;


        tr.appendChild(user);
        tr.appendChild(startDate);
        tr.appendChild(finishDate);
        tr.appendChild(typeSend);
        tr.appendChild(status);

        table.appendChild(tr);
    })
}

getTime();