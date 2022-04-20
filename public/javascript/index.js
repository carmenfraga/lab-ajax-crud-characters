const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    //event.preventDefault()
    charactersAPI
      .getFullList()
      .then((minions) => {
        let minionCard = ''
        minions.data.forEach(elm => minionCard +=
          `<div class="character-info">
        <div class="name">Name: ${elm.name}</div>
        <div class="occupation">Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>
      </div>`)

        document.querySelector('.characters-container').innerHTML = minionCard
      })

      .catch(err => console.log(err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(({ data }) => {
        //console.log(data)
        let minionCard =
          `<div class="character-info">
        <div class="name">Name: ${data.name}</div>
        <div class="occupation">Occupation: ${data.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${data.cartoon}</div>
        <div class="weapon">Character Weapon: ${data.weapon}</div>
      </div>`

        document.querySelector('.characters-container').innerHTML = minionCard
      })
      .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const btn = document.getElementById('delete-one')
    const characterId = document.querySelector('.operation-delete input').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(({ data }) => {
        //console.log(data)
        let minionCard =
          `<div class="character-info">
        <div class="name">Name: ${data.name}</div>
        <div class="occupation">Occupation: ${data.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${data.cartoon}</div>
        <div class="weapon">Character Weapon: ${data.weapon}</div>
      </div>`

        document.querySelector('.characters-container').innerHTML = minionCard
        btn.style.backgroundColor = 'green'


      })
      .catch(err =>
        btn.style.backgroundColor = 'red')

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()
    const inputs = document.querySelectorAll('#edit-character-form input')

    const characterId = inputs[0].value


    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
    }

    charactersAPI
      .updateOneRegister(characterId, characterInfo)
      .then(() => {
      })
      .catch(err => console.log(err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value
    }

    charactersAPI
      .createOneRegister(characterInfo)
      .then(() => {
        document.querySelector('#send-data').style.backgroundColor = "green"
      })
      .catch(document.querySelector("#send-data").style.backgroundColor = "blue")

  });
});
