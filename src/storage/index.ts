const request = window.indexedDB.open("MyTestDatabase", 1);

request.onerror = (event) => {
  console.error(event);
};

request.onsuccess = (event) => {
  console.info(event);
};
