import React from 'react';
import { IWorkout } from '../../model/IWorkout';
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet';
import MiToKmConverter from './mi-to-km-converter';

const TileDiv = styled.div`
    box-shadow: 0 1px 12px 1px rgba(0, 0, 0, 0.1);
`;

const TileUl = styled.ul`
    list-style-type: none;
    padding: 0;
    padding: 0 15px;
    li {
        padding: 5px 0;
        width: 100%;
        display: flex;
        flex-flow: row no-wrap;
        justify-content: space-between;
    }
`;

const NoMapDiv = styled.div`
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActivityLabel = styled.label`
    width: 40%;
    font-weight: bold;
`;
const ActivitySpan = styled.span`
    width: 60%;
`;

const WorkoutTile = ({ workout }: { workout: IWorkout }) => {
    const position: any = workout.start_latlng;
    const mapElement = workout.start_latlng ? (
        <Map className="leaflet-container-small" center={position} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    ) : (
        <NoMapDiv className="leaflet-container-small">No map</NoMapDiv>
    );

    return (
        <TileDiv>
            <TileUl>
                <li>
                    <ActivityLabel>Date: </ActivityLabel>
                    <ActivitySpan>{new Date(workout.start_date).toLocaleDateString()}</ActivitySpan>
                </li>
                <li>
                    <ActivityLabel>Activity: </ActivityLabel>
                    <ActivitySpan>{workout.type}</ActivitySpan>
                </li>
                <li>
                    <ActivityLabel>Location: </ActivityLabel>
                    <ActivitySpan>
                        {workout.location_city ? workout.location_city + ', ' : ''} {workout.location_state} {workout.location_country}
                    </ActivitySpan>
                </li>
                <li>
                    <ActivityLabel>Name: </ActivityLabel>
                    <ActivitySpan>{workout.name}</ActivitySpan>
                </li>
                <li>
                    <ActivityLabel>Distance: </ActivityLabel>
                    <ActivitySpan>
                        <MiToKmConverter distanceInMeters={workout.distance} />
                    </ActivitySpan>
                </li>
                <li>{mapElement}</li>
            </TileUl>
        </TileDiv>
    );
};

export default WorkoutTile;
