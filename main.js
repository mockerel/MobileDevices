const src = '192.168.250.1';
var k = 0.5;
bytes = 0;

tariffication = require('./tariffication.js')

function process(data) {
  data.forEach((item) => {
    if (src == item.sa) {
      bytes = bytes + parseInt(item.ibyt, 10);
    }
  });
  console.log('ip address', src)
  console.log(bytes / 1000 + ' byte');
  bytes = bytes / 1000;
  sum = calc_tariff(bytes);
  console.log(sum.toFixed(2) + ' rub');
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

fs.createReadStream('nf.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    process(results)
});
