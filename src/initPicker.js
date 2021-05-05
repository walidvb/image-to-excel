import config from './googleConfig'
async function initPicker(cb) {
  const oauthToken = localStorage.getItem('g_oauth')
  if (oauthToken) {
    var view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
    view.setMimeTypes('application/vnd.google-apps.folder');
    view.setSelectFolderEnabled(true);
    const groupedView = new google.picker.ViewGroup(google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS).
      addView(view)
    var picker = new google.picker.PickerBuilder().
      setMaxItems(18).
      enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
      addView(groupedView).
      setOAuthToken(oauthToken).
      setDeveloperKey(config.apiKey).
      setCallback(cb).
      build();
    picker.setVisible(true);
  }
} 

export default initPickernpx tailwindcss init - p