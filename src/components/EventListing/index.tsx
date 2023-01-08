import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../Card";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import "./eventListing.scss";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const MAX_SELECTIONS_ALLOWED = 3;
export interface EventDetail {
    id: string;
    event_name: string;
    event_category: string;
    end_time: string;
    start_time: string;
    isSelected?: boolean;
}
enum ViewType {
    SELECTED,
    ALL
}
const EventListing = () => {

    const [eventList, setEventList] = useState<EventDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState<ViewType>(ViewType.ALL);
    const [error, setError] = useState<string>('');

    const selectedEventCount = useRef(0);
    const eventLimitTimer = useRef<NodeJS.Timeout>();
    
    const getEventList = async () => {
        const eventData = await fetch('https://run.mocky.io/v3/936840b7-f7a7-4c6a-a931-a3ce26a1e58a').then(res => {
            return res.json();
        }).catch((err) => {
            return err;
        });
        return eventData;
    }

    const onCardClick = useCallback((index: number, currentState: boolean) => {
        if (currentState) {
            setEventList(events => {
                const tempEvents = [...events];
                tempEvents[index] = {
                    ...tempEvents[index],
                    isSelected: false
                }
                selectedEventCount.current--;
                return tempEvents;
            })
        }
        else if (selectedEventCount.current >= MAX_SELECTIONS_ALLOWED) {
            return setError('Maximum Event Limit Reached');
        } else {
            setEventList(events => {
                let overlapEvent;
                //Check for overlap
                for (let i = 0; i < events.length; i++) {
                    if (i !== index && events[i].isSelected && !(dayjs(events[index].end_time).isSameOrBefore(dayjs(events[i].start_time)) || dayjs(events[index].start_time).isSameOrAfter(dayjs(events[i].end_time)))) {
                        overlapEvent = events[i];
                        break;
                    }
                }
                if (overlapEvent) {
                    window.alert(`Overlapping event : ${overlapEvent.event_category} ${overlapEvent.event_name}`)
                } else {
                    selectedEventCount.current++;
                    events[index] = {
                        ...events[index],
                        isSelected: true,
                    };
                }
                return overlapEvent ? events : [...events];
            });

        }

    }, []);

    useEffect(() => {
        if (eventLimitTimer.current)
            clearTimeout(eventLimitTimer.current)
        eventLimitTimer.current = setTimeout(() => {
            setError('');
        }, 1000);
        return (() => {
            if (eventLimitTimer.current)
                clearTimeout(eventLimitTimer.current)
        })
    }, [error]);

    useEffect(() => {
        getEventList().then(res => {
            setEventList(res);
        }).catch(err => {
            setEventList([]);
            console.log("Error in fetching event list", err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return <div className="loader">Loading Events....</div>
    }
    return (
        <div className="container">
            <div className="header-container">
            <div className="tab-container">
                <p onClick={() => setTab(ViewType.ALL)} className={`tab-item ${tab === ViewType.ALL ? 'tab-item-selected' : ''}`}>All Events({eventList.length})</p>
                <p onClick={() => setTab(ViewType.SELECTED)} className={`tab-item ${tab === ViewType.SELECTED ? 'tab-item-selected' : ''}`}>Selected Events({selectedEventCount.current})</p>
            </div>
            <div className="error">{error.length ? error : ''}</div>
            </div>
            {tab === ViewType.ALL ? <div className="list-container">{eventList.map((event, index) =>
                <Card key={event.id} eventData={event} cardIndex={index} onClick={onCardClick} isSelected={event.isSelected} />
            )}</div> : <div className="list-container">{eventList.map((event, index) => {
                if (event.isSelected)
                    return <Card key={event.id} eventData={event} cardIndex={index} isSelected={event.isSelected} />
                return null
            })}</div>}

        </div>
    )
}
export default EventListing;

