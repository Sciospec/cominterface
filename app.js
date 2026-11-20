'use strict';

const $=s=>document.querySelector(s);
const esc=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const GROUPS=['System','Measurement','EIS','EIT','Network','Hardware','IO / NTC','Battery','Protocol'];
let route={id:'start',option:null,tab:'overview'};
const commandEntries=()=>Object.entries(DB.commands).sort(([,a],[,b])=>a.code.localeCompare(b.code));
const note=text=>`<div class="note">${esc(text)}</div>`;
const table=(headers,rows,cl='')=>`<div class="table-wrap ${cl}"><table><thead><tr>${headers.map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const safeTable=(headers,rows,cl='')=>table(headers,rows.map(r=>r.map(esc)),cl);
const legend=()=>'<div class="legend"><span>Frame tags</span><span class="length">Length</span><span class="option">Options / switches</span><span class="data">Parameter values</span></div>';
const source=(c)=>`<p class="source-note">${esc(c.source)} · ${esc(DB.meta.manual)} · Published ${DB.meta.release}</p>`;
function routeHash(id,option=null,tab='overview'){return '#'+(selectedDevice?selectedDevice+'/':'')+id+(option?'/'+encodeURIComponent(option):'')+(tab!=='overview'?'/'+tab:'');}
function routeFromHash(hash){const parts=hash.replace(/^#/,'').split('/').map(part=>{try{return decodeURIComponent(part);}catch{return part;}});let id=parts[0]||'start';if(!Object.hasOwn(DB.commands,id)&&!['start','protocol','timing','workflows'].includes(id))id='start';const c=DB.commands[id];const opt=c?.options.find(o=>o.code===parts[1])||c?.options[0];const tab=['overview','parameters','examples','notes'].includes(parts.at(-1))?parts.at(-1):'overview';return{id,option:opt?.code||null,tab};}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),1800);}
function frame(raw,received=false){const parts=DB.frames[raw];if(!parts)return `<pre>${esc(raw)}</pre>`;return `<div class="frame" data-raw="${esc(raw)}"><div class="frame-top"><span>${received?'Received frame':'Binary frame'} · select a field for details</span><button class="copy" type="button">Copy bytes</button></div><div class="byte-parts">${parts.map((f,i)=>`<button type="button" class="byte ${f.type}" data-field="${i}" title="${esc(f.desc)}" aria-pressed="false"><code>${esc(f.bytes)}</code><small>${esc(f.label)}</small></button>`).join('')}</div><div class="field-detail" aria-live="polite">${esc(parts[1].desc)}</div></div>`;}
function concept(key){const h=DB.concepts[key];if(!h)return '';return `<details><summary>${esc(h.title)}</summary><p>${esc(h.body)}</p><p><strong>Encoding:</strong> ${esc(h.encoding)}</p><p class="source-note">${esc(h.source)}</p></details>`;}
function examples(o){return o.examples.filter(e=>!e.models||e.models.includes(selectedDevice)).map(e=>`<h3>${esc(e.title)}</h3>${frame(e.hex,e.received||o.request.startsWith('Device'))}<p class="example-caption">${esc(e.why)}</p>`).join('');}
function head(eyebrow,title,description,badge=''){return `<div class="page-head"><div class="eyebrow">${esc(eyebrow)}</div><div class="head-row"><h1>${title}</h1>${badge?`<span class="pill">${esc(badge)}</span>`:''}</div><p class="lead">${esc(description)}</p></div>`;}
function syntax(o){return `<div class="syntax-grid"><div class="syntax"><label>Request / incoming event</label><code>${esc(o.request)}</code></div><div class="syntax"><label>Expected response</label><code>${esc(o.response)}</code></div></div>`;}
function optionBody(c,o){return `<h2>${esc(o.code)} · ${esc(o.title)}</h2>${syntax(o)}<h3>Parameters & response fields</h3>${o.fields.length?safeTable(['Field','Bytes','Format','Unit','Values / constraints','Default'],o.fields,'parameters'):'<p>No additional fields.</p>'} ${o.notes?note(o.notes):''}${(o.help||[]).map(concept).join('')}${o.examples.length?`<h3>Examples</h3>${legend()}${examples(o)}`:''}${source(c)}`;}
function renderCommand(){const c=DB.commands[route.id];const o=c.options.find(x=>x.code===route.option)||c.options[0];let html=head(c.group+' / command reference',`<code>${c.code}</code> · ${esc(c.name)}`,c.description,c.source);html+=`<div class="tabs" role="tablist" aria-label="Command sections">${['overview','parameters','examples','notes'].map(t=>`<button role="tab" class="tab" id="tab-${t}" aria-selected="${route.tab===t}" aria-controls="command-panel" data-tab="${t}" type="button">${t[0].toUpperCase()+t.slice(1)}</button>`).join('')}</div><section id="command-panel" role="tabpanel" aria-labelledby="tab-${route.tab}">`;
if(route.tab==='overview'){
 html+=`<h2>Options / operations</h2>${table(['Option','Function','Request / event','Return'],c.options.map(x=>[`<a href="${routeHash(route.id,x.code,'parameters')}">${esc(x.code)}</a>`,`<a href="${routeHash(route.id,x.code,'parameters')}">${esc(x.title)}</a>`,`<code>${esc(x.request)}</code>`,esc(x.response)]))}${c.notes?note(c.notes):''}<div class="button-row"><a class="quiet-button" href="${routeHash(route.id,o.code,'parameters')}">View parameters & examples</a></div>${source(c)}`;
}else if(route.tab==='parameters'){
 html+=`<div class="option-selector"><label for="option-select">Option / operation</label><select id="option-select">${c.options.map(x=>`<option value="${esc(x.code)}" ${x.code===o.code?'selected':''}>${esc(x.code+' · '+x.title)}</option>`).join('')}</select></div>${optionBody(c,o)}`;
}else if(route.tab==='examples'){
 html+=legend()+c.options.map(x=>`<details ${x.code===o.code?'open':''}><summary>${esc(x.code+' · '+x.title)}</summary>${examples(x)}</details>`).join('')+note('Transmit the hexadecimal values as binary bytes.');
}else{
 html+=(c.notes?note(c.notes):'')+c.options.map(x=>`<details><summary>${esc(x.code+' · '+x.title)}</summary><p>${esc(x.notes||'See Parameters for syntax and field definitions.')}</p></details>`).join('')+source(c);
}
html+='</section><button type="button" class="print-button" data-print>Print this view</button>';$('#content').innerHTML=html;
}
function step(n,title,desc,raw){return `<div class="step"><span class="step-index">${n}</span><div><h3>${esc(title)}</h3><p>${esc(desc)}</p>${raw?frame(raw):''}</div></div>`;}
function renderStart() {
  const device=DEVICES[selectedDevice];
  const description = `Reference for integrating ${device.name} over USB or Ethernet. Search for a command, inspect its fields or follow a measurement workflow.`;
  const links = `
    <div class="cards">
      <a class="entry-card" href="#protocol"><h2>Connect to an instrument</h2><p>USB, Ethernet, frame structure and acknowledgements.</p></a>
      <a class="entry-card" href="#workflows"><h2>Measurement workflows</h2><p>EIS acquisition, compensation, setup slots and EIT.</p></a>
      <a class="entry-card" href="#timing"><h2>Measurement settings</h2><p>Point Delay, Phase Sync, Sync Time and repeatability.</p></a>
    </div>`;
  const commandIndex = table(['Command', 'Function', 'Category'], commandEntries().map(([id, command]) => [
    `<a href="#${id}"><code>${command.code}</code></a>`,
    `<a href="#${id}">${esc(command.name)}</a>`,
    esc(command.group)
  ]), 'quick-index');

  $('#content').innerHTML = head('Electrical impedance spectroscopy', esc(device.name)+' API reference', description)
    + links
    + `<h2>Your first EIS measurement</h2><p>Connect the device under test using the appropriate electrode configuration. Send each request as binary bytes and wait for its acknowledgement before continuing.</p>`
    + step(1, 'Read the supported frequency range', 'The response contains the minimum and maximum AC frequencies as two big-endian float32 values in Hz.', '98 01 03 98')
    + step(2, 'Configure the frontend', 'Clear the channel stack to replace the existing routing. Then append the four-point main-port configuration shown below.', 'B0 03 FF FF FF B0')
    + frame('B0 0F 02 00 01 01 00 00 01 00 00 01 00 00 01 00 00 B0')
    + step(3, 'Initialize the frequency setup', 'Initialize an empty setup before adding frequencies.', 'B6 01 01 B6')
    + step(4, 'Add one frequency point', 'This example uses 32 kHz, Precision 1 and 0.25 V peak. Choose a frequency within the limits returned by your device.', 'B6 0D 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 B6')
    + step(5, 'Acquire a spectrum', 'This request acquires one spectrum per configured channel. A spectrum is complete once all expected frequency IDs have arrived.', 'B8 03 01 00 01 B8')
    + `<div class="page-links"><a class="quiet-button" href="#b8/data/parameters">Decode EIS data</a><a class="quiet-button" href="#workflows">Explore more workflows</a></div>`
    + (selectedDevice==='isx-3-eit'?`<h2>ISX-3 EIT option</h2><p>${commandLink('c4','01','Configure the EIT setup')} · ${commandLink('c5','02','Read back settings')} · ${commandLink('b8','02','Start EIT acquisition')}</p>`:'')
    + '<h2>Command index</h2>' + commandIndex;
}
function renderProtocol(){const statuses=DB.commands['18'];$('#content').innerHTML=head('Getting started / protocol','Frames, responses & data formats','The same command structure is used across supported master interfaces. All displayed byte values are hexadecimal.')+`<h2>Connect to the instrument</h2>
<p><strong>USB.</strong> Open the virtual COM port assigned by your operating system. On Windows, use Device Manager to identify the port.</p>
<p><strong>Ethernet.</strong> Open a TCP connection to port 5000 on the instrument. DHCP is enabled by default. Use <a href="#be/01/parameters">BE/01 over USB</a> to read the assigned address.</p>
<h2>Frame structure</h2>`+safeTable(['Field','Length','Meaning'],[['Command tag (CT)','1 byte','Identifies the command'],['Payload length (LE)','1 byte','0–255; includes option byte when present'],['Payload','LE bytes','Option byte and command data'],['End tag','1 byte','Identical to opening command tag']])+note('Total frame length = LE + 3. All multi-byte numeric fields are big-endian. Use the field-specific type: unsigned integer, IEEE 754 float32 or float64. Required fields remain required even when a default is documented.')+legend()+frame('98 01 03 98')+'<h2>Command sequencing</h2><p>Wait for ACK or NACK before the next host command. For commands with return data, response data precedes ACK. Measurement frames may interleave with responses during acquisition. An interruption over 10 ms while transmitting a frame causes a communication timeout.</p>'+frame('18 01 83 18',true)+safeTable(['Status','Meaning'],[['01','Incorrect frame syntax'],['02','Communication timeout / incomplete frame'],['04','System boot ready'],['11','TCP connection valid / watchdog message'],['81','Command not executed'],['82','Command not recognized'],['83','Command executed'],['84','System operational and ready'],['90','DC overcurrent on W ports'],['91','DC overvoltage between R and WS']])+'<h2>EIS output layouts</h2>'+safeTable(['Timestamp','Range off · LE','Range on · LE'],[['Disabled','0A','0B'],['ms · 4 bytes','0E','0F'],['µs · 5 bytes','0F','10']])+note('LE=0F has two meanings. Select the decoder from active 97/98 settings, not frame length alone. Defaults: timestamp off and range output off. Millisecond timestamp wraps after FFFFFFFF; microsecond timestamp after FFFFFFFFFF.')+frame('B8 0A 00 00 42 C8 00 00 C1 20 00 00 B8',true)+'<h2>Read firmware and device identity</h2><p><a href="#d0">D0 ARM ID</a> · <a href="#d2">D2 FPGA ID</a> · <a href="#d1">D1 device identity</a>. Check optional hardware using <a href="#b5">B5 module discovery</a>.</p>'+source(statuses);}
function renderTiming(){$('#content').innerHTML=head('Measurement settings / concepts','Timing, excitation & repeatability','Use the setting that matches the physical effect you need to control. Expand each topic for purpose, encoding and source details.')+safeTable(['Setting','When it acts','Purpose'],[['Point Delay','Current point: excitation → wait → acquisition','Let DUT settle'],['Phase Sync','Consecutive frequency transitions; first point unaffected','Avoid phase discontinuities'],['Sync Time','After the last point, before next spectrum; across channels too','Pause between spectra; SyncOut low'],['Precision','During point acquisition','Trade speed against repeatability']])+Object.keys(DB.concepts).map(concept).join('')+'<h2>Repeatability and absolute accuracy</h2><p>Repeatability describes how closely measurements agree under the same conditions. Absolute accuracy describes how closely they agree with a reference value. Use the instrument specifications to assess absolute accuracy and the Precision setting to balance repeatability and acquisition time.</p><div class="button-row"><a class="quiet-button" href="#b6/02/parameters">Single-point settings</a><a class="quiet-button" href="#b9/sync/parameters">Sync Time</a></div>';}
function renderWorkflows(){$('#content').innerHTML=head('Practical sequences','Configure, measure & read back','Always handle ACK/NACK and asynchronous incoming data. Physical connections and supported hardware remain prerequisites.')+'<h2>Verify the EIS setup</h2>'+frame('B7 01 01 B7')+note('Read total point count, then B7/04 frequency list. Expect at most 60 complete frequencies in a response frame (LE≤F1). A list of 64 frequencies is returned as 60+4, with LE F1 and 11. IDs are zero-based list positions.')+frame('B7 01 04 B7')+'<h2>Open-short-load compensation</h2><p>Configure frontend and frequencies first. Select a fixed current range for this workflow. Prepare the requested connection before acknowledging each step.</p>'+table(['Direction','Frame','Action'],[['Host','B6 01 10 B6','Start compensation; await ACK'],['Device','B7 01 13 B7','Prepare open terminals'],['Host','B6 01 11 B6','Continue; await ACK'],['Device','B7 01 14 B7','Prepare short terminals'],['Host','B6 01 11 B6','Continue; await ACK'],['Device','B7 01 15 B7','Connect known load'],['Host','B6 06 16 01 42 C8 00 00 B6','Set 100 Ω load; await ACK'],['Host','B6 01 11 B6','Continue; await ACK'],['Device','B7 01 10 B7','Compensation completed']].map(r=>r.map(esc)))+frame('B6 06 16 01 42 C8 00 00 B6')+note('B6/12 aborts an interaction. Read B7/17 status/data; compensation values are impedance components in Ω, one response per frequency for the selected 1-based channel.')+'<h2>Save and recall a setup</h2>'+frame('B7 02 20 05 B7')+frame('B6 02 20 05 B6')+note('Stores/loads complete setup including compensation in slot 5. Slots 1–255 survive restart, may be overwritten, and are not loaded automatically. Empty slots cannot be loaded. Save Settings (90) is a separate operation for supported instrument parameters.')+'<h2>Start and stop continuous acquisition</h2>'+frame('B8 03 01 00 00 B8')+frame('B8 01 00 B8')+concept('stream')+(DB.commands.c4?'<h2>EIT configuration path</h2>'+safeTable(['Order','Command option','Purpose'],[['1','C4/01','Reset EIT setup'],['2','C4/02','Burst count; 0=continuous'],['3','C4/03','Precision'],['4','C4/04','Frequency blocks; EIT count is uint16, stack ≤128'],['5','C4/05','Amplitude and explicit excitation type'],['6','C4/06','Append injection pairs; up to 64 settings'],['7','C4/09','Global gain'],['8','C4/0A','Measurement channels'],['9','B8/02','Start EIT; burst count controls automatic stop']])+frame('C4 0A 05 3D CC CC CD 03 00 00 00 01 C4')+note('EIT measurement packets require a separate format specification. The EIS output layouts apply to impedance spectra.'):'')+(DB.commands['99']?'<h2>GPIO and NTC</h2><p><a href="#99">99</a> configures all eight GPIOs through a bitmask; bit 0 corresponds to IO1. Configure direction before driving output state. <a href="#cb">CB</a> addresses individual MUX front IOs and is a separate interface. NTC parameters use float32; sensor datasheet values are required. Use the values specified for the connected sensor.</p>':'')+(DB.commands.ca?'<h2>Isolated IO</h2><p><a href="#ca">Configure IsoIOport</a> for isolated GPIO, SPI, UART and I²C.</p>':'');}
function renderNav(){const q=$('#search').value.trim().toLowerCase(),group=$('#category').value;let html='';const guides=availableGuides();if(!q&&!group){html+='<div class="nav-label">Guides</div>'+guides.map(([id,title])=>`<a class="nav-link ${route.id===id?'active':''}" ${route.id===id?'aria-current="page"':''} href="#${id}">${title}</a>`).join('');}let count=0;for(const g of GROUPS){const rows=commandEntries().filter(([id,c])=>(!group||g===group)&&c.group===g&&(!q||JSON.stringify(c).toLowerCase().includes(q)||(c.options.some(o=>(o.help||[]).some(k=>JSON.stringify(DB.concepts[k]).toLowerCase().includes(q))))));if(!rows.length)continue;html+=`<div class="nav-label">${g}</div>`+rows.map(([id,c])=>{count++;return `<a class="nav-link ${route.id===id?'active':''}" ${route.id===id?'aria-current="page"':''} href="#${id}"><code>${c.code.slice(2)}</code><span>${esc(c.name)}</span></a>`;}).join('');}if(!count)html='<div class="search-empty">No matching commands. Try another command, parameter or function name.</div>';$('#nav').innerHTML=qualifyLinks(html,selectedDevice);$('#result-count').textContent=(q||group)?`${count} matching reference pages`:'';}
const DEVICES = Object.freeze({
  eit16:{name:'EIT16', family:'eit', channels:16},
  eit32:{name:'EIT32', family:'eit', channels:32},
  eit64:{name:'EIT64', family:'eit', channels:64},
  eit128:{name:'EIT128', family:'eit', channels:128},
  eit256:{name:'EIT256', family:'eit', channels:256},
  'isx-3':{name:'ISX-3', family:'eis'},
  'isx-3mini':{name:'ISX-3mini', family:'eis'},
  'isx-3-eit':{name:'ISX-3 EIT', family:'eis'},
  'medical-research-isx-3':{name:'Medical Research ISX-3', family:'medical'},
  'csx-64':{name:'CSX-64', family:'csx'},
  'lcr-1':{name:'LCR-1', family:'lcr'},
  'lcr-3':{name:'LCR-3', family:'lcr'}
});

const FAMILIES = [
  {title:'Electrical impedance tomography', abbr:'EIT', description:'Tomography instruments with 16 to 256 channels.', devices:['eit16','eit32','eit64','eit128','eit256']},
  {title:'Electrical impedance spectroscopy', abbr:'EIS', description:'Impedance analyzers and the ISX-3 with the EIT option.', devices:['isx-3','isx-3mini','isx-3-eit','medical-research-isx-3']},
  {title:'Potentiostats', abbr:'EC', description:'Electrochemical measurement and step-based control.', devices:['csx-64']},
  {title:'LCR meters', abbr:'LCR', description:'COMInterface reference planned for the next release.', devices:['lcr-1','lcr-3']}
];

let selectedDevice = '';
let DB = window.API_LIBRARY.eis;
const hasDevice = id => Object.hasOwn(DEVICES,id);

function renderDeviceSelector() {
  const deviceList = FAMILIES.map(family => `
    <section class="device-card" aria-label="${esc(family.title)}">
      <div class="device-family">${esc(family.abbr)}</div>
      <h2>${esc(family.title)}</h2>
      <p>${esc(family.description)}</p>
      <ul class="device-list">${family.devices.map(id => `<li><a href="#${id}">${esc(DEVICES[id].name)}</a></li>`).join('')}</ul>
    </section>`).join('');
  $('#content').innerHTML = `<div class="device-home">
    ${head('Instrument integration','Sciospec COMInterface','Select your instrument to open its command reference, binary examples and measurement workflows.')}
    <h2 class="selector-heading">Select a device</h2><div class="device-grid">${deviceList}</div>
  </div>`;
}

function renderLcr(device) {
  $('#content').innerHTML = head('LCR meters',esc(device.name),'The COMInterface reference for this instrument is planned for the next release.')
    + '<a class="quiet-button" href="#devices">All devices</a>';
}

function qualifyLinks(html, device) {
  return html.replace(/href="#([^"<>]+)"/g,(match,target) => {
    if (target==='devices' || target==='main' || hasDevice(target.split('/')[0])) return match;
    const id = target.split('/')[0];
    if (Object.hasOwn(DB.commands,id) || availableGuides().some(([key])=>key===id)) {
      return `href="#${device}/${target}"`;
    }
    return match;
  });
}

function availableGuides() {
  const base = [['start','Start here'],['protocol','Connection & protocol']];
  if (['eis','medical'].includes(DEVICES[selectedDevice]?.family)) base.push(['timing','Timing & measurement settings']);
  return [...base,['workflows','Practical workflows']];
}

function commandLink(tag, code, label) {
  return `<a href="${routeHash(tag,code,'parameters')}">${esc(label)}</a>`;
}

function renderFamilyStart(device) {
  const eit = device.family==='eit';
  const description = eit
    ? `Configure excitation and collect complex electrode voltages with the ${device.channels}-channel ${device.name}.`
    : 'Configure measurement steps, route electrodes and decode impedance or time-domain data.';
  const links = `<div class="cards">
    <a class="entry-card" href="#protocol"><h2>Connect to the instrument</h2><p>Transport, frame structure and acknowledgements.</p></a>
    <a class="entry-card" href="#workflows"><h2>Configure an acquisition</h2><p>${eit?'Excitation, frequency blocks and the EIT data stream.':'Step setup, input ranges and measurement data.'}</p></a>
    <a class="entry-card" href="#${eit?'b4':'b8'}"><h2>Start, stop and decode</h2><p>Acquisition commands and the binary data layouts.</p></a>
  </div>`;
  const commands = table(['Command','Function','Category'],commandEntries().map(([id,c])=>[
    `<a href="#${id}"><code>${esc(c.code)}</code></a>`,`<a href="#${id}">${esc(c.name)}</a>`,esc(c.group)
  ]),'quick-index');
  $('#content').innerHTML = head(eit?'Electrical impedance tomography':'Potentiostat',esc(device.name)+' API reference',description)
    + links + '<h2>Identify the instrument</h2><p>Send the device information request and read the data frame before its acknowledgement.</p>'
    + frame('D1 00 D1') + '<h2>Command index</h2>' + commands;
}

function renderFamilyProtocol(device) {
  const ethernet = device.family==='eit'
    ? `<p><strong>Ethernet.</strong> Connect to the instrument TCP server on port 5000. To read the assigned address using USB, use ${commandLink('be','01','BE/01')}.</p>` : '';
  const html = head(device.name,'Connection and frame structure','Commands use a one-byte tag before and after the payload. Multi-byte numeric fields use big-endian byte order.')
    + '<h2>Connect</h2><p><strong>USB.</strong> Open the virtual COM port assigned by the operating system. On Windows, identify the port in Device Manager.</p>' + ethernet
    + '<h2>Frame layout</h2>' + safeTable(['Field','Bytes','Purpose'],[['CT',1,'Command tag'],['LE',1,'Number of payload bytes (0–255)'],['Payload','LE','Option and data fields where present'],['CT',1,'Repeats the command tag']])
    + '<p>Transmit the displayed hexadecimal values as binary bytes. The total frame size is LE + 3.</p>' + frame('D1 00 D1')
    + '<h2>Sequence commands</h2><p>Wait for ACK or NACK before sending another command. Response data precedes the acknowledgement and measurement data can arrive during command handling.</p>'
    + frame('18 01 83 18',true) + `<p>See ${commandLink('18','status','system messages')} for status codes, including data holdup (92).</p>`
    + source(DB.commands['18']);
  $('#content').innerHTML = html;
}

function renderFamilyWorkflows(device) {
  if (device.family==='eit') {
    const injectionWidth = device.channels===256?'four bytes per pair':'two bytes per pair';
    $('#content').innerHTML = head(device.name,'Configure and acquire EIT data','The measurement setup and output flags determine the data stream.')
      + step(1,'Reset the setup','This clears the frequency and excitation stacks.','B0 01 01 B0')
      + step(2,'Add a frequency block','Choose a supported frequency and add a block. See B0/04.','B0 0C 04 47 C3 50 00 47 C3 50 00 00 01 00 B0')
      + step(3,'Add excitation pairs','Append each pair separately. Use two-byte electrode numbers to address electrode 256.','B0 03 06 01 02 B0')
      + step(4,'Configure excitation, rate and output','Set the current, frame rate, burst count and optional metadata before acquisition. Check suitability for the connected setup.')
      + `<p>${commandLink('b0','05','Excitation current')} · ${commandLink('b0','03','Frame rate')} · ${commandLink('b0','02','Burst count')} · ${commandLink('b2','01','Output metadata')}</p>`
      + step(5,'Start acquisition','Wait for an acknowledgement and decode the streamed packets.','B4 01 01 B4')
      + note(`Packets carry one group of 16 channel values. When enabled, excitation metadata uses ${injectionWidth} on ${device.name}. The configured excitation sequence, frequency stack and channel groups determine how many packets form a full EIT frame.`)
      + `<p>${commandLink('b4','data','Decode the EIT stream')}</p>`;
  } else {
    $('#content').innerHTML = head(device.name,'Configure and run an electrochemical measurement','Configure the ports and settings for each step before starting the sequence.')
      + step(1,'Initialize the setup','Initialize an empty setup before defining steps.','B6 01 01 B6')
      + step(2,'Define each step','Match the actual electrode wiring. Set the control mode, input ranges, measurement technique and duration.')
      + `<p>${commandLink('b6','0B','Port routing')} · ${commandLink('b6','09','Control mode')} · ${commandLink('b6','08','Input ranges')} · ${commandLink('b6','07','Setpoint')}</p>`
      + step(3,'Configure the output','Choose the data interval. If measuring impedance, add EIS sweep settings and choose whether to include EIS timestamps.')
      + `<p>${commandLink('b6','0A','Data output')} · ${commandLink('b6','03','EIS sweep')}</p>`
      + step(4,'Run the sequence','Check the settings using the readback operations. This request runs the configured sequence once.','B8 03 01 00 01 B8')
      + `<p>${commandLink('b8','time-data','Decode time data')} · ${commandLink('b8','eis-data','Decode impedance data')}</p>`;
  }
}

function render() {
  const parts = location.hash.replace(/^#/,'').split('/');
  const prefix = parts[0].toLowerCase();
  // Bookmarks from the previous ISX-3-only reference still resolve.
  const oldReference = Object.hasOwn(window.API_LIBRARY.eis.commands,prefix)
    || ['protocol','timing','workflows'].includes(prefix);
  const deviceId = hasDevice(prefix) ? prefix : oldReference ? 'isx-3' : '';
  const device = DEVICES[deviceId];
  const changed = selectedDevice!==deviceId;
  selectedDevice = deviceId;
  const showReference = Boolean(device && device.family!=='lcr');
  document.body.classList.toggle('catalog-mode',!showReference);
  $('#reference-nav').hidden = !showReference;
  $('#active-device').textContent = device?.name || 'Instrument API reference';
  $('#doc-switch').hidden = !device;
  if (changed) {
    $('#search').value = '';
    $('#category').value = '';
  }
  if (!showReference) {
    $('#manual-footer').textContent = 'Sciospec COMInterface';
    document.title = device ? `${device.name} · Sciospec COMInterface` : 'Sciospec COMInterface · Select a device';
    if (device) renderLcr(device); else renderDeviceSelector();
    return;
  }
  DB = window.API_LIBRARY[device.family];
  const rawRoute = oldReference ? parts.join('/') : parts.slice(1).join('/');
  route = routeFromHash(rawRoute);
  if (route.id==='timing' && !availableGuides().some(([id])=>id==='timing')) route.id = 'start';
  const command = DB.commands[route.id];
  document.title = `${device.name} · ${command ? `${command.code} ${command.name}` : 'COMInterface'}`;
  $('#manual-footer').textContent = `${device.name} · COMInterface · Manual revision ${DB.meta.revision}`;
  if (command) renderCommand();
  else if (device.family==='eit' || device.family==='csx') {
    if (route.id==='protocol') renderFamilyProtocol(device);
    else if (route.id==='workflows') renderFamilyWorkflows(device);
    else renderFamilyStart(device);
  } else {
    ({start:renderStart,protocol:renderProtocol,timing:renderTiming,workflows:renderWorkflows}[route.id])();
  }
  $('#content').innerHTML = qualifyLinks($('#content').innerHTML,deviceId);
  renderNav();
}

async function copyText(text){try{await navigator.clipboard.writeText(text);toast('Bytes copied');return true;}catch{const input=document.createElement('textarea');input.value=text;input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const ok=document.execCommand('copy');input.remove();toast(ok?'Bytes copied':'Copy unavailable — select the bytes manually');return ok;}}
document.addEventListener('click',async e=>{const byte=e.target.closest('.byte');if(byte){const f=byte.closest('.frame'),p=DB.frames[f.dataset.raw][Number(byte.dataset.field)];f.querySelectorAll('.byte').forEach(b=>b.setAttribute('aria-pressed',String(b===byte)));f.querySelector('.field-detail').textContent=p.label+': '+p.desc;return;}const copy=e.target.closest('.copy');if(copy){await copyText(copy.closest('.frame').dataset.raw);return;}const tab=e.target.closest('[data-tab]');if(tab){location.hash=routeHash(route.id,route.option,tab.dataset.tab);return;}if(e.target.closest('[data-print]'))window.print();});
document.addEventListener('change',e=>{if(e.target.id==='option-select')location.hash=routeHash(route.id,e.target.value,'parameters');});
$('#search').addEventListener('input',renderNav);$('#category').addEventListener('change',renderNav);
for(const g of GROUPS){const o=document.createElement('option');o.value=g;o.textContent=g;$('#category').append(o);}
$('#theme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;$('#theme').textContent=theme==='dark'?'Light theme':'Dark theme';try{localStorage.setItem('sciospec-theme',theme);}catch{}});
try{const theme=localStorage.getItem('sciospec-theme');if(theme==='light'){$('#theme').textContent='Dark theme';document.documentElement.dataset.theme='light';}}catch{}
document.addEventListener('keydown',e=>{if(e.key==='/'&& !$('#reference-nav').hidden &&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('#search').focus();}if(e.key==='Escape'&&document.activeElement.id==='search'){$('#search').value='';renderNav();}});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});});
render();
