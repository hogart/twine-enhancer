import { onHashMatch } from './utils/onHashMatch.js';

const dashboardHashRe = /\/stories$/;

export function detectDashboard(callback) {
    if (location.hash.match(dashboardHashRe) !== null) {
        callback();
    }

    onHashMatch(dashboardHashRe, callback);
}