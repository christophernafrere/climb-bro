"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/layouts/button";
import {
    ArrowRightIcon,
    CalendarPlusIcon,
    CheckIcon,
    UserSearchIcon,
    HeartHandshakeIcon,
} from "lucide-react";
import styled from "styled-components";
import colors from "@/lib/colors";

export default function PartnerMatch() {
    const { id } = useParams();
    return (
        <Main>
            <MatchFoundContainer>
                <MatchIconContainer>
                    <CheckIcon size={36} color={"#2BBBA7"} strokeWidth={3} />
                </MatchIconContainer>
            </MatchFoundContainer>

            <MatchPictureContainer>
                <MatchPicture>
                    <img
                        src={`https://i.pravatar.cc/150?u=${id}`}
                        alt="Match 1"
                    />
                </MatchPicture>

                <PartenarIconContainer>
                    <Sidebar />
                    <HeartHandshakeIcon
                        size={32}
                        color={colors.main.primary}
                        strokeWidth={2}
                    />
                    <Sidebar />
                </PartenarIconContainer>

                <MatchPicture>
                    <img
                        src={`https://i.pravatar.cc/150?u=${id}-2`}
                        alt="Match 2"
                    />
                </MatchPicture>
            </MatchPictureContainer>

            <MatchDetail>
                <h1>C'est un match</h1>
                <p>
                    Vous êtes maintenant partenaire de grimpe ! Prêt à atteindre
                    de nouveaux sommets ensemble?
                </p>
            </MatchDetail>
            <ButtonContainer>
                <ActionButton>
                    <ActionIcon>
                        <UserSearchIcon size={26} color={colors.main.primary} />
                    </ActionIcon>
                    Voir son profil
                </ActionButton>

                <ActionButton>
                    <ActionIcon className="main">
                        <CalendarPlusIcon size={26} color={"#410070"} />
                    </ActionIcon>
                    Proposer une séance
                </ActionButton>
            </ButtonContainer>
            <HomeButton>
                Continuer vers l'accueil <ArrowRightIcon size={20} />
            </HomeButton>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    h1 {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.text.strong};
    }
`;

const MatchFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #2bbba7;
    border-radius: 100%;
    box-shadow: 0 4px 12px ${colors.main.primary}01A;
`;

const MatchDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const MatchPictureContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
`;

const MatchPicture = styled.div`
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    border: 4px solid ${colors.surface.light};
    box-shadow: 0 4px 12px ${colors.main.purpleDark}55;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background-color: ${colors.main.primary};
        border-radius: 50%;
        border: 2px solid ${colors.surface.light};
    }

    &:nth-child(2) {
        &::after {
            background-color: ${colors.main.secondary};
        }
    }
`;
const MatchIconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: ${colors.surface.cream};
    border-radius: 100%;
`;

const PartenarIconContainer = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
`;

const ActionIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.surface.cream};
    width: 32px;
    height: 32px;
    border-radius: 100%;
    padding: 8px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const ActionButton = styled.button`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 16px;
    width: 100%;
    background-color: ${colors.surface.light};
    box-shadow: 0 4px 12px ${colors.main.primary}01A;
    border: 1px solid #bbcac5;

    color: #410070;

    &:has(.main) {
        background-color: #b86dfd;
        color: #410070;
        ${ActionIcon} {
            background-color: ${colors.surface.light}33;
        }
    }
`;

const HomeButton = styled(Button)`
    background-color: #e7e8e9;
    color: ${colors.text.strong};
    width: 100%;
`;

const Sidebar = styled.div`
    width: 14px;
    height: 4px;
    background: linear-gradient(
        -90deg,
        rgba(255, 255, 255, 0) 0%,
        ${colors.main.primary} 100%
    );
    border-radius: 2px;

    &:first-child {
        transform: rotate(180deg);
    }
`;
