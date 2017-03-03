const MONTH = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
const DAY = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

var add_day = (date = new Date(), num) => {
    new_date = new Date(date)
    new_date.setDate(date.getDate() + num)
    return (new_date)
}
var soustract_day = (date = new Date(), num) => { 
    new_date = new Date(date)
    num = num > 0 ? num * -1 : num
    new_date.setDate(date.getDate() + num)
    return (new_date)
}
var get_start_week = (date = new Date()) => {
    
    return (soustract_day(date, date.getDay() - 1))
}

var get_end_week = (date = new Date()) => {
    
    return (add_day(date, 7 - date.getDay()))
}

var get_week = (date = new Date()) => {
    week = {}    
    week.start = get_start_week(date)
    week.end = get_end_week(date)
    return week
}

var get_next_week = (date = new Date()) => {
    week = {}
    date = add_day(date, (7 - date.getDay()) + 1)
    return (get_week(date))
}
Date.prototype.format_date = function(format = 'd-m-y', separator = ' ', date = false) {
    format = format.split(/[^dmyhMJ]/)
    date = date != false ? date : this 
    str = ''
    i = 0
    format.map((arg) => {
        i++
        if (arg == 'd' | arg == 'm' | arg == 'y' | arg == 'h')
        {
            if (arg == 'd')
                str +=   date.getDate()
            else if (arg == 'm')
                str += date.getMonth()
            else if (arg == 'h')
                str += date.getHours() + 'H'+ date.getMinutes()
            else
                str += date.getFullYear()
            if (i < format.length)
                str += separator
        }
        else if (arg == 'M' | arg == 'J')
        {
            if (arg == 'J')
                str += DAY[date.getDay()]
            else if (arg == 'M')
                str += MONTH[date.getMonth()]
            if (i < format.length)
            str += separator
        }
        else
            str = 'Error format!'
    })
    return str
}

exports.add_day = add_day
exports.soustract_day = soustract_day
exports.get_start_week = get_start_week
exports.get_end_week = get_end_week
exports.get_week = get_week
exports.get_next_week = get_next_week