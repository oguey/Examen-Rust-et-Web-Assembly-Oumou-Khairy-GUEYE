// Fonction pour analyser l'entrée et extraire les informations sur le plateau et les rovers
function parsePlateauAndRovers(input) {
    // Divise l'entrée en lignes et filtre les lignes vides
    const lines = input.trim().split('\n').filter(line => line.trim() !== '');
    // La première ligne contient les dimensions du plateau
    const plateau = lines[0].trim().split(' ').map(Number);
    const rovers = [];
    // Parcourt les lignes restantes pour extraire les positions et instructions des rovers
    for (let i = 1; i < lines.length; i += 2) {
        const position = lines[i].trim().split(' ');
        const instructions = lines[i + 1] ? lines[i + 1].trim() : '';
        // Ajoute un rover avec sa position initiale et ses instructions
        rovers.push({
            x: parseInt(position[0]),
            y: parseInt(position[1]),
            direction: position[2],
            instructions: instructions
        });
    }
    // Retourne les dimensions du plateau et la liste des rovers
    return { plateau, rovers };
}

// Fonction pour déplacer un rover sur le plateau
function executeRoverInstructions(rover, plateau) {
    // Définit les directions possibles et leurs mouvements correspondants
    const directions = ['N', 'E', 'S', 'W'];
    const moves = {
        'N': { x: 0, y: 1 },
        'E': { x: 1, y: 0 },
        'S': { x: 0, y: -1 },
        'W': { x: -1, y: 0 }
    };

    // Parcourt les instructions du rover
    for (const instruction of rover.instructions) {
        if (instruction === 'L') {
            // Tourne à gauche (90 degrés)
            rover.direction = directions[(directions.indexOf(rover.direction) + 3) % 4];
        } else if (instruction === 'R') {
            // Tourne à droite (90 degrés)
            rover.direction = directions[(directions.indexOf(rover.direction) + 1) % 4];
        } else if (instruction === 'M') {
            // Avance d'une case dans la direction actuelle
            rover.x += moves[rover.direction].x;
            rover.y += moves[rover.direction].y;
            // S'assure que le rover reste dans les limites du plateau
            rover.x = Math.min(Math.max(rover.x, 0), plateau[0]);
            rover.y = Math.min(Math.max(rover.y, 0), plateau[1]);
        }
    }
}

// Fonction principale pour traiter l'entrée et obtenir les positions finales des rovers
function getFinalRoverPositions(input) {
    // Analyse l'entrée pour obtenir les dimensions du plateau et les rovers
    const { plateau, rovers } = parsePlateauAndRovers(input);
    const results = [];
    // Déplace chaque rover selon ses instructions
    for (const rover of rovers) {
        executeRoverInstructions(rover, plateau);
        // Ajoute la position finale du rover aux résultats
        results.push(`${rover.x} ${rover.y} ${rover.direction}`);
    }
    // Retourne les résultats sous forme de chaîne de caractères
    return results.join('\n');
}

module.exports = { parsePlateauAndRovers, executeRoverInstructions, getFinalRoverPositions };