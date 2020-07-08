const domain = process.env.GATSBY_AUTH0_DOMAIN;

const updateUserMetadata = async ({optIn, user, getAccessTokenSilently}) => {
  
  // request token again
  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user update:current_user_metadata create:current_user_metadata",
    });

    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    return await fetch(userDetailsByIdUrl, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'user_metadata': {
          'opt-in': optIn
        }
      })
    });
  } catch (e) {
    console.log(e.message);
  }
}

export default {
  update: updateUserMetadata
}