import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { CalendarEvent, CalendarOptions, EventsController } from '../controllers/events.js';
import { style } from './listview.css.js';


@customElement('calendar-list-view')
export class ListView extends LitElement {
    static override styles = [style];

    @property({ type: String, reflect: true })
    protected calendarID: string = '';

    @property({ type: String, reflect: true })
    protected apiKey: string = '';

    @property({ type: String, reflect: true })
    protected startDate?: string;

    @property({ type: String, reflect: true })
    protected endDate?: string;

    @property({ type: Number, reflect: true })
    protected lookAheadDays?: number;

    protected events = new EventsController(this);

    set options(opts: CalendarOptions) {
        this.calendarID = opts.calendarID;
        this.apiKey = opts.apiKey;
        this.startDate = opts.startDate;
        this.endDate = opts.endDate;
        this.lookAheadDays = opts.lookAheadDays;
        this.events.load(opts);
    }

    override connectedCallback() {
        super.connectedCallback();
    }

    override render() {
        return html`
            <ul>${this.events.events.map((event: CalendarEvent) => html`
                <li>
                    <h1>${event.summary}</h1>
                    ${event.start.toDateString() === event.end.toDateString() ? html`<p>${event.start.toDateString()}</p>` : html`<p>${event.start.toDateString()} - ${event.end.toDateString()}</p>`}
                    ${event.hasTime ? html`<p>${event.start.toLocaleTimeString('en-us', { timeZone: event.timezone })} - ${event.end.toLocaleTimeString('en-us', { timeZone: event.timezone })}</p>` : undefined}
                </li>`)}</ul>`;
    }
}