"use client";
import HistoryItem from "@/components/history-item";
import ProfileSession from "@/components/profile-session";
import colors from "@/lib/colors";
import { mockHistoryItems } from "@/lib/mock-history-items";
import styled from "styled-components";
import {
    AtSignIcon,
    BellIcon,
    LogOutIcon,
    ShieldCogIcon,
    ChevronRightIcon,
    RectangleEllipsisIcon,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    return (
        <Main>
            <ProfileContainer>
                <ProfilePictureContainer>
                    <img
                        src="https://avatars.githubusercontent.com/u/105328960?v=4"
                        alt="Profile Picture"
                    />
                </ProfilePictureContainer>

                <ProfileDataContainer>
                    <h1>John Doe</h1>

                    <ClimbTag>Niveau 6b</ClimbTag>
                </ProfileDataContainer>
            </ProfileContainer>

            <StatListContainer>
                <StatItem>
                    <StatLabel>Ascensions</StatLabel>
                    <StatValue>150</StatValue>
                </StatItem>
                <StatItem>
                    <StatLabel>Partenaires</StatLabel>
                    <StatValue>120</StatValue>
                </StatItem>
                <StatItem>
                    <StatLabel>Fiabilité</StatLabel>
                    <StatValue>98%</StatValue>
                </StatItem>
            </StatListContainer>

            <SessionContainer>
                <h2>Sessions à venir</h2>
                <SessionList>
                    <ProfileSession />
                </SessionList>
            </SessionContainer>

            <HistoryContainer>
                <h2>Historique</h2>
                <HistoryList>
                    {mockHistoryItems.map((item, index) => (
                        <HistoryItem
                            key={index}
                            tag={item.tag}
                            date={item.date}
                            name={item.name}
                            climbers={item.climbers}
                        />
                    ))}
                </HistoryList>
            </HistoryContainer>

            <SettingsSection>
                <h2>Paramètres du compte</h2>

                <SettingsList>
                    <SettingsButton>
                        <AtSignIcon />
                        <ButtonTitle>Changer d'email</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                    <SettingsButton>
                        <RectangleEllipsisIcon />
                        <ButtonTitle>Changer de mot de passe</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                    <SettingsButton>
                        <BellIcon />
                        <ButtonTitle>Notification</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                    <SettingsButton>
                        <ShieldCogIcon />
                        <ButtonTitle>Securité</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                    <SettingsButton
                        onClick={async () => {
                            await apiFetch("/api/auth/logout", {
                                method: "POST",
                            });
                            router.push("/");
                        }}
                    >
                        <LogOutIcon />
                        <ButtonTitle>Deconexion</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                </SettingsList>
            </SettingsSection>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const ProfileContainer = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid ${colors.main.primary}22;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        top: -25px;
        right: -25px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: ${colors.main.primary}22;
        z-index: 1;
        pointer-events: none;
    }
`;

const ProfilePictureContainer = styled.div`
    position: relative;
    width: 50px;
    height: 50px;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;

        border-radius: 50%;
        overflow: hidden;
        border: 3px solid ${colors.main.primary}AA;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        right: -8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 3px solid ${colors.main.primary}AA;
        background-color: white;
    }
`;

const ProfileDataContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;

    h1 {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const ClimbTag = styled.div`
    width: max-content;
    background-color: ${colors.main.secondary}44;
    color: ${colors.main.secondary};
    padding: 0.3rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
`;

const StatListContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 0.8rem;
`;

const StatItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid ${colors.main.primary}22;
`;

const StatLabel = styled.div`
    font-size: 0.8rem;
    color: black;
    font-weight: 500;
`;

const StatValue = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${colors.main.primary};
`;

const SessionContainer = styled.div`
    width: 100%;
    border-radius: 1rem;
    box-sizing: border-box;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
`;

const SessionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const HistoryContainer = styled.div`
    width: 100%;
    border-radius: 1rem;
    box-sizing: border-box;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
`;

const HistoryList = styled.div`
    display: flex;
    width: 100%;
    gap: 0.5rem;
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const SettingsSection = styled.div`
    width: 100%;
    margin-top: 16px;
    h2 {
        font-size: 14px;
        margin-bottom: 8px;
    }
`;

const SettingsList = styled.div`
    display: flex;
    flex-direction: column;
`;

const SettingsButton = styled.button`
    display: flex;
    width: 100%;
    background-color: white;
    border: 1px solid ${colors.border.default};
    padding: 12px;
    align-items: center;
    gap: 8px;
    padding: 12px;
    cursor: pointer;

    &:first-child {
        border-radius: 8px 8px 0 0;
    }

    &:last-child {
        border-radius: 0 0 8px 8px;
        color: red;
    }

    &:not(:last-child) {
        border-bottom: none;
    }
`;

const ButtonTitle = styled.span`
    width: 100%;
    font-size: 14px;
    text-align: left;
    font-weight: 500;
`;
