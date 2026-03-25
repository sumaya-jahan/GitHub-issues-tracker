let allissues=[]

fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=>res.json())
    .then(data =>{
        allissues=data.data;
        console.log(allissues)
    });

