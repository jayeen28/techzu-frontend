export default function getTimeAgo(input) {
    const date = (input instanceof Date) ? input : new Date(input);
    const ranges = {
        y: 3600 * 24 * 365,
        mos: 3600 * 24 * 30,
        w: 3600 * 24 * 7,
        d: 3600 * 24,
        h: 3600,
        m: 60,
        s: 1
    };
    const secondsElapsed = Math.abs((date.getTime() - Date.now()) / 1000);
    if (secondsElapsed < 1) return '0s';
    for (let key in ranges) {
        if (ranges[key] < secondsElapsed) {
            const delta = secondsElapsed / ranges[key];
            return `${Math.round(delta)}${key}`
        }
    }
}