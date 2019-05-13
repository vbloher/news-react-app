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

    if (!url) {
        return null;
    }

    // const destinationUri = mgDirUri + fileName;
    const destinationUri = FileSystem.documentDirectory + fileName;

    // const mgDirInfo = await FileSystem.getInfoAsync(mgDirUri);
    // if (!mgDirInfo.exists) {
    //     try {
    //         await FileSystem.makeDirectoryAsync(mgDirUri);
    //     } catch (e) {
    //         console.log('Cannot create directory. ', e);
    //     }
    // }

    let resultUri = null;
    try {
        resultUri = await FileSystem.downloadAsync(url, destinationUri)
    } catch (e) {
        console.log('Cannot download file.', e);
    }

    return resultUri ? resultUri.uri : null;
};

export const checksum = (string) => {
    const length = string ? string.length : 0;
    let hash = 0;
    let c;

    if (length === 0) {
        return hash;
    }

    for (let index = 0; index < length; index++) {
        c = string.charCodeAt(index);
        hash = ((hash << 5) - hash) +c;
        hash = hash & hash;
    }
    return hash;
};
