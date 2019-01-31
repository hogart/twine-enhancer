function getThemePref() {
    const prefIds = localStorage.getItem('twine-prefs').split(',');

    for (const prefId of prefIds) {
        const pref = JSON.parse(localStorage.getItem(`twine-prefs-${prefId}`));
        if (pref.name === 'appTheme') {
            return pref;
        }
    }
}

export function toggleTheme() {
    const pref = getThemePref();
    const wasDark = pref.value === 'dark';
    pref.value = wasDark ? 'light' : 'dark';

    document.body.classList.toggle('theme-dark', !wasDark);
    document.body.classList.toggle('theme-light', wasDark);

    localStorage.setItem(`twine-prefs-${pref.id}`, JSON.stringify(pref));
}