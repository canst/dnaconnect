// Define the DNA and RNA letter arrays
const dnaLetters = ['A', 'T', 'G', 'C'];
const rnaLetters = ['A', 'U', 'C', 'G'];

// Define the polypeptide database
const polypeptideDatabase = {
  AUU: 'Ile',
  AUG: 'Met',
  UUU: 'Phe',
  GAA: 'Glu',
  UCU: 'Ser',
  // Add more entries as needed
};

 // Sample DNA and RNA sequences
 const dnaSequence = ['A', 'T', 'G', 'C'];
 const rnaSequence = [];
 
 let score = 0;
 let level = 1;
 
 // Shuffle the DNA letter boxes
function shuffleDNA() {
    const dnaSequenceContainer = document.getElementById('dna-sequence');
    const dnaLetters = Array.from(dnaSequenceContainer.children);
    for (let i = dnaLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      dnaSequenceContainer.insertBefore(dnaLetters[j], dnaLetters[i]);
    }
  }
  
  // Function to handle DNA letter drag start event
  function dragStart(event) {
    const dnaLetter = event.target.textContent;
    event.dataTransfer.setData('text', dnaLetter);
  }
  
  // Function to handle RNA letter drag over event
  function dragOver(event) {
    event.preventDefault();
  }
  
 // Function to handle RNA letter drop event
 function drop(event) {
    event.preventDefault();
    const dnaLetter = event.dataTransfer.getData('text');
    const rnaBox = event.target;
    const existingLetter = rnaBox.textContent;
    if (existingLetter === '') {
      rnaBox.textContent = dnaLetter;
    }
  }
  
  // Attach event listeners to DNA letter boxes
  const dnaBoxes = document.querySelectorAll('.dna-letter');
  dnaBoxes.forEach(function(dnaBox) {
    dnaBox.addEventListener('dragstart', dragStart);
  });
  
  // Attach event listeners to RNA letter boxes
  const rnaBoxes = document.querySelectorAll('.rna-letter');
  rnaBoxes.forEach(function(rnaBox) {
    rnaBox.addEventListener('dragover', dragOver);
    rnaBox.addEventListener('drop', drop);
  });

// Function to get the polypeptide name from the RNA sequence
function getPolypeptideName(rnaSequence) {
  const rnaSequenceString = rnaSequence.join('');
  return polypeptideDatabase[rnaSequenceString] || 'Unknown';
}

// Event listener for drag and drop functionality
document.addEventListener('drop', function(event) {
  event.preventDefault();
  const dnaLetter = event.dataTransfer.getData('text');
  const rnaLetter = event.target.getAttribute('data-rna');

  if (checkMatch(dnaLetter, rnaLetter)) {
    // If DNA and RNA letters match, add the RNA letter to the sequence
    const rnaBox = event.target;
    rnaBox.textContent = dnaLetter;
    rnaSequence.push(dnaLetter);
    console.log('Match!');

    // Increase the score
    score += 10;

    // Check if the RNA sequence is complete
    if (rnaSequence.length === dnaSequence.length) {
      console.log('RNA sequence complete!');
      // Form the polypeptide name
      const polypeptideName = getPolypeptideName(rnaSequence);
      console.log('Polypeptide:', polypeptideName);
      // Reset the RNA sequence
      rnaSequence.length = 0;
      // Update the polypeptide circle color
      const polypeptideCircle = document.getElementById('polypeptide-circle');
      polypeptideCircle.style.backgroundColor = getRandomColor();
    }
  } else {
    console.log('No match!');
    // Decrease the score for a wrong match
    score -= 5;
  }

  // Update the score and level display
  updateScoreAndLevel();
});

// Function to check if the DNA and RNA letters match
function checkMatch(dna, rna) {
    const dnaIndex = dnaLetters.indexOf(dna);
    const rnaIndex = rnaLetters.indexOf(rna);
    return dnaIndex === rnaIndex;
  }
  
// Function to update the score and level display
function updateScoreAndLevel() {
  const scoreElement = document.getElementById('score');
  const levelElement = document.getElementById('level');

  scoreElement.textContent = `Score: ${score}`;
  levelElement.textContent = `Level: ${level}`;
}

// Generate a random color for the polypeptide circle
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


 
  


  


    
  
  
  
  