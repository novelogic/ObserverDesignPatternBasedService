interface IOpenTime {
    start: string;
    close: string;
}

type week = 'Manday'|'Tuesday'| 'Wednessday';

const WeeklyOpenHours : Record<week, IOpenTime> = {
     Manday: { start: '08:00', close : '16:00' },
     Tuesday: { start: '15:00', close : '19:00' },
     Wednessday: { start: '10:00', close : '16:00' }
};

console.log(WeeklyOpenHours.Wednessday.close);


let aDayOpening: IOpenTime;
    aDayOpening = {start: '09:30', close: '18:30' };
    console.log(aDayOpening);
//---------------------------------------//
// Observer Design pattern, is a behavior Design Pattern of GOF
// A event Service is base on Observer Design pattern. 
//---------------------------------------------//

interface IListner {
    (event: string): void;
}
interface ISubscription {
    unsubscribe: () => void;
}

interface IEventService {
    emit(value: string): void;
    subscribe(listner : IListner): ISubscription;
}

class EventService implements IEventService {
    private listners : IListner[] = [] as IListner[];
    private constructor() { }
    public emit(value: string): void {
        this.notifyToSubscribers(value);
    }
    public subscribe(listner: IListner): ISubscription {
        this.listners.push(listner);
        return {
            unsubscribe : () => {
                this.listners = this.listners.filter(other => other != listner)
            } 
        } as ISubscription;
    }

    private static instance = null as unknown as EventService;
    public static getInstance(): EventService {
        if (!EventService.instance)
            EventService.instance = new EventService();
        return EventService.instance;
    }

    private notifyToSubscribers(value: string): void {
        this.listners.forEach(listner => listner(value));
    }
}
const eventService = EventService.getInstance();
const eventService2 = EventService.getInstance();
if (eventService === eventService2)
        console.log('Both are singelton Objects');

const sub = eventService.subscribe( event => console.log(event) );
eventService.emit('Testing One');
eventService2.emit('Another Testing');
sub.unsubscribe();
eventService.emit('Testing One');

//--------------------------------------//

// as you have a limited set in a DataSet/type and then another related type,
// you can map one type to other type;

type CatName = "miffy" | "boris" | "mordred";
interface ICatInfo {
    age: number;
    bread: string;    
}

const Cats : Record <CatName, ICatInfo> = {
    miffy: { age: 10, bread:  'Persian'},
    boris: { age: 5, bread: 'Maine Coon'},
    mordred: { age: 16, bread: 'British Shorthair'}
};
console.log(Cats.boris)