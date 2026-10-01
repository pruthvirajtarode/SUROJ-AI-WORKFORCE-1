const fs = require('fs');

const sessionFiles = {
  'public/Suroj_Session2_Accounts_Finance.html': [
    '1_Purchase_Register.csv',
    '2_GSTR2B_MH.csv',
    '3_AP_Open_Items.csv',
    '4_Client_RA_Bills.csv',
    '5_Site_Petty_Cash.csv'
  ],
  'public/Suroj_Session3_People_Admin_Communication.html': [
    '1_Attendance_Sep2026.csv',
    '2_Recruitment_Tracker.csv',
    '3_Travel_Claims.csv',
    '4_EHS_Quality_Register.csv',
    '4b_Site_Manhours.csv',
    '5_Comms_Brand_Calendar.csv'
  ],
  'public/Suroj_Session5_Procurement_Stores.html': [
    '1_Indents_POs.csv',
    '2_Quotations_CS.csv',
    '3_GRN_Register.csv',
    '4_Stock_Ledger.csv',
    '5_Machine_Log_Sep.csv',
    '5b_Machine_Master.csv'
  ]
};

for (const [htmlPath, csvList] of Object.entries(sessionFiles)) {
  if (!fs.existsSync(htmlPath)) continue;
  
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  for (const csv of csvList) {
    // Create actual CSV file in public
    fs.writeFileSync('public/' + csv, 'ID,Data\\n1,Dummy dataset for testing\\n');
    
    // Replace the specific string
    const searchString = '<a class="dlbtn" href="#files">📄 ' + csv + '</a>';
    const replaceString = '<a class="dlbtn" href="/' + csv + '" download="' + csv + '" target="_top">📄 ' + csv + '</a>';
    
    // Global replace just in case
    content = content.split(searchString).join(replaceString);
  }
  
  fs.writeFileSync(htmlPath, content, 'utf8');
}
