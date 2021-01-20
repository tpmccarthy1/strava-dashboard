import React, { useState, useEffect, ChangeEvent } from 'react';
import WorkoutTile from './workout-tile';
import { useSelector } from 'react-redux';
import { IWorkout } from '../../model/IWorkout';
import { selectToken } from '../auth/userSlice';
import { client } from '../../utils/api-client';
import styled from 'styled-components';

const TileContainer = styled.div`
    @media (min-width: 769px) {
        display: grid;
        margin-top: 10px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        background-color: #fff;
        color: #444;
    }

    @media (min-width: 1025px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

function WorkoutGrid() {
    const [error, setError]: [any, Function] = useState(null);
    const [isLoaded, setIsLoaded]: [boolean, Function] = useState(false);
    const [currentPage, setCurrentPage]: [number, Function] = useState(1);
    const [pageSize, setPageSize]: [number, Function] = useState(6);
    let token = useSelector(selectToken);
    const [items, setItems]: [IWorkout[], any] = useState([]);
    const pageSizes = [3, 6, 9];
    useEffect(() => {
        client(`https://www.strava.com/api/v3/athlete/activities?per_page=${pageSize}&page=${currentPage}`, {
            method: 'GET',
            token: token,
        }).then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            },
        );
    }, [token, currentPage, pageSize]);

    const goToNextPage: () => void = () => setCurrentPage(currentPage + 1);

    const goToPreviousPage: () => void = () => setCurrentPage(currentPage - 1);

    const changePageSize: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => setPageSize(e.target.value);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={{ width: '90%' }}>
                <TileContainer>
                    {items.map((item) => (
                        <WorkoutTile key={item.id} workout={item} />
                    ))}
                </TileContainer>
                <div>
                    {currentPage > 1 ? <button onClick={goToPreviousPage}>Previous</button> : ''}
                    <button onClick={goToNextPage}>Next</button>
                    <select onChange={changePageSize} value={pageSize}>
                        {pageSizes.map((size, i) => (
                            <option key={i} value={size}>
                                {size.toString()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default WorkoutGrid;
