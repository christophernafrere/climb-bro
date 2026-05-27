"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { CalendarDaysIcon, CalendarIcon } from "lucide-react";
import styled from "styled-components";

export default function FriendCard({
    name,
    avatarUrl,
    isNew,
    level,
    climbingStyle,
}: {
    name: string;
    avatarUrl?: string;
    isNew?: boolean;
    level: string;
    climbingStyle: string;
}) {
    return (
        <FriendItem>
            <ProfileSection>
                <ImageContainer>
                    <ProfileImage src={avatarUrl} alt={name} />
                </ImageContainer>
                <div>
                    <h5>{name}</h5>
                    {isNew && <NewTag>Nouveau</NewTag>}

                    <TagList>
                        <Tag>Niveau {level}</Tag>
                        <Tag>{climbingStyle}</Tag>
                    </TagList>
                </div>
            </ProfileSection>
            <Button color="primary">Proposer une seance</Button>
            <SeparatorHorizontal />

            <SeanceSection>
                <p>Prochaine séances</p>

                <SeanceList>
                    <SeanceItem>
                        <CalendarDaysIcon size={32} />

                        <DataSection>
                            <h4>Jeudi 14 Oct.</h4>
                            <p>18:00 - 20:00</p>
                        </DataSection>

                        <JoinButton>Rejoindre</JoinButton>
                    </SeanceItem>
                </SeanceList>
            </SeanceSection>
        </FriendItem>
    );
}

const ProfileSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`;

const FriendItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${colors.surface.light};
    border: 1px solid #eeeeee;
    button {
        width: 100%;
        border-radius: 8px;
    }

    h5 {
        font-size: 1rem;
        font-weight: 800;
    }
`;

const ImageContainer = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    overflow: hidden;
`;
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const NewTag = styled.span`
    background-color: ${colors.main.primary};
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
`;
const TagList = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`;
const Tag = styled.span`
    background-color: ${colors.surface.cream};
    color: ${colors.main.primary};
    border: 1px solid ${colors.main.primary}33;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;

    &:first-child {
        background-color: ${colors.main.primary}22;
        color: ${colors.main.primary};
        border: 1px solid ${colors.main.primary}33;
    }
`;

const SeparatorHorizontal = styled.div`
    height: 1px;
    margin: 16px 0;
    border-top: 1px solid black;
`;

const SeanceSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    p {
        font-size: 0.875rem;
        font-weight: 600;
    }
`;

const SeanceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    color: ${colors.main.primary};
    font-size: 0.875rem;
`;

const SeanceItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${colors.surface.cream};
    box-shadow: 0 2px 4px #2bbba850;
`;

const DataSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    width: 100%;
    h4 {
        font-size: 18px;
        font-weight: 500;
        color: black;
    }
    p {
        font-size: 14px;
        color: black;
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
