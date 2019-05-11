const moment = require('moment');

const dateFormat = 'DD.MM.YYYY H:mm';

export const getDateString = (dateString) => {
    return moment(dateString).format(dateFormat);
};
