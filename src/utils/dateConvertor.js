export default function dateConvertor(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleString(); //"20.04.2025, 15:33:08"
}