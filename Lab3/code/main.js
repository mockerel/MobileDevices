const src = '192.168.250.1';
var k = 0.5;

const phone = 968247916;
const out_phone = 4;
const in_phone = 1;
const k_sms = 1;
const free_sms = 5;

var sms_tariff = 0;
var sms_count = 0;
var phone_tariff = 0;
var phone_count = 0;
var bytes_temp = 0;
var bytes = 0;
var sum = 0;

tariffication = require('./tariffication.js');
pdf_gen = require('./pdf_gen.js');

function process_ethernet(data) {
  data.forEach((item) => {
    if (src == item.sa) {
      bytes = bytes + parseInt(item.ibyt, 10);
    }
  });
  console.log('ip address', src)
  console.log(bytes / 1000 + ' byte');
  bytes = bytes / 1000;
  bytes_temp = bytes
  sum = calc_tariff(bytes);
  console.log(sum.toFixed(2) + ' rub');
};

function process_phone(data) {
  phone_tariff = 0;
  data.forEach((item) => {
  if (item.msisdn_dest == phone) {
    phone_tariff = tariffication.rateInputPhone(in_phone, item.call_duration);
  }
    if (phone == item.msisdn_origin) {
      sms_tariff = tariffication.rateSms(k_sms, sms_count = item.sms_number, free_sms);
      phone_tariff += tariffication.ratePhone(out_phone, phone_count = item.call_duration)
      console.log('sms tariff:', sms_tariff, 'rub');
      console.log('phone tariff', phone_tariff, 'rub');
    }
  });
};

function calc_tariff(byte) {
  sum = 0;
  while (bytes > 500) {
    sum = sum + tariffication.rateEthernet(k, 500);
    k = k + 0.5;
    bytes = bytes - 500;
  }
  sum = sum + tariffication.rateEthernet(k, bytes);
  return sum;
}

const csv = require('csv-parser');
const fs = require('fs');
var results = [];

function main() {
  fs.createReadStream('nf.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      process_ethernet(results)
  });

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      process_phone(results)
  });
  setTimeout(generate_pdf, 2000);
};

function generate_pdf(){
  pdf_gen.test(sms_tariff, sms_count, phone_tariff, +phone_count + 1.05, bytes_temp, sum);
};

main();

// generate_pdf();

