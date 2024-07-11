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
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return `${Math.abs(Math.floor(delta))}${key}`
        }
    }
}