const login = (username, password) => {
  return new Promise((resolve, reject) => {
    let usersCollection = db.collection('users');
    usersCollection.where(
      'username', '==', username, '&&', 
      'password', '==', password
    )
    .get()
    .then(snapshot => {
      let data = snapshot.docs[0].data();
      let user = {
        name: data.name
      }
      resolve(user);
    });
  });
}

module.exports = { login }