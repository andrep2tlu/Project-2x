const { truncate } = require("node:fs");

let startDate = null;
let endTime = null;
let startRemaining = null;

// prefer absolute path so it doesn't depend on current HTML location
async function loadData(useLocal = false) {
  const url = useLocal ? '../txt/void_Trader.json' : 'https://api.warframestat.us/pc/voidTrader';
  console.log('Loading from', url);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
  return resp.json();
}

async function fetchdata(useLocal = false) {
  try {
    const data = await loadData(useLocal);

    const startTime = data.activation;
    if (startTime) {
      startDate = new Date(startTime);
      const now = new Date();
      startRemaining = startDate - now;
      console.log('startDate:', startDate);
      console.log('startRemaining (ms):', startRemaining);
    } else if (data.expiry) {
      endTime = new Date(data.expiry) - new Date();
      console.log('endTime (ms):', endTime);
      console.log(data.inventory);
    } else {
      console.log('No activation or expiry in data.');
    }
  } catch (err) {
    console.error(err);
    // showMessage("Error: " + err.message)  // your UI handler
  }
}

// use remote API
fetchdata(truncate);

// use local test file
// fetchdata(true);
