const wordCategories = {
        Animals: ["Dog", "Cat", "Elephant", "Lion", "Tiger", "Bear", "Deer", "Wolf", "Jaguar"],
        Countries: ["India", "China", "France", "Nepal", "Brazil", "Canada", "United Kingdom", "Germany", "Italy"],
        Indian_Rulers: ["Chhatrapati Shivaji Maharaj", "Prithvi Raj Chauhan", "Maharana Pratap", "Samrat Ashoka", "Bindusar", "Chandragupta Maurya", "Razia Sultana", "Rani LakshmiBai", "Akbar"],
        Indian_Cities: ["Bengaluru", "Mumbai", "Bhopal", "Noida", "Delhi", "Kolkata", "Jaipur", "Ayodhya", "Prayagraj"],
        Technology: ["Smartphone", "Laptop", "Tablet", "Camera", "Electric Vehicle", "Neuralink", "Artificial Intelligence", "Machine Learning", "Data Science"],
        Superheros: ["Thor", "Black Panther", "Wolverine", "Spiderman", "Batman", "Ironman", "Captain America", "Shaktiman", "Hulk"],
        Drinks: ["Coffee", "Tea", "Soda", "Juice", "Lassi", "Butter Milk", "Water", "Mocktail", "Smoothie"],
        Professions: ["Doctor", "Teacher", "Engineer", "Lawyer", "Astronaut", "Soldier", "Chef", "Pilot", "Scientist"],
        Miscellaneous: ["Christmas", "Halloween", "Thanksgiving", "Easter", "football", "basketball", "cricket", "tennis", "car", "bus", "train", "airplane", "reading", "painting", "gardening", "cooking", "Greek gods", "Norse gods", "Egyptian gods"]
    };

    const choice = document.querySelector('#choicefield');
    const enteredValue = document.querySelector('#guessfield')
    const form = document.getElementById('wordguessform')
    const attempt = document.querySelector('#attempts')
    const helpingpara = document.getElementById('hint')
    let prevguess = []; // Keep this as an array
    const guessesDisplay = document.getElementById('guesses');
    const restart = document.getElementById('playagain')


    let selectedPreference = '';
    let unique = ''; // Initialize with an empty string


   

    // ----------- Selecting a Category ------------

    choice.addEventListener('change', function () {
        selectedPreference = choice.value;
        console.log(selectedPreference); // For testing purposes
        getuniquevalue(choice, selectedPreference);
        // console.log(unique) // test case ------ accessible
    });



    // --------- Generating a unique word to play ------------

    const getuniquevalue = (choice, selectedPreference) => {
        // Get a random value from the selected category
        const categoryValues = wordCategories[selectedPreference];
        if (categoryValues) {
            const randomIndex = Math.floor(Math.random() * categoryValues.length);
            unique = categoryValues[randomIndex];
        } else {
            console.error("Category not found");
            unique = "N/A"; // Or handle the error in a different way
        }

        console.log(unique); // For testing purposes ----- accessible
    }



    // --------------  Now Guess Word Section Begins ---------

    let enteredVal = '';
    let wordguess = 0;


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        enteredVal = enteredValue.value.trim();
        console.log(enteredVal) // test case 


        const wordPattern = /^[A-Za-z\s]+$/;

        // if user enters a value with reference to any other datatype except string then

        if (enteredVal == "" || !(wordPattern.test(enteredVal))) {
            alert("Please Enter a Valid String")
            enteredValue.value = '';
        }

        else if (enteredVal !== "" && (wordPattern.test(enteredVal)) && selectedPreference) {                // if user enters a string
            updateattempts();
            prevguess.push(enteredVal);
            document.getElementById('guesses').innerHTML = prevguess.join(",")
            checkguess(unique, enteredVal);

            enteredValue.value = '';

        }

    })


    // ------------ check guess function -------------

    const checkguess = (unique, enteredVal) => {

        if ((wordguess <= 3 ) && (unique === enteredVal || unique.toLowerCase() === enteredVal.toLowerCase())) {
            displaymessage("Incredible, You have nailed it");

            endGame();

        }

       else if ((wordguess == 3) && (unique !== enteredVal || unique.toLowerCase() !== enteredVal.toLowerCase()) ) {
            displaymessage(`Game Over, The Word was ${unique}`);
            endGame();

        }

        
        else if (unique !== enteredVal) {
            const random = (Math.random() * unique.length);

            if (random >= 2.5 && random < 5) {

                if (unique.length >= 9) {
                    hintfive(unique);
                } else {

                    hintone(unique);
                }
            }
            else if (random < 2.5) {
                if (unique.length >= 9) {
                    hintfive(unique);
                } else {

                    hintwo(unique);
                }
            }

            else if (random >= 5 && random < 7.5) {
                if (unique.length >= 9) {
                    hintfive(unique);
                } else {

                    hinthree(unique);
                }
            }
            else if (random >= 7.5) {
                if (unique.length >= 9) {
                    hintfive(unique);
                } else {

                    hintfour(unique);
                }
            }
            else {
                helpingpara.innerHTML = 'No hints BadLuck!'
            }


        }
    }

    // -------------------------------------------------------------

    const displaymessage = (m) => {
        helpingpara.innerHTML = `<h6>${m}</h6>`
    }

    
    const updateattempts = () => {
        wordguess++;
        attempt.innerHTML = `${3 - wordguess}`
    }


    // ------------- hint functions ---------------

    const hintone = (unique) => {     // string length hint
        helpingpara.innerHTML = `<h6> The word length is ${unique.length}</h6>`
    }

    const hintwo = (unique) => {
        // last second and second index value shown
        helpingpara.innerHTML = `<h6>The last second letter of the word is ${unique.charAt(unique.length - 2)} and second letter is ${unique.charAt(1)}</h6>`

    }

    const hinthree = (unique) => {
        // showing the last letter 
        helpingpara.innerHTML = `<h6>The last letter of the word is ${unique.charAt(unique.length - 1)}</h6>`
    }

    const hintfour = (unique) => {
        // showing the first letter
        helpingpara.innerHTML = `<h6>The first letter of the word is ${unique.charAt(0)}</h6>`
    }

    const hintfive = (unique) => {

        helpingpara.innerHTML = `<h6>The letters at position '2', '4', and '6' are "${unique.charAt(1)}", "${unique.charAt(3)}" and "${unique.charAt(5)}"</h6>`

    }
    // ----------------------------

    const endGame = () => {
        document.querySelector('#subt').disabled = true;
        document.querySelector('#guessfield').disabled = true;
        document.querySelector('#choicefield').disabled = true;

    }

    restart.addEventListener('click', function(e){
            e.preventDefault();
            newGame();
        })

    const newGame = () => {
        document.querySelector('#subt').disabled = false;
        document.querySelector('#guessfield').disabled = false;
        
        document.querySelector('#choicefield').disabled = false;
        choice.value = '';
        selectedPreference = '';

        prevguess = [];
        wordguess = 0;
        attempt.innerHTML = `<b>${3 - wordguess}</b>`;
        helpingpara.innerHTML = '';
        document.getElementById('guesses').innerHTML = '';
    }
