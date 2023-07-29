let agents = [];

fetch('/js/agents.json')
    .then(response => response.json())
    .then(data => {
        agents = data;
        displayAgents(agents);
        setupSearch();
        setupRandomAgent();
    });

function displayAgents(agentArray) {
    let agentsContainer = document.getElementById('agents-container');
    agentsContainer.innerHTML = '';
    
    agentArray.forEach(agent => {
        let agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');
    
        let agentLink = document.createElement('a');
        agentLink.href = agent.info;
            
        let agentImage = document.createElement('img');
        agentImage.src = agent.image;
        agentImage.alt = agent.name;
        agentLink.appendChild(agentImage);
    
        let agentName = document.createElement('h3');
        agentName.textContent = agent.name;
        agentLink.appendChild(agentName);
    
        agentCard.appendChild(agentLink);
        agentsContainer.appendChild(agentCard);
    });
}
    

function setupSearch() {
    let searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function(e) {
        let searchString = e.target.value.toLowerCase();
        let filteredAgents = agents.filter(agent => 
            agent.name.toLowerCase().includes(searchString)
        );
        displayAgents(filteredAgents);
    });
}

function setupRandomAgent() {
    let randomAgentButton = document.getElementById('random-agent');
    randomAgentButton.addEventListener('click', function() {
        let randomIndex = Math.floor(Math.random() * agents.length);
        displayAgents([agents[randomIndex]]);
    });
}

