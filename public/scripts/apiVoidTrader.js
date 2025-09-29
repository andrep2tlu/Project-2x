let startDate = null;
let endTime = null;
let startRemaining = null;

// prefer absolute path so it doesn't depend on current HTML location
async function loadData(useLocal = false) {
  const url = useLocal ? '/txt/void_Trader.json' : 'https://api.warframestat.us/pc/voidTrader';
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
    // render data to page
    renderTradeData(data);
  } catch (err) {
    console.error(err);
    // showMessage("Error: " + err.message)  // your UI handler
  }
}

function showMessage(msg) {
  const el = document.getElementById("outputTrade");
  if (!el) {
    console.warn('No #outputTrade element found to show message');
    return;
  }
  el.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
}

function renderTradeData(data) {
  if (!data) return;
  const el = document.getElementById('outputTrade');
  if (!el) return;
  el.innerHTML = ''; // clear existing

  // activation / expiry
  if (data.activation) {
    const act = new Date(data.activation).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    el.insertAdjacentHTML('beforeend', `<h3>Activation: ${act}</h3>`);
  }
  if (data.expiry) {
    const exp = new Date(data.expiry).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    el.insertAdjacentHTML('beforeend', `<h3>Expiry: ${exp}</h3>`);
  }

  // inventory
  if (Array.isArray(data.inventory) && data.inventory.length) {
    el.insertAdjacentHTML('beforeend', '<h4>Inventory</h4>');
    const list = document.createElement('ul');
    data.inventory.forEach(item => {
      const li = document.createElement('li');
      // show name, price, and tag if available
      const name = item.item ? item.item : (item.tag || 'Unknown');
      const price = item.ducats ? ` — ${item.ducats} Ducats` : '';
      li.textContent = `${name}${price}`;
      list.appendChild(li);
    });
    el.appendChild(list);
  } else if (data.inventory && typeof data.inventory === 'object') {
    // some API responses may include inventory as an object
    el.insertAdjacentHTML('beforeend', '<h4>Inventory (raw)</h4>');
    el.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data.inventory, null, 2)}</pre>`);
  } else {
    el.insertAdjacentHTML('beforeend', '<p>No inventory data.</p>');
  }
}

// use remote API
//fetchdata(false);

// use local test file
fetchdata(true);
