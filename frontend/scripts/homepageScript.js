const projectsContainer = document.getElementById('projectsContainer');

const recentProjects = [
    {
        img: './images/project1.png',
        url: './project1.html',
        description: `Static website for a <a href="https://gameonmobilegaming.co.uk" target="_blank" class="link">local business</a>.<br> I was responsible for design, development, and server implementation`,
        alt: 'image of gaming van website'
    },
    {
        img: './images/project2.png',
        url: './project2.html',
        description: 'A <a href="https://github.com/leviives28/Covalent-Fragment-Grouping" target="_blank" class="link">python program</a> used for grouping data dependent on user defined constraints. Makes use of the pulp library.<br> Created for a friend who works in the science industry.',
        alt: 'image of python program'
    }
];

let iterator = 1;
projectsContainer.innerHTML = `
<figure id="currentProject">
    <a id="currentProjectLink" href=${recentProjects[0].url}><img id="currentProjectImage" src=${recentProjects[0].img} alt=${recentProjects[0].alt}></a>
    <figcaption id="currentProjectDescription">
        ${recentProjects[0].description}
    </figcaption>
</figure>`;

if (recentProjects.length > 1) {
    setInterval(() => {
        projectsContainer.innerHTML = `
        <figure id="currentProject">
            <a id="currentProjectLink" href=${recentProjects[iterator].url}><img id="currentProjectImage" src=${recentProjects[iterator].img} alt${recentProjects[iterator].alt}></a>
            <figcaption id="currentProjectDescription">
                ${recentProjects[iterator].description}
            </figcaption>
        </figure>`;
        iterator++;
        if (iterator === recentProjects.length) iterator = 0;
    }, 8000);
}
