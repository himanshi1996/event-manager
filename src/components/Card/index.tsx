import React from "react";
import dayjs from "dayjs";
import { SwimmingLogo } from "../../assets/SwimmingLogo";
import { AtheleticsLogo } from "../../assets/AtheleticsLogo";
import { BoxingLogo } from "../../assets/BoxingLogo";
import "./cardStyle.scss"
import { EventDetail } from "../EventListing";

interface CardProps {
    cardIndex: number;
    eventData: EventDetail;
    onClick?: (index: number, isSelected: boolean) => void;
    isSelected?: boolean
}
const CardUI = (props: CardProps) => {
    const {
        cardIndex = 0,
        eventData: {
            id = '',
            event_name = '',
            event_category = ' ',
            end_time = '',
            start_time = '',
        }, onClick, isSelected = false } = props;

    console.log("Card Rendered : ", id, isSelected);

    const getEventLogo = () => {
        switch (event_category) {
            case "Swimming":
                return <SwimmingLogo />;
            case "Boxing":
                return <BoxingLogo />
            case "Atheletics":
                return <AtheleticsLogo />
            default: {
                const initials = event_category[0];
                return (
                    <div className={"header-logo-name"}>
                        {initials}
                    </div>)
            }
        }
    }

    const handleClick = () => {
        if (onClick)
            onClick(cardIndex, isSelected)
    }

    return (
        <div onClick={handleClick} className={`card-container ${isSelected ? 'selected' : ''}`}>
            <div className={"header"}>
                <div className={"header-logo"}>  {getEventLogo()}</div>
                <p className={"header-category"}>{event_category}</p>
            </div>
            <div className={"content"}>
                <p className={"content-name"}>{event_name}</p>
                <p className={"content-timing"}>Start : {dayjs(start_time).format("HH:mma DD MMM, YYYY ")}</p>
                <p className={"content-timing"}>End : {dayjs(end_time).format("HH:mma DD MMM, YYYY ")}</p>
            </div>

        </div>
    )
}
export const Card = React.memo(CardUI)