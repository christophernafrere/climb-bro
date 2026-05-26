import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import React from "react";
import styled from "styled-components";

export default function AvailableFriendCard({
    name,
    avatarUrl,
}: {
    name: string;
    avatarUrl?: string;
}) {
    return (
        <Container>
            <AvatarContainer>
                {avatarUrl ? (
                    <Avatar src={avatarUrl} alt={name} />
                ) : (
                    <Initials>
                        {name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                    </Initials>
                )}
            </AvatarContainer>
            <InfoPart>
                <FriendName>{name}</FriendName>
            </InfoPart>
            <Buttons color="secondary">Inviter</Buttons>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
`;

const AvatarContainer = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        border: 2px solid white;
        border-radius: 50%;
        background-color: ${colors.main.primary};
    }
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const Initials = styled.span`
    position: absolute;
    font-size: 1rem;
    font-weight: bold;
    color: #555;
`;

const InfoPart = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const FriendName = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
`;

const Buttons = styled(Button)`
    display: flex;
    border-radius: 8px !important;
    gap: 8px;
`;
