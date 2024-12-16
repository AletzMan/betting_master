export const SmallDateLocal: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric", // Para usar el formato de 12 horas (AM/PM)
}

export const FormattedDateUpcoming = (date: string) => {
    const newDate = date.split("/")
    const day = Number(newDate[2]) + 1
    const month = newDate[1]
    const year = newDate[0]
    const birthday = new Date(date).getTime()
    const currentTime = new Date().getTime()
    const age = currentTime - birthday
    const formatted = new Date(`${year}-${month}-${day}`).toLocaleDateString("es-MX", SmallDateLocal)
    return `${formatted} `
}
