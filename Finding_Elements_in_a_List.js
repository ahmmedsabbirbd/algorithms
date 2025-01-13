// Problem: Finding Elements in a List
// Let's say you need to find a user by email in an JSON object of 100000 (One hundred thousand) users.

const fs = require('fs');

// Read the JSON hash table file
function readEmails(filename) {
    try {
        const fileContent = fs.readFileSync(filename, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading file:', error.message);
        return {};
    }
}

// Wrong Solution (Linear Search)
function findUserBadWay(userMap, targetEmail) {
    console.time('Linear Search');
    const users = Object.values(userMap);
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === targetEmail) {
            console.timeEnd('Linear Search');
            return users[i];
        }
    }
    console.timeEnd('Linear Search');
    return null;
}

// Better Solution (Hash Table / Object)
function findUserGoodWay(userMap) {
    console.time('Hash Table Creation');
    // No need to create hash table as data is already in hash format
    console.timeEnd('Hash Table Creation');
    
    return (email) => {
        console.time('Hash Table Search');
        const result = userMap[email] || null;
        console.timeEnd('Hash Table Search');
        return result;
    };
}

// Main process
const userMap = readEmails('emails_hash.json');
const userCount = Object.keys(userMap).length;
console.log(`Loaded ${userCount} emails from file`);

// Test both methods
function runTests() {
    // 1. Test with existing email (first email in list)
    const existingEmail = Object.keys(userMap)[0];
    console.log('\nTest 1: Searching for existing email:', existingEmail);
    
    console.log('\nLinear Search Result:');
    const linearResult = findUserBadWay(userMap, existingEmail);
    console.log(linearResult);
    
    const findUserFast = findUserGoodWay(userMap);
    console.log('\nHash Table Search Result:');
    const hashResult = findUserFast(existingEmail);
    console.log(hashResult);
    
    // 2. Test with non-existent email
    const nonExistentEmail = 'notfound@example.com';
    console.log('\nTest 2: Searching for non-existent email:', nonExistentEmail);
    
    console.log('\nLinear Search Result:');
    const linearResult2 = findUserBadWay(userMap, nonExistentEmail);
    console.log(linearResult2);
    
    console.log('\nHash Table Search Result:');
    const hashResult2 = findUserFast(nonExistentEmail);
    console.log(hashResult2);
    
    // 3. Test with last email in list (worst case for linear search)
    const lastEmail = Object.keys(userMap)[userCount - 1];
    console.log('\nTest 3: Searching for last email in list:', lastEmail);
    
    console.log('\nLinear Search Result:');
    const linearResult3 = findUserBadWay(userMap, lastEmail);
    console.log(linearResult3);
    
    console.log('\nHash Table Search Result:');
    const hashResult3 = findUserFast(lastEmail);
    console.log(hashResult3);
}

// Run the tests
runTests();