import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './auth/login';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './auth/userSlice';

const StyledNav = styled.nav`
    color: #34495e;
    background-color: #FFFFF;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
`;

const NavHeader = styled.header`
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border: 1px solid #a2a2a2;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    h1 {
        margin: 0.25em 0;
    }
    @media (min-width: 769px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 1025px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const StyledNavLink = styled(Link)`
    text-decoration: none;
    padding: 10px 15px;
    text-transform: uppercase;
    text-align: center;
    display: block;
    color: #34495e;
    &:hover {
        color: #344953;
        background: #ddd;
        border-radius: 20px
    }
    &:visited {
        color: #34495e;
    }
`;

const NavUl = styled.ul`
    margin: 0 5px 0 0;
    padding: 0;
    list-style: none;
    @media (min-width: 769px) {
        display: flex;
        align-items: center;
    }
`;

const Nav = ({ authenticated }: { authenticated: boolean }) => {
    const user = useSelector(selectCurrentUser);

    const gridLink = (
        <li>
            <StyledNavLink to="/workouts">Grid</StyledNavLink>
        </li>
    );

    const StyledGreeting = styled.li`
        padding-right: 20px;
    `;

    const greeting = <StyledGreeting>Athlete: {user.athlete?.firstname + ' ' + user.athlete?.lastname}</StyledGreeting>;

    const handleLogout = () => {
        window.location.assign(window.location.toString());
    };

    return (
        <StyledNav>
            <NavHeader>
                <h1>
                    <StyledNavLink to="/workouts">Strava Dashboard</StyledNavLink>
                </h1>
                <NavUl>
                    {authenticated ? greeting : ''}
                    {authenticated ? gridLink : ''}
                    <li>
                        <StyledNavLink to="/about" className="nav-link">
                            About
                        </StyledNavLink>
                    </li>
                    <li>
                        {authenticated ? (
                            <StyledNavLink onClick={handleLogout} to="/">
                                Log Out
                            </StyledNavLink>
                        ) : (
                            <Login></Login>
                        )}
                    </li>
                </NavUl>
            </NavHeader>
        </StyledNav>
    );
};

export default Nav;
