document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        if (user) {
            document.getElementById('profileAvatar').src = user.avatar;
            document.getElementById('profileUsername').innerText = user.username;
        }
    }
    
    const libraryGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
    libraryGames.forEach((game, index) => renderGame(game, index));

    document.getElementById('editProfileButton').addEventListener('click', function() {
        document.getElementById('editProfileForm').style.display = 'block';
    });
});

function renderGame(game, index) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-card');

    gameElement.innerHTML = `
        <h3>${game.name}</h3>
        <img src="${game.background_image}" alt="${game.name}">
        <p class="release-date">Released: ${game.released}</p>
        <p class="rating">Rating: ${game.rating}</p>
        <button onclick="removeGame(${index})">Excluir</button>
    `;

    document.getElementById('libraryGames').appendChild(gameElement);
}

function removeGame(index) {
    const libraryGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
    libraryGames.splice(index, 1);
    localStorage.setItem('libraryGames', JSON.stringify(libraryGames));
    location.reload(); // Recarrega a página para atualizar a lista de jogos
}

function saveProfile() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        const newUsername = document.getElementById('editUsername').value;
        const newAvatarFile = document.getElementById('editAvatar').files[0];

        if (newUsername) {
            user.username = newUsername;
        }

        if (newAvatarFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                user.avatar = event.target.result;
                document.getElementById('profileAvatar').src = user.avatar;
                localStorage.setItem(currentUser, JSON.stringify(user));
                alert('Perfil atualizado com sucesso!');
            };
            reader.readAsDataURL(newAvatarFile);
        } else {
            localStorage.setItem(currentUser, JSON.stringify(user));
            alert('Perfil atualizado com sucesso!');
        }

        document.getElementById('profileUsername').innerText = user.username;
        document.getElementById('editProfileForm').style.display = 'none';
    }
}

function cancelEdit() {
    document.getElementById('editProfileForm').style.display = 'none';
}
