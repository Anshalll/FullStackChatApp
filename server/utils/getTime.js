export const GetTime = () => {

    let unit = 'AM';

    let newDate = new Date()

    let time = newDate.getTime()

    let hour = newDate.getHours(time) % 12
    
    hour = hour ? hour : 12

    let mins = Number(newDate.getMinutes(time))

    if (newDate.getHours(time) > 12 && mins > 0) {
        unit = "PM"
    }
    else {
        unit = "AM"
    }

    let timing = `${hour}:${mins} ${unit}`

    return timing


}