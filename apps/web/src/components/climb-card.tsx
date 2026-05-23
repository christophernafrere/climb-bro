"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import formatClimbDate from "@/lib/date";
import styled from "styled-components";

function getLowestLevel(levels: string[]) {
    const rankLevel = (value: string) => {
        const match = value.toUpperCase().match(/^(\d+)([A-Z])?/);

        if (!match) {
            return {
                number: Number.POSITIVE_INFINITY,
                suffix: "Z",
                raw: value,
            };
        }

        return {
            number: Number(match[1]),
            suffix: match[2] ?? "Z",
            raw: value,
        };
    };

    return levels.reduce((lowest, current) => {
        const currentRank = rankLevel(current);
        const lowestRank = rankLevel(lowest);

        if (currentRank.number < lowestRank.number) {
            return current;
        }

        if (
            currentRank.number === lowestRank.number &&
            currentRank.suffix < lowestRank.suffix
        ) {
            return current;
        }

        return lowest;
    }, levels[0] ?? "");
}

export default function ClimbCard({
    groupName,
    type,
    date,
    level,
    users,
}: {
    groupName: string;
    type: string;
    level: string[];
    date: string;
    users: any[];
}) {
    return (
        <Container>
            <TopContainer>
                <h3>{groupName}</h3>
                <TypeTag>
                    {type} - {getLowestLevel(level)}+
                </TypeTag>
            </TopContainer>
            <DateInfo>{formatClimbDate(date)}</DateInfo>
            <BottomContainer>
                <UsersList>
                    {users.map((user) => (
                        <UserCard key={user.id}>
                            {user.profileImage ? (
                                <img src={user.profileImage} alt={user.name} />
                            ) : (
                                user.name[0]
                            )}
                        </UserCard>
                    ))}
                </UsersList>

                <Button>Rejoindre</Button>
            </BottomContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: ${colors.surface.light};
    border-radius: 8px;
    box-shadow: 0 -4px 8px ${colors.main.accent}14;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    h3 {
        font-size: 18px;
    }
`;

const TypeTag = styled.span`
    padding: 4px 8px;
    background-color: ${colors.main.primary}4B;
    color: ${colors.main.primary};
    text-align: center;
    border-radius: 8px;
`;

const DateInfo = styled.span`
    color: ${colors.text.muted};
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

const UsersList = styled.div`
    display: flex;
`;

const UserCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: ${colors.main.accent};
    border: 2px solid ${colors.surface.light};
    border-radius: 9999px;
    margin-left: -8px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        object-fit: cover;
    }
`;
