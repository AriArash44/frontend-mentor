import '../public/styles/styles.less';
import { worker } from './mocks/server.js';
import { html, render } from 'lit';

const loaderContainer = document.getElementById('loader');

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function underscoreToSpace(str) {
    return str.split('_').join(' ');
}

worker.start().then(() => {
    fetch("/api/recipes/omelette")
        .then(response => response.json())
        .then(data => { 
            const recipeTemplate = html`
                <header>
                    <img src="${data.image}" alt="${data.name} image"/>
                    <h1>${data.title}</h1>
                    <p>${data.intro}</p>
                    <details open>
                        <summary>Prepariation time</summary>
                        <ul>${Object.entries(data.preparation_time).map(([key, value]) => html`
                            <li><strong>${capitalizeFirstLetter(key)}:</strong> ${value}</li>`)}</ul>
                    </details>
                </header>
                <main>
                    <section>
                        <h2>Ingredients</h2>
                        <ul>${data.ingredients.map((ingredient) => html`
                            <li>${ingredient}</li>`)}</ul>
                    </section>
                    <hr/>
                    <section>
                        <h2>Instructions</h2>
                        <ol>${Object.entries(data.instructions).map(([key, value]) => html`
                            <li><strong>${underscoreToSpace(capitalizeFirstLetter(key))}:</strong> ${value}</li>`)}</ol>
                    </section>
                    <hr/>
                    <section>
                        <h2>Nutrition</h2>
                        <p>${data.nutrition.title}</p>
                        <table>${Object.entries(data.nutrition.data).map(([key, value]) => html`
                            <tr><td>${capitalizeFirstLetter(key)}:</td><td><strong>${value}</strong><td/></tr>`)}</table>
                    </section>
                </main>
            `;
            render(recipeTemplate, document.getElementById("recipe-container"));
            setTimeout(() => {
                loaderContainer.parentElement.removeChild(loaderContainer);
            }, 1000);
        })
});