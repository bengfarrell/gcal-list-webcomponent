import { ReactiveControllerHost } from 'lit';

export type CalendarOptions = {
    calendarID: string,
    apiKey: string,
    startDate?: string,
    endDate?: string
    lookAheadDays?: number
}

export type CalendarEvent = {
    id: string,
    title: string,
    summary: string,
    start: Date;
    end: Date;
    timezone: string;
    location: string;
    hasTime: boolean;
}

export class EventsController {
    static DEFAULT_LOOKAHEAD_DAYS = 30;
    static generateCalendarURI(opts: CalendarOptions) {
        const options = Object.assign({}, opts);
        if (!options.startDate) {
            options.startDate = new Date().toISOString().split('T')[0];
        }
        if (!options.endDate) {
            const lookAhead = options.lookAheadDays || EventsController.DEFAULT_LOOKAHEAD_DAYS;
            options.endDate = new Date(new Date().setDate(new Date().getDate() + lookAhead)).toISOString().split('T')[0];
        }
        return `https://www.googleapis.com/calendar/v3/calendars/${options.calendarID}/events?key=${options.apiKey}&timeMin=${options.startDate}T00:00:00Z&timeMax=${options.endDate}T00:00:00Z`
    }

    protected host: ReactiveControllerHost;

    public events: CalendarEvent[] = [];

    constructor(host: ReactiveControllerHost) {
        this.host = host;
        host.addController(this);
    }

    public load(opts: CalendarOptions) {
        fetch(EventsController.generateCalendarURI(opts)).then(response => response.json()).then(data => {
            this.events = data.items.map((item: any) => {
                const startDate = new Date(item.start.date ? item.start.date : item.start.dateTime);
                const endDate = new Date(item.end.date ? item.end.date : item.end.dateTime);
                return {
                    id: item.id,
                    summary: item.summary,
                    start: startDate,
                    end: endDate,
                    timezone: item.start.timeZone,
                    location: item.location,
                    hasTime: !!item.start.dateTime
                }
            }).sort((a: CalendarEvent, b: CalendarEvent) => a.start.getTime() - b.start.getTime());
            this.host.requestUpdate();
        });
    }

    hostConnected() {
    }
    hostDisconnected() {}
}