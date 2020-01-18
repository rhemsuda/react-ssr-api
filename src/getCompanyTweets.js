const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.twitter.com/',
  timeout: 1000,
  headers: {
    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAOvw%2BQAAAAAAWvYYk0fzdrAmN%2Ft3x5I%2Bq%2BWf7h8%3D0Vj5lqVuU09uLTyVee3cL80lohPOB3PSkoR3NvXv1vG4f77uBY', 
    'Accept-Encoding': 'application/gzip'
  }
});

const getCompanyTweets = (screenName, numberOfTweets) => {
  return new Promise((resolve, reject) => {
    instance.get('/1.1/statuses/user_timeline.json', {
      params: {
        screen_name: screenName,
        trim_user: true,
        exclude_replies: true,
        include_rts: false,
        count: numberOfTweets
      }
    }).then(function (response) {
      const statusIds = [];
      response.data.forEach(data => {
        console.log('data', data);
        const dataObj = {
          id_str: data.id_str,
          user: data.user,
          text: data.text,
          create_at: data.created_at,
          favorite_count: data.favorite_count,
          retweet_count: data.retweet_count,
          entities: data.entities
        };
        statusIds.push(data.id_str);
      })
      resolve({statusIds});
    })
    .catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}

module.exports = { getCompanyTweets }