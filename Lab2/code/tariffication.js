module.exports = {
  rateSms: function (k, sms_count, free_sms_count) {
    return k * (sms_count - free_sms_count);
  },
  ratePhone: function (k , call_time) {
    return k * call_time;
  },
  rateEthernet: function (k, byte_count) {
    return k * byte_count;
  }
}
