
function addAnimals(e){
    e.preventDefault();
    let newAnimal={
        name:e.target.name.value,
        image:e.target.image.value,
        votes:0
    }
    renderAnimals(newAnimal)
    acceptNewAnimal(newAnimal)
}

function fetchAnimals() {
    fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(data => data.forEach(element => {renderAnimals(element);}))
}

function renderAnimals(animal) {
    const main = document.querySelector('main');
   
        const li =document.createElement('li')
        li.className="card"
        li.innerHTML=`
        <div class="card-header">
        <img  src="${animal.image}">
        </div>
        <div class="card-body">
        <h5>Name: ${animal.name}</h5>
        <h6 id="numbervotes">Number of Votes:${animal.votes}</h6>
        </div>
         <div class="row pb-2 px-3">
         <div class="col-md-4">
        <button id="votebtn" class="btn-sm btn btn-success">Vote</button>
         </div>
         <div class="col-md-4">
        <button id="resetbtn" class="btn-sm btn btn-warning">Reset Votes</button>
         </div>
         <div class="col-md-4 text-end">
        <button id="deletebtn" class="btn-sm btn btn-danger">Delete Animal</button>
         </div>
        </div>
        `
       
    li.querySelector('#votebtn').addEventListener('click', () => {
        animal.votes+=1
        li.querySelector("#numbervotes").textContent = `Number of Votes:${animal.votes}`
        makeVotes(animal)
    })

    li.querySelector('#resetbtn').addEventListener('click', () => {
        animal.votes = 0
        li.querySelector("#numbervotes").textContent = `Number of Votes:${animal.votes}`
        resetVotes(animal)
    })

    li.querySelector('#deletebtn').addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this animal?")){
            li.remove()
            const name=animal.name
            deleteAnimal(animal, name)
        }
    })

    main.appendChild(li);

}

function makeVotes(data){
    fetch(`http://localhost:3000/characters/${data.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data    )
    }).then(res=>res.json()).then(data=>console.log(data))
}

function resetVotes(data) {
    fetch(`http://localhost:3000/characters/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data))
}

function deleteAnimal(data, name) {
    fetch(`http://localhost:3000/characters/${data.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    }).then(res => res.json()).then(data => alert(`${name} successfully deleted!!!`))
}

function acceptNewAnimal(newAnimal){
    fetch('http://localhost:3000/characters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnimal)
    }).then(res => res.json()).then(data => alert('Animal Successfully Created'))
}

document.addEventListener('DOMContentLoaded', function () {
    fetchAnimals();
    document.querySelector('#the_form').addEventListener('submit', addAnimals);

});
