// main.js
let groupId = '';
let groupRef = null;
let occupations = [];

function createGroup() {
    const groupName = document.getElementById("group-name").value;
    if (groupName) {
        const groupRef = firebase.database().ref('groups').push();
        groupId = groupRef.key;
        groupRef.set({ name: groupName });
        document.getElementById("group-link").innerHTML = `Group Link: <a href="https://your-github-page.com/group/${groupId}">Click Here</a>`;
        loadGroup(groupId);
    }
}

function loadGroup(groupId) {
    // Load existing group data
    const groupRef = firebase.database().ref(`groups/${groupId}/occupations`);
    groupRef.on('value', snapshot => {
        occupations = snapshot.val() || [];
        renderUniverse();
        renderOccupationPercentage();
    });
}

function addOccupation() {
    const binaryString = document.getElementById("occupation").value;
    if (binaryString) {
        const occupation = binaryToString(binaryString);
        occupations.push(occupation);

        // Save to Firebase
        firebase.database().ref(`groups/${groupId}/occupations`).set(occupations);

        document.getElementById("occupation").value = '';
    }
}

function binaryToString(binary) {
    let str = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        str += String.fromCharCode(parseInt(byte, 2));
    }
    return str;
}

function renderUniverse() {
    const universeDiv = document.getElementById("universe");
    universeDiv.innerHTML = '';
    const planet = document.createElement('div');
    planet.classList.add('planet');
    universeDiv.appendChild(planet);

    occupations.forEach((occupation, index) => {
        const angle = (index / occupations.length) * 360;
        const distance = 100 + Math.random() * 100; // Random orbit size
        const orbitX = Math.cos(angle * Math.PI / 180) * distance;
        const orbitY = Math.sin(angle * Math.PI / 180) * distance;

        const occupationElement = document.createElement('div');
        occupationElement.classList.add('occupation');
        occupationElement.style.left = `${50 + orbitX}%`;
        occupationElement.style.top = `${50 + orbitY}%`;
        occupationElement.textContent = occupation;
        universeDiv.appendChild(occupationElement);
    });
}

function renderOccupationPercentage() {
    const occupationCount = {};
    occupations.forEach(occupation => {
        occupationCount[occupation] = (occupationCount[occupation] || 0) + 1;
    });

    const percentageDiv = document.getElementById("occupation-percentage");
    let percentages = '';
    for (let occupation in occupationCount) {
        const percent = (occupationCount[occupation] / occupations.length) * 100;
        percentages += `<p>${occupation}: ${percent.toFixed(2)}%</p>`;
    }

    percentageDiv.innerHTML = percentages;
}