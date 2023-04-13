
export const getTime = (input, toDoObject) => {
    const time = Date.now();
    const today = new Date(time);
    if (toDoObject){
        return {
            ...toDoObject,
            title: input.title,
            description: input.description,
            lastUpdated: today.toISOString()
        }
    } else {
        return {
            title: input.title,
            status: input.status,
            description: input.description,
            createdAt: today.toISOString(),
            lastUpdated: today.toISOString()
        }
    }
}

export const getISODate = (ISOString) => {
    const newDate = new Date(ISOString);
      let date = String(newDate);
      let day = date.slice(0,15);
      let time = date.slice(15,21).split(':');
      let hours = Number(time[0]) > 12 ? Number(time[0])%12 : Number(time[0]);
      let zone = Number(time[0]) > 12 ? 'PM' : 'AM';
      let minutes = Number(time[1]) < 10 ? '0' + Number(time[1]) : Number(time[1]);
      let newTime = hours + ':' + minutes;
      return [day, newTime, zone];
}