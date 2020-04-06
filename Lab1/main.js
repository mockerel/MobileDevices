const phone = 968247916;
const out_phone = 4;
const in_phone = 1;
const k_sms = 1;
const free_sms = 5;

tariffication = require('./tariffication.js')

function process(data) {
  phone_tariff = 0;
  data.forEach((item) => {
	if (item.msisdn_dest == phone) {
	  phone_tariff = tariffication.rateInputPhone(in_phone, item.call_duration);
	}
    if (phone == item.msisdn_origin) {
      sms_tariff = tariffication.rateSms(k_sms, item.sms_number, free_sms);
      phone_tariff += tariffication.ratePhone(out_phone, item.call_duration)
      console.log('sms tariff:', sms_tariff, 'rub');
      console.log('phone tariff', phone_tariff, 'rub');
    }
  });
};

const csv = require('csv-parser');
const fs = require('fs');
var results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    process(results)
});
