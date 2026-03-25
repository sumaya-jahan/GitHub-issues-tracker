let allissues=[]

fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=>res.json())
    .then(data =>{
        allissues=data.data;
        console.log(allissues)
        displayIssues(allissues)
    });

function displayIssues(issues) {
    const container=document.getElementById('issue-container');
    container.innerHTML="";

    issues.forEach(issue => {
        const div=document.createElement('div');
        div.innerText=issue.title;
        container.appendChild(div);
    });
}