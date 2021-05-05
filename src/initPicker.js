import config from './googleConfig'
async function initPicker(cb) {
  const oauthToken = localStorage.getItem('g_oauth')
  if (oauthToken) {
    var picker = new google.picker.PickerBuilder().
      addView(google.picker.ViewId.DOCS).
      setOAuthToken(oauthToken).
      setDeveloperKey(config.apiKey).
      setCallback(cb).
      build();
    picker.setVisible(true);
  }
} 

export default initPicker