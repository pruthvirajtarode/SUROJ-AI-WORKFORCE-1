const fs = require('fs');
const path = require('path');

const datasets = {
  // Session 2
  '1_Purchase_Register.csv': "Entry_ID,Date,Vendor,GSTIN,Invoice_No,Amount,Tax\nPR001,01-Aug-2026,Navkar Electricals,27AAAJN1234K1Z,NAV/26-27/0833,150000,27000\nPR002,05-Aug-2026,Chakan Fabricators,27BBBPC5678L1Z,CHA/26-27/0591,250000,45000\nPR003,12-Aug-2026,Gujarat Steel Mart,24AAAGM9012M1Z,GUJ/26-27/0244,400000,72000",
  '2_GSTR2B_MH.csv': "Supplier_Name,GSTIN,Invoice_No,Date,ITC_Available\nNavkar Electricals,27AAAJN1234K1Z,NAV/26-27/0833,01-Aug-2026,27000\nChakan Fabricators,27BBBPC5678L1Z,CHA/26-27/0591,05-Aug-2026,45000\nGujarat Steel Mart,24AAAGM9012M1Z,GUJ/26-27/0244,12-Aug-2026,0",
  '3_AP_Open_Items.csv': "Vendor_Name,Invoice_No,Invoice_Date,Acceptance_Date,Amount,Enterprise_Type\nNavkar Electricals,NAV/26-27/0833,01-Aug-2026,05-Aug-2026,177000,Micro\nChakan Fabricators,CHA/26-27/0591,05-Aug-2026,10-Aug-2026,295000,Small\nGujarat Steel Mart,GUJ/26-27/0244,12-Aug-2026,15-Aug-2026,472000,Large",
  '4_Client_RA_Bills.csv': "Project,Bill_No,Gross_Amount,Retention,Mob_Advance_Recovery,TDS,Net_Payable\nP01,RA-05,1000000,50000,100000,20000,830000\nP03,RA-12,2500000,125000,250000,50000,2075000\nP05,RA-02,500000,25000,50000,10000,415000",
  '5_Site_Petty_Cash.csv': "Voucher_No,Date,Amount,Description,Approved_By\nPC-101,05-Aug-2026,4500,Site supplies,Site Manager\nPC-102,08-Aug-2026,1200,Tea and snacks,Admin\nPC-103,15-Aug-2026,3800,Local transport,Site Manager",

  // Session 3
  '1_Attendance_Sep2026.csv': "Emp_ID,Name,Date,In_Time,Out_Time,Status\nE101,Rahul Sharma,01-Sep-2026,08:50,18:10,Present\nE102,Priya Patel,01-Sep-2026,09:15,18:00,Late\nE103,Amit Kumar,01-Sep-2026,09:00,14:00,Half Day",
  '2_Recruitment_Tracker.csv': "Candidate,Role,Site,Interview_Date,Status,Source\nVikram Singh,Site Engineer,Kurkumbh,10-Sep-2026,Selected,LinkedIn\nNeha Gupta,Accountant,Chakan,12-Sep-2026,Rejected,Portal\nRohan Desai,Safety Officer,Bhiwandi,15-Sep-2026,In Progress,Referral",
  '3_Travel_Claims.csv': "Emp_ID,Name,Travel_Date,From,To,Mode,Amount_Claimed\nE101,Rahul Sharma,05-Sep-2026,Mumbai,Pune,Taxi,2500\nE104,Suresh Patil,10-Sep-2026,Pune,Delhi,Flight,8500\nE105,Kavita Iyer,15-Sep-2026,Mumbai,Nashik,Train,800",
  '4_EHS_Quality_Register.csv': "Incident_ID,Site,Date,Category,Description,Status\nINC001,Kurkumbh,02-Sep-2026,Near Miss,Scaffolding issue,Closed\nINC002,Chakan,08-Sep-2026,First Aid,Minor cut,Open\nINC003,Bhiwandi,14-Sep-2026,Observation,No helmet,Closed",
  '4b_Site_Manhours.csv': "Site,Month,Total_Workers,Total_Manhours\nKurkumbh,Sep-2026,150,36000\nChakan,Sep-2026,200,48000\nBhiwandi,Sep-2026,120,28800",
  '5_Comms_Brand_Calendar.csv': "Post_ID,Date,Platform,Topic,Status,Engagement\nPOST01,01-Sep-2026,LinkedIn,Safety Milestone,Published,1200\nPOST02,10-Sep-2026,Twitter,New Project Win,Draft,0\nPOST03,20-Sep-2026,Facebook,Employee Spotlight,Published,850",

  // Session 5
  '1_Indents_POs.csv': "Indent_No,Date,Site,Item,Quantity,PO_No,PO_Date,Vendor\nIND001,01-Sep-2026,Kurkumbh,Cement Opc 53,500 MT,PO001,05-Sep-2026,Ultratech\nIND002,03-Sep-2026,Chakan,TMT Steel 12mm,200 MT,PO002,08-Sep-2026,Tata Tiscon\nIND003,10-Sep-2026,Bhiwandi,River Sand,1000 CuM,PO003,12-Sep-2026,Local Supplier",
  '2_Quotations_CS.csv': "Quote_ID,Date,Vendor,Item,Rate,Freight,Payment_Terms\nQ001,02-Sep-2026,Vendor A,TMT Steel,57700,Included,15 Days\nQ002,02-Sep-2026,Vendor B,TMT Steel,57800,Included,30 Days\nQ003,03-Sep-2026,Vendor C,TMT Steel,55900,1650,Advance",
  '3_GRN_Register.csv': "GRN_No,Date,PO_No,Challan_No,Item,Qty_Received,Accepted\nGRN001,10-Sep-2026,PO001,CH101,Cement,500,Yes\nGRN002,15-Sep-2026,PO002,CH205,TMT Steel,198,Yes\nGRN003,18-Sep-2026,PO003,CH301,Sand,1000,No",
  '4_Stock_Ledger.csv': "Site,Item,Opening_Bal,Receipts,Issues,Closing_Bal\nKurkumbh,Cement,100,500,450,150\nChakan,TMT Steel,50,200,180,70\nBhiwandi,Sand,200,1000,900,300",
  '5_Machine_Log_Sep.csv': "Machine_ID,Date,Start_Meter,End_Meter,Hours_Logged,Diesel_Issued\nM01,01-Sep-2026,1000,1008,8,120\nM02,01-Sep-2026,2000,2010,10,150\nM03,02-Sep-2026,1500,1505,5,75",
  '5b_Machine_Master.csv': "Machine_ID,Type,Capacity,Vendor,Hire_Rate\nM01,Excavator,20 Ton,ABC Earthmovers,1200\nM02,Crane,50 Ton,XYZ Lifts,2500\nM03,JCB,3D,Local Hire,800"
};

for (const [filename, content] of Object.entries(datasets)) {
  fs.writeFileSync(path.join('public', filename), content);
}
