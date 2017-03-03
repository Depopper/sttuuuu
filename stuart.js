const DATE = require('./date')
const STUART = require('./stuart')
const UTILS = require('./utils')
const STAFFOMATIC = require('./staffomatic')
const WEEK =  ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']
const ARROND = ['66852','66841','66997','66995','69411','68934','66996','66998','66842','71820',
                '66853','80392','76011','72582','71819','66994','66993','76364','76012','81669']

dateFormat = (date = new Date()) => date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
check_full = (arg) => (arg.desired_coverage > 0 && arg.full == false)
check_hour = (arg) => {
    hour = new Date(arg.starts_at).getHours()
    return (hour < 11 && hour > 8 || hour > 13 && hour < 15)
}

var debug = (shifts) => {
    green = '\x1b[32m'
    red = '\x1b[31m'
    reset = '\x1b[0m'
    for (var day in shifts)
    {
        console.log((shifts[day][0] ? green : red) + ' '+ day.capitalize() + reset)
        console.log('--------------------------------------------------------------------------------------------------')
        day = shifts[day]
        if(day[0])
        {
            day.map((f) => {
                start = new Date(f.starts_at)
                end = new Date(f.ends_at)
                console.log('            -> Start at: '+ green + start.format_date('h-d-M', ', ')+ reset + ' ---- End at: ' + green + end.format_date('h-d-M', ', ') + reset)
            })
        }
        else
            console.log('            -> Empty')
        console.log('-------------------------------------------------------------------------------------------------\n')
    
    }


   /* shifs.map((i) => {
        
        
        console.log(color + date.format_date('J-d-M-y',', ') + reset)
        console.log('-----------------------------------')
        console.log(color + ' -> Start at: ' + date.getHours() + ' - - - ' + 'End at: ' + date.getHours()  + reset)
        console.log('-----------------------------------')
    })*/
} 

var get_shift = (week = DATE.get_next_week(), arrondissement) => {

    params = {
        method: 'GET',
        uri_params: 'shifts.json?from='+ dateFormat(week.start)+'&until='+dateFormat(week.end) + '&department_ids=' + ARROND[12]
    }
    return STAFFOMATIC.send(params)
    .then((response) => {
        return JSON.parse(response)
    })
    
}

shift = get_shift(DATE.get_week(new Date(2017,0,24,2)))
.then((res) => {
    shift = {
        lundi:    [],
        mardi:    [],
        mercredi: [],
        jeudi:    [],
        vendredi: [],
        samedi:   [],
        dimanche: [],
    }
    res.map((arg) =>{
        date = new Date(arg.starts_at)
        shift[WEEK[date.getDay()]].push(arg)
    })
    return (shift)
})
.then((res) => {
    for (var key in res)
        res[key] = res[key].filter(check_full)
        return res
})
.then((res) => {
    debug(res)
})

