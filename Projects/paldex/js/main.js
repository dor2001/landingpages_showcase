document.addEventListener("DOMContentLoaded", function() {
    fetch('pals.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            const container = document.querySelector(".container");
            data.forEach(pal => {
                const div = document.createElement('div');
                const info = document.createElement('div');
                const num = document.createElement('p');
                const img = document.createElement('img');
                const hr = document.createElement('hr');
                img.src = pal.image;
                img.className = "Pal";

                info.textContent = `${pal.name}`;
                num.textContent = `No. ${pal.key}`;
                div.className = "palCard";
                info.className = "palInfo";
                div.appendChild(img);
                div.appendChild(info);
                div.appendChild(num);
                const elements = document.createElement('div');
                elements.className = "elements";

                const mainElements = document.createElement('div');
                pal.types.forEach(type => {
                    const typeImg = document.createElement('img');
                    mainElements.className = "mainElements";
                    typeImg.src = type.image;
                    mainElements.appendChild(typeImg);
                    div.appendChild(mainElements);
                });

                div.appendChild(hr);
                div.appendChild(elements);
                pal.suitability.forEach(suit => {
                    const suitImg = document.createElement('img');
                    const suitLevel = document.createElement('p');
                    suitImg.src = suit.image;
                    suitLevel.innerText = suit.level;
                    elements.appendChild(suitImg);
                    elements.appendChild(suitLevel);
                });


                div.appendChild(elements);

                container.appendChild(div);
            });


            console.log(`First pal's name: ${data[0].name}`);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


function liveSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const palCards = document.querySelectorAll('.palCard');
    palCards.forEach(card => {
        const palName = card.querySelector('.palInfo').textContent.toLowerCase();
        if (palName.includes(input)) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}

    document.getElementById('searchInput').addEventListener('keyup', liveSearch);
});
