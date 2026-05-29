"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { CalendarDaysIcon, CalendarIcon } from "lucide-react";
import styled from "styled-components";
import FriendSessionItem from "./friend-session-item";

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
                <h4>Prochaine séances</h4>

                <SeanceList>
                    <FriendSessionItem />
                    <FriendSessionItem />
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
    border: 1px solid ${colors.border.light};
    button {
        width: 100%;
        border-radius: 8px;
    }

    h5 {
        font-size: 1.2rem;
        font-weight: 700;
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
    width: 100%;
    height: 3px;
    border-top: 1px solid ${colors.border.light};
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
