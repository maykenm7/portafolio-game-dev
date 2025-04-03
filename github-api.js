document.addEventListener('DOMContentLoaded', function() {
    // GitHub API Integration
    const githubRepos = document.getElementById('githubRepos');
    const username = 'tu-usuario'; // Reemplaza con tu nombre de usuario de GitHub
    
    if (githubRepos) {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=6`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los repositorios');
                }
                return response.json();
            })
            .then(repos => {
                githubRepos.innerHTML = '';
                
                repos.forEach(repo => {
                    const repoCard = document.createElement('div');
                    repoCard.className = 'repo-card fade-in';
                    
                    repoCard.innerHTML = `
                        <h4 class="repo-name">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </h4>
                        <p class="repo-description">${repo.description || 'Sin descripción'}</p>
                        <div class="repo-stats">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                            <span><i class="fas fa-circle" style="color: ${repo.language ? '#6e45e2' : '#ccc'}"></i> ${repo.language || 'Varios'}</span>
                        </div>
                    `;
                    
                    githubRepos.appendChild(repoCard);
                });
            })
            .catch(error => {
                console.error('Error al cargar repositorios de GitHub:', error);
                githubRepos.innerHTML = `
                    <div class="error-message">
                        <p>No se pudieron cargar los repositorios de GitHub. Por favor, visita mi <a href="https://github.com/${username}" target="_blank">perfil de GitHub</a>.</p>
                    </div>
                `;
            });
    }
});