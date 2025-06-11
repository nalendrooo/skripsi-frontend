export function formatIndonesianDateTime(isoString: string): string {
    const date = new Date(isoString)

    const time = date
        .toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).replaceAll(".", ":")

    const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).replaceAll(" ", "/")

    return `${formattedDate}, ${time} WIB`
}
