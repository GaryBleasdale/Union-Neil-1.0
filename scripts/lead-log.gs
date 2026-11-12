/**
 * WhatsApp click log for unionneil.com.br (Google Apps Script).
 *
 * Contact.astro sends one JSON row per "family" WhatsApp click: a row ID
 * plus the visitor's Google Ads click IDs. When a chat arrives, match it to
 * the row by time ("recebido_em", in the script's time zone: set it to
 * America/Sao_Paulo in Project Settings) to find the gclid/gbraid/wbraid for
 * an offline conversion upload. "clicou_em" and "chegou_em" are UTC.
 *
 * Setup:
 * 1. Create a Google Sheet. Extensions > Apps Script, paste this file, save.
 * 2. Deploy > New deployment > Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 3. Copy the web app URL (ends in /exec) into LEAD_LOG_URL in
 *    src/components/Contact.astro.
 * After editing this script, Deploy > Manage deployments > edit > New version,
 * so the same URL runs the new code.
 */

const SHEET_NAME = "Cliques";
const HEADERS = [
  "recebido_em",
  "codigo",
  "opcao",
  "gclid",
  "gbraid",
  "wbraid",
  "chegou_em",
  "clicou_em",
  "pagina",
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply("bad json");
  }

  // The URL is public, so only accept rows shaped like the site's. The
  // patterns also stop values starting with "=" (formula injection).
  const ref = String(data.ref || "");
  if (!/^[A-Z2-9]{5}$/.test(ref)) return reply("bad ref");
  const id = (v) => (/^[\w-]{1,200}$/.test(String(v)) ? String(v) : "");
  const time = (v) => (/^[\d:.TZ-]{10,30}$/.test(String(v)) ? String(v) : "");
  const word = (v) => (/^[\w\/.-]{1,100}$/.test(String(v)) ? String(v) : "");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      ref,
      word(data.option),
      id(data.gclid),
      id(data.gbraid),
      id(data.wbraid),
      time(data.landed_at),
      time(data.clicked_at),
      word(data.page),
    ]);
  } finally {
    lock.releaseLock();
  }
  return reply("ok");
}

function reply(text) {
  return ContentService.createTextOutput(text);
}
