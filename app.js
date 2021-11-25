const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Creating add command
// Using ES6 and arrow functions
yargs.command ({
    command: 'add',
    describe: 'Adding a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'    
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    } 
})

// Creating remove command
// Using ES6 and arrow functions
yargs.command ({
    command: 'remove',
    describe: 'Removing a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }   
})

// Creating list command
yargs.command ({
    command: 'list',
    describe: 'Listing a new note!',
    handler(argv) {
        console.log(chalk.yellow('Your Notes:- '))
        notes.listNotes()
    }   
})

// Creating read command
yargs.command ({
    command: 'read',
    describe: 'Reading a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,               // Defines if it is required or not
            type: 'string'
        }   
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }   
})

yargs.parse();