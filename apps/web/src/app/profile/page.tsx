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
    PencilIcon,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Popup from "@/layouts/popup";
import ModifyProfilePicturePopup from "@/components/modify-profile-picture-popup";

export default function page() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<{
        name: string;
        climbingLevel: string;
        weight: number;
        email: string;
        imageUrl: string;
        _count: {
            initiedPartnerships: number;
            receivedPartnerships: number;
        };
    } | null>(null);

    const [openPopupProfilePicture, setOpenPopupProfilePicture] =
        useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiFetch("/user/me");
                console.log("User profile retrieved:", response);

                const data = await response.json();
                console.log("User profile data:", data);
                setUserProfile(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error(
                    "Erreur lors de la récupération du profil utilisateur.",
                );
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <Main>
            <ProfileContainer>
                <ProfilePictureContainer>
                    <img
                        src={userProfile?.imageUrl || "/img/no-user.png"}
                        alt="Profile Picture"
                    />
                    <PPEditButton
                        onClick={() => setOpenPopupProfilePicture(true)}
                    >
                        <PencilIcon color="white" size={16} />
                    </PPEditButton>
                </ProfilePictureContainer>

                <ProfileDataContainer>
                    <h1> {userProfile?.name || "John Doe"} </h1>

                    <ClimbTag>
                        Niveau{" "}
                        {userProfile?.climbingLevel
                            ?.split("l")[1]
                            .toUpperCase() || "Inconnu"}
                    </ClimbTag>
                </ProfileDataContainer>
            </ProfileContainer>

            <StatListContainer>
                <StatItem>
                    <StatLabel>Ascensions</StatLabel>
                    <StatValue>150</StatValue>
                </StatItem>
                <StatItem>
                    <StatLabel>Partenaires</StatLabel>
                    <StatValue>
                        {(userProfile?._count.initiedPartnerships || 0) +
                            (userProfile?._count.receivedPartnerships || 0)}
                    </StatValue>
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
                            await apiFetch("/auth/logout", {
                                method: "POST",
                            });
                            toast.success("Déconnexion réussie !");
                            router.push("/");
                        }}
                    >
                        <LogOutIcon />
                        <ButtonTitle>Deconexion</ButtonTitle>
                        <ChevronRightIcon />
                    </SettingsButton>
                </SettingsList>
            </SettingsSection>
            {openPopupProfilePicture && (
                <ModifyProfilePicturePopup
                    isOpen={openPopupProfilePicture}
                    onClose={() => setOpenPopupProfilePicture(false)}
                    oldProfilePicture={userProfile?.imageUrl || null}
                />
            )}
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

const ProfilePictureContainer = styled.label`
    display: block;
    position: relative;
    width: 50px;
    height: 50px;

    input {
        display: none;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;

        border-radius: 50%;
        overflow: hidden;
        border: 3px solid ${colors.main.primary}AA;
    }
`;

const PPEditButton = styled.div`
    position: absolute;
    bottom: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${colors.main.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    cursor: pointer;
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
