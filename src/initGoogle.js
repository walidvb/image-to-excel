import config from './googleConfig'
async function initClient() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
      addView(google.picker.ViewId.DOCS).
      setOAuthToken(oauthToken).
      setDeveloperKey(developerKey).
      setCallback(pickerCallback).
      build();
    picker.setVisible(true);
  }
}
  await window.gapi.client
  .init({
    apiKey: config.apiKey,
    clientId: config.clientId,
    discoveryDocs: config.discoveryDocs,
    scopes: config.scopes,
  })
}

export default initGoogle