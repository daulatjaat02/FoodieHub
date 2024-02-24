import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJson = async function (url) {
    try {
        const fetchPromise = await fetch(url);
        const res = await Promise.race[fetchPromise, timeout(TIMEOUT_SEC)];
        const data = await fetchPromise.json()

        if (!fetchPromise.ok) throw new Error(`${data.message} (${fetchPromise.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}