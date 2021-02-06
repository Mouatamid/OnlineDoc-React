let eventGuid = 0;

export default function createEventId() {
    return String(eventGuid++)
}