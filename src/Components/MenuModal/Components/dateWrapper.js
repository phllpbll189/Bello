export class DateWrapper{
    constructor(date){
        this.date = new Date(Date.now())

        //no date included
        if(!date){
            this.stoppingMonth = this.date.getMonth() + 1
            return
        }

        //date is included
        if(!(date instanceof Object && 'month' in date && 'day' in date)){
            throw Error("not correct constructor item")
        } 

        if(date.month > 11 || date.day > 31){
            throw Error("month or date is to large")
        }

        this.date.setDate(date.day)
        this.date.setMonth(date.month)
        this.stoppingMonth = this.date.getMonth() + 1
    }

    //set it to the first sunday of the calendar month.
    //this means the calendar can start on the 29th of the previous month if there is space for it
    set calendarMonth(month){
        if(!(typeof month == 'number') || month > 11){
            throw Error(`Invalid Argument: Recieved ${month}, Expected a number under 12`)
        }

        this.date.setMonth(month)
        this.date.setDate(1)
        this.date.setDate((-1 * this.date.getDay()) + 1)
        this.stoppingMonth = month + 1
    }

    //returns the month and day (month starts from 0)
    get monthDay(){
        return {
            day: this.date.getDate(),
            month: this.date.getMonth()
        }
    }

    next(){ //set date to next day
        this.date.setDate(this.date.getDate() + 1)
    }

    //is the calendar month over?
    lastOfCalendarMonth (){
        const tempDate = new Date('2022-1-26')
        tempDate.setMonth(this.stoppingMonth)

        if(this.date.getMonth() == tempDate.getMonth()){
            return true
        }
        return false
    }
    
    get Date(){
        return this.date
    }

    set Date(date){
        if(!(date instanceof Date))
            throw Error("not a date object")
        this.date = date
    }

}