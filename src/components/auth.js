import React from 'react';
import { gapi } from 'gapi-script';
import { useSelector, useDispatch } from 'react-redux';
import { videoGetter, authorize } from '../actions'
import logo from '../images/logo.png';

function Auth() {
  
  const videos = useSelector(state => state.videos);
  const isAuth = useSelector(state => state.isAuth);
  const dispatch = useDispatch();
  const KEY = 'AIzaSyBbNqm5bATtenilmrZkboTFSRnJt_JClrE';
  const CLIENT_ID = '762630584131-gp098uj8t94cotlipsmd3nvm5p5qcbv1.apps.googleusercontent.com';

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { 
          console.log("GAPI client loaded for API"); 
          if(!isAuth) {
            dispatch(authorize());
          }
        },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 15,
      "order": "date",
      "publishedAfter": "2019-04-08T00:00:00Z",
      "q": "javascript|python -basics"
    })
        .then(function(response) {
                const items = response.result.items;
                const sortedInfo = [];
                items.forEach(el => {
                  sortedInfo.push({
                    title: el.snippet.title,
                    date: new Date(el.snippet.publishedAt),
                    thumb: el.snippet.thumbnails.medium.url
                  })
                });
                sortedInfo.slice().sort((a, b) => b.date - a.date);
                console.log("Items:", items);
                console.log("Sorted info:", sortedInfo);
                if(videos.length === 0) {
                  dispatch(videoGetter(sortedInfo));
                }
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: CLIENT_ID});
  });
  if (isAuth) {
    return (
      <div className="auth">
        <img className="logo" src={logo} alt=""/>
        <button onClick={() => authenticate().then(loadClient())}>Авторизоваться</button>
        <button onClick={() => execute()}>Показать видео</button>
      </div>
    )
  } else {
    return (
      <div className="auth">
        <img className="logo" src={logo} alt=""/>
        <button onClick={() => authenticate().then(loadClient())}>Авторизоваться</button>
      </div>
    )
  }
  
}

export default Auth;