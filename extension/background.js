// Opens the Gym Log site. Reuses an open tab so your log (saved by the site) stays in one place.
const APP_URL = "https://alhaiqi.github.io/gym/";
chrome.action.onClicked.addListener(async () => {
  const tabs = await chrome.tabs.query({url: APP_URL + "*"});
  if (tabs.length) {
    await chrome.tabs.update(tabs[0].id, {active: true});
    await chrome.windows.update(tabs[0].windowId, {focused: true});
  } else {
    await chrome.tabs.create({url: APP_URL});
  }
});
