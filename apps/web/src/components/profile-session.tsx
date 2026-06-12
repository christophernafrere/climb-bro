"use client";
import colors from "@/lib/colors";
import { ChevronRightIcon } from "lucide-react";
import styled from "styled-components";
import React from "react";

export default function ProfileSession() {
    return (
        <SessionItem>
            <SessionDate>
                Dem <span>18</span>
            </SessionDate>
            <SessionClimb>
                <ClimbType>Nom de la session - Voie</ClimbType>
                <Hour>14:00</Hour>
            </SessionClimb>

            <button>
                <ChevronRightIcon />
            </button>
        </SessionItem>
    );
}

const SessionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 1rem;
    border: 1px solid ${colors.main.primary}22;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    button {
        margin-left: auto;
        background: none;
        border: none;
        cursor: pointer;
        color: ${colors.main.primary};
    }
`;

const SessionDate = styled.div`
    font-size: 0.9rem;
    color: black;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background-color: ${colors.main.primary}22;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    span {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${colors.main.primary};
    }
`;

const SessionClimb = styled.div`
    flex: 1;
`;

const ClimbType = styled.div`
    font-size: 1.05rem;
    font-weight: 600;
`;

const Hour = styled.div`
    font-size: 1rem;
    font-weight: 400;
`;
