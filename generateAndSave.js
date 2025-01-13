const fs = require("fs");

// Generate emails with hash table storage
const generateAndStoreEmails = (count) => {
    const domain = "@example.com";
    // Use Object.create(null) for better performance
    const emailHashTable = Object.create(null);
    
    const randomString = (length) => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // Generate and store emails in hash table
    for (let i = 1; i <= count; i++) {
        const prefix = `${randomString(6)}${i}`;
        const email = `${prefix}${domain}`;
        // Store email as key and include additional data
        emailHashTable[email] = {
            id: i,
            email: email
        };
    }

    // Save hash table to file
    fs.writeFileSync(
        "emails_hash.json", 
        JSON.stringify(emailHashTable, null, 2)
    );

    // Example of how to use the hash table
    console.log("Hash Table Example:");
    const sampleEmail = Object.keys(emailHashTable)[0];
    console.log(`Looking up ${sampleEmail}:`, emailHashTable[sampleEmail]);

    return emailHashTable;
};

// Generate 100,000 emails in hash table format
console.time('Generation Time');
const emailsHash = generateAndStoreEmails(100000);
console.timeEnd('Generation Time');

// Example of how to read and use the stored hash table
const readAndUseHashTable = () => {
    const storedHashTable = JSON.parse(
        fs.readFileSync('emails_hash.json', 'utf8')
    );
    
    // Example lookup
    const randomEmail = Object.keys(storedHashTable)[
        Math.floor(Math.random() * 1000000)
    ];
    
    console.log('\nLooking up from stored hash table:');
    console.time('Lookup Time');
    const result = storedHashTable[randomEmail];
    console.timeEnd('Lookup Time');
    console.log('Result:', result);
};

// Test the stored hash table
readAndUseHashTable();