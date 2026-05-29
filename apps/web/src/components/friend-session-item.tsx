"use client";
import colors from "@/lib/colors";
import { CalendarDaysIcon } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";
import PopupAskJoin from "./popup-ask-join";

export default function FriendSessionItem() {
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    return (
        <>
            <SeanceItem>
                <CalendarDaysIcon size={32} />

                <DataSection>
                    <h4>Jeudi 14 Oct.</h4>
                    <p>18:00 - 20:00</p>
                </DataSection>

                <JoinButton onClick={() => setPopupIsOpen(true)}>
                    Rejoindre
                </JoinButton>
            </SeanceItem>
            <PopupAskJoin
                isOpen={popupIsOpen}
                onClose={() => setPopupIsOpen(false)}
            />
        </>
    );
}

const SeanceItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${colors.surface.cream};
    border: 1px solid ${colors.border.primary};
`;

const DataSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    width: 100%;
    h4 {
        font-size: 16px;
        font-weight: 500;
        color: ${colors.text.strong};
    }
    p {
        font-size: 14px;
        color: ${colors.text.muted};
        font-weight: 400;
    }
`;

const JoinButton = styled.button`
    width: max-content !important;
    background-color: transparent;
    color: ${colors.main.secondary};
    border: none;
    padding: 0;
    font-weight: 600;

    font-size: 0.875rem;
    border-radius: 8px;
`;
