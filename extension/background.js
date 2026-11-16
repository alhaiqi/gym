// Opens the Gym Log or Groceries site, reusing an open tab so each list stays in one place.
const GYM = "https://alhaiqi.github.io/gym/";
const GROCERIES = "https://alhaiqi.github.io/groceries/";
async function openApp(url, exclude) {
  const tabs = (await chrome.tabs.query({url: url + "*"})).filter(t => !exclude || !t.url.startsWith(exclude));
  if (tabs.length) {
    await chrome.tabs.update(tabs[0].id, {active: true});
    await chrome.windows.update(tabs[0].windowId, {focused: true});
  } else {
    await chrome.tabs.create({url});
  }
}
chrome.action.onClicked.addListener(() => openApp(GYM, GROCERIES));
chrome.commands.onCommand.addListener(cmd => { if (cmd === "open-groceries") openApp(GROCERIES); });
