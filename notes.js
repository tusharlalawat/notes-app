const chalk = require('chalk')
const fs = require('fs')

// Function to add new note
const addNotes = (title, body) => {
    const notes = loadNotes()  // Loads all previous notes
    const duplicateNotes = notes.filter((note) => note.title === title) // Used find duplicate notes(gonna travers all the elements of the array)
    const duplicateNote = notes.find((note) => note.title === title)    // Used find duplicate notes(stops where a duplicate element is find)

    if(!duplicateNote){
        notes.push({          // Adding new note to the list
            title: title,
            body: body
        })
        saveNotes(notes)      // Saving the new notes list
        console.log(chalk.green('New note added successfully!'))
    } else {
        console.log(chalk.red('Title already exists!'))
    }
}

// Function to delete a existing note
const removeNotes = (title) => {
    const notes = loadNotes()        // Loads all previous notes
    const notesToKeep = notes.filter((note) => note.title !== title)  // Used to find weather te given title exist or not(if the title does not matces with the given title than it will be kept in new array 'noteToKeep')

    if(notesToKeep.length !== notes.length){      // If the length of the notes array does not matches the notesToKeep array than the note is removed 
        console.log(chalk.green('Note Rmoved Successfully!'))
        saveNotes(notesToKeep)
    } else {    
        console.log(chalk.red('Note not found!'))
    }
}

// Function to list all the notes(return title of all the notes)
const listNotes = () => {
    const notes = loadNotes()     // Loads all previous notes

    var i = 1
    notes.forEach(note => {
        console.log(chalk.yellow(i) + chalk.yellow('.) ') + note.title)
        i++
    });
}

// Function to read(body) of a note with given title
const readNotes = (title) => {
    const notes = loadNotes()  // Loads all previous notes
    const findNote = notes.find((note) => note.title === title)

    if(findNote){
        console.log(chalk.green.bold(findNote.title) +  ':- ' + findNote.body)
    } else {
        console.log(chalk.red('Note not found!'))
    }
}

// Function to save notes to 'notes.json' file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Function to load all previous notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')       // Return data in buffer format
        const dataJSON = dataBuffer.toString()                 // Return data in string format
        return JSON.parse(dataJSON)                            // Converts data into objects
    } catch(e) {
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}