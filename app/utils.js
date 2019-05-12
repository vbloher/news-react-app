import { FileSystem } from 'expo';

const moment = require('moment');
const dateFormat = 'DD.MM.YYYY H:mm';

export const getDateString = (dateString) => {
    return moment(dateString).format(dateFormat);
};

const mgDirUri = FileSystem.documentDirectory + 'meganews';

export const clearImagesDir = async () => {
    await FileSystem.deleteAsync(mgDirUri, { idempotent: true })
};

export const downloadFile = async (url, fileName) => {
    const destinationUri = mgDirUri + fileName;

    const mgDirInfo = await FileSystem.getInfoAsync(mgDirUri);
    if (!mgDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(mgDirUri);
    }

    let resultUri = null;
    try {
        resultUri = await FileSystem.downloadAsync(url, destinationUri)
    } catch (e) {
        console.log('Cannot download file.', e)
    }

    return resultUri;
};
