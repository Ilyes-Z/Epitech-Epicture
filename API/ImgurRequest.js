import React from 'react';

const clientId = "";
const clientSecret = "";
const Authenticate = React.createContext();

const AuthToImgur = (oauth) => {
  if (oauth.access_token && oauth.expires_in && oauth.refresh_token) {
    return (true);
  }
  return (false);
};

const Sleeper = (timer) => {
  return new Promise(res => {setTimeout(res, timer);});
};

const SearchRequest = async (request, status) => {
  let uri = "https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=false";

  if (status == true) {
    uri = "https://api.imgur.com/3/gallery/search/time/all/1?q=" + request;
  }
  try {
    const topic = await(
      fetch(uri, { method: 'GET', headers: { Authorization: `Client-ID ${clientId}` }})
        .then((res) => res.json())
        .then((json) => {
          if (json.success == true) {
            return (json.data);
          } else {
            return null;
          }
        }).catch((err) => console.error(err))
    );
    if (topic[0] == null) {
      console.log("post not result");
      return (null);
    } else {
      console.log("post found");
      return (topic);
    }
  } catch(err) {
    console.log(err);
  }

}

const DisplayPicture = (picture) => {
  return ("https://i.imgur.com/" + picture + ".jpg");
}

const UploadRequest = async (OAuth, post) => {

  try {
    let isUploaded = false;
    const Data = new FormData();
    Data.append("image", post.base64);
    Data.append("type", "base64");

    const result = await (
        fetch('https://api.imgur.com/3/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OAuth.access_token}`
            },
            body: Data
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success == true) {
                    console.log("uploaded");
                    isUploaded = true;
                } else
                    console.log("not uploaded");
                    return (null);
            })
            .catch((err) => {
                console.error(err);
            })
    );
    return isUploaded;
    } catch(err) {
            console.log(err);
    }
}

const FavRequest = async (OAuth) => {
  try {
      const favPic = await (
          fetch(`https://api.imgur.com/3/account/${OAuth.account_username}/favorites/`, {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${OAuth.access_token}`
              }
          })
              .then((res) => res.json())
              .then((json) => {
                  if (json.success == true) {
                      return json.data;
                  } else {
                      return null;
                  }
              })
              .catch((error) => console.error(error))
      );
      if (favPic[0] == null) {
          console.log("FavPic not found");
          return (null);
      } else {
          console.log("FavPic found");
          return (favPic);
      }
  } catch (err) {
      console.log(err);
  }
}

const FavPostManagement = async (OAuth, pics) => {
      try {
        const fav = await (
            fetch(`https://api.imgur.com/post/v1/posts/${pics}/favorite?client_id=${clientId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${OAuth.access_token}`
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success == true) {
                        console.log("added to fav");
                    } else {
                      console.log("not added to fav");
                    }
                })
                .catch((err) => console.error(err))
        )
    } catch (err) {
        console.log(err);
    }
}

const UserGalleryRequest = async (OAuth) => {
  try {
      const pics = await (
          fetch(`https://api.imgur.com/3/account/${OAuth.account_username}/images/`, {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${OAuth.access_token}`
              }
          })
              .then((res) => res.json())
              .then((json) => {
                  if (json.success == true) {
                      return json.data;
                  } else {
                      return null;
                  }
              })
              .catch((err) => console.error(err))
      );
      if (pics[0] == null) {
          console.log("Pics not found");
          return null;
      } else {
          console.log("Pics found");
          return pics;
      }
  } catch (err) {
      console.log(err);
  }
}

// const updateUploadedPicture = (OAuth, title, descritpion) => {
//   // https://api.imgur.com/3/image/{{imageHash}}/
//   let isUpdate = false;
//   const Data = new FormData();
//   Data.append("title", title);
//   Data.append("description", descritpion);

//   const result = await (
//       fetch(`https://api.imgur.com/3/image/{{imageHash}}/`, {
//           method: 'POST',
//           headers: {
//               Authorization: `Bearer ${OAuth.access_token}`
//           },
//           body: Data
//       })
//           .then((response) => response.json())
//           .then((json) => {
//               if (json.success == true) {
//                   console.log("changed");
//                   isUpdate = true;
//               } else
//                   console.log("not changed");
//                   return (null);
//           })
//           .catch((err) => {
//               console.error(err);
//           })
//   );
//   return isUpdate;
// }

const UpVote = async (OAuth, post) => {
  try {
    const up = await (
        fetch(`https://api.imgur.com/3/gallery/${post}/vote/up`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OAuth.access_token}`
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success == true) {
                    console.log("up voted");
                } else {
                  console.log("not up voted");
                }
            })
            .catch((err) => console.error(err))
    );
} catch (err) {
    console.log(err);
}
}

const DownVote = async (OAuth, post) => {
  try {
    const down = await (
        fetch(`https://api.imgur.com/3/gallery/${post}/vote/down`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OAuth.access_token}`
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success == true) {
                    console.log("down voted");
                } else {
                  console.log("not down voted");
                }
            })
            .catch((err) => console.error(err))
    );
} catch (err) {
    console.log(err);
}
}

export { clientId, clientSecret, Authenticate, AuthToImgur, SearchRequest, DisplayPicture, UploadRequest, FavRequest, UserGalleryRequest, Sleeper, FavPostManagement, UpVote, DownVote }