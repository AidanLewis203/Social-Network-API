const dayjs = require('dayjs');

function formatDate(date) {
  return dayjs(date).format('MMM DD, YYYY [at] hh:mm A');
}

module.exports = formatDate;