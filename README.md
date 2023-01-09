# Getting Started with Craft Assignment

## Requirements
User should be able to do following operations: 
1. See the list of all the events.
2. Each event must display the Name, category, Timings for the event
3. Select an event from the event list.
4. See the list of selected events
5. Allow the user to deselect a selected event

## Constraints
1. You can select a maximum of 3 events.
2. You cannot select an event which is conflicting with already selected events.
(Do not allow the user to select events which have the same time period as
the selected events). The user cannot participate in 2 events at the same
time.

## [Implementation](http://craft-assignment-intuit.s3-website.ap-south-1.amazonaws.com/)
1. List of events is fetched from Mock API(https://run.mocky.io/v3/936840b7-f7a7-4c6a-a931-a3ce26a1e58a)
2. User can switch between 2 tabs
    - All Event
    - Selected Events
3. User can select a maximum of 3 non-conflicting events.
    - If users tries to select more than 3 events , error is shown.
    - If user tries to select a conflicting event, alert is popped up.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
