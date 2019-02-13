const dashboardHashRe = /\/stories$/;

export function detectDashboard(callback) {
    if (location.hash.match(dashboardHashRe) !== null) {
        callback();
    }

    window.addEventListener('hashchange', () => {
        detectDashboard(callback);
    }, false);
}