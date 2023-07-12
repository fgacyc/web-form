export function getTimeStamp() {
    let timestamp = Date.now()
    return Math.floor(timestamp / 1000)
}

export function getDateTimeStamp(date) {
    let timestamp = Date.parse(date)
    return Math.floor(timestamp / 1000)
}