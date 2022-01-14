import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('Update to the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ id: id, content: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('text updated in the database', result);
};

export const postDb = async (content)  => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ content: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('new text saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
    // Create a connection to the database database and version we want to use.
    const textDb = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = textDb.transaction('jate', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('jate');
  
    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();
  
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
  };

initdb();
