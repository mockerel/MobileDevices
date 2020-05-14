function generate(smsT, smsC, phT, phC, bytes, sum) {
   const PDFDocument = require('pdfkit');
   const fs = require('fs');
   const doc = new PDFDocument;
   doc.pipe(fs.createWriteStream('output.pdf'));

   doc.moveTo(50, 50)
      .lineTo(550, 50)
      .lineTo(550, 150)
      .lineTo(50, 150)
      .lineTo(50, 50)
      .moveTo(340, 50)
      .lineTo(340, 150)
      .moveTo(380, 50)
      .lineTo(380, 150)
      .moveTo(340, 70)
      .lineTo(380, 70)
      .moveTo(50, 100)
      .lineTo(550, 100)
      .moveTo(50, 110)
      .lineTo(340, 110)
      .moveTo(195, 110)
      .lineTo(195, 100)
      .stroke();

   doc.fontSize(8);

   doc.text("Payee's Bank", 55, 91)
   doc.text("type bank name", 110, 91)

   doc.text("TIN", 55, 102)
   doc.text("type TIN", 70, 102)

   doc.text("KPP", 200, 102)
   doc.text("type KPP", 220, 102)

   doc.text("Recipient", 55, 142)
   doc.text("type Recipient", 100, 142)

   doc.text('BIC', 342, 52)
   doc.text('69', 358, 52)

   doc.text('N', 342, 72)
   doc.text('N', 342, 102)

   doc.text(`An invoice for payment dated 20.10.2020`, 50, 170)

   doc.lineWidth(3);

   doc.moveTo(50, 180)
      .lineTo(550, 180)
      .stroke();

   doc.lineWidth(1);

   doc.text("Provider", 55, 190)
   doc.text("type Provider", 100, 190)

   doc.text("Buyer", 55, 210)
   doc.text("type Buyer", 100, 210)

   doc.moveTo(50, 240)
      .lineTo(550, 240)
      .lineTo(550, 360)
      .lineTo(50, 360)
      .lineTo(50, 240)
      .moveTo(50, 250)
      .lineTo(550, 250)
      .moveTo(65, 240)
      .lineTo(65, 360)
      .moveTo(380, 240)
      .lineTo(380, 360)
      .moveTo(410, 240)
      .lineTo(410, 360)
      .moveTo(430, 240)
      .lineTo(430, 360)
      .moveTo(490, 240)
      .lineTo(490, 360)
      .stroke();

   doc.text('N', 52, 242)
   doc.text('Goods (services, work)', 200, 242)
   doc.text('Count', 382, 242)
   doc.text('Units', 412, 242)
   doc.text('Price', 432, 242)
   doc.text('Sum', 492, 242)

   doc.text('1', 52, 252)
   doc.text('SMS', 67, 252)
   doc.text(`${smsC - 5}`, 382, 252)
   doc.text('rub', 412, 252)
   doc.text(`${smsT}`, 492, 252)
   doc.text('1', 432, 252)

   doc.text('2', 52, 260)
   doc.text('PHONE', 67, 260)
   doc.text(`${phC}`, 382, 260)
   doc.text('rub', 412, 260)
   doc.text(`${phT}`, 492, 260)
   doc.text('4', 432, 260)

   doc.text('3', 52, 268)
   doc.text('ETHERNET', 67, 268)
   doc.text(`${bytes.toFixed(2)}`, 382, 268)
   doc.text('rub', 412, 268)
   doc.text(`${sum.toFixed(2)}`, 492, 268)
   doc.text('2,6', 432, 268)

   doc.text('Total', 450, 370)
   doc.text(`${+smsT.toFixed(2) + +phT.toFixed(2) + +sum.toFixed(2)}`, 470, 370)
   doc.text('Count positions: 3', 50, 390)

   doc.lineWidth(3);

   doc.moveTo(50, 450)
      .lineTo(550, 450)
      .stroke();

   doc.text('Supervisor', 50, 420)
   doc.text('type Supervisor', 100, 420)

   doc.text('Accountant', 400, 420)
   doc.text('type Accountant', 470, 420)

   doc.end();
}

module.exports = {
  test: function (smsT, smsC, phT, phC, bytes, sum) {
     generate(smsT, smsC, phT, phC, bytes, sum);
  }
}