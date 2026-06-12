"use client";
import colors from "@/lib/colors";
import styled from "styled-components";

export default function HistoryItem({
    tag,
    date,
    name,
    climbers,
}: {
    tag?: string;
    date?: string;
    name?: string;
    climbers?: { name: string; avatar?: string }[];
}) {
    return (
        <Container>
            <Top>
                <Tag>{tag}</Tag>
                <Date>{date}</Date>
            </Top>

            <Name>{name}</Name>

            <ClimbersList>
                {climbers?.map((climber, index) => (
                    <Climber key={index} $gotAvatar={!!climber.avatar}>
                        {climber.avatar ? (
                            <img src={climber.avatar} alt={climber.name} />
                        ) : (
                            <div>{climber.name[0]}</div>
                        )}
                    </Climber>
                ))}
            </ClimbersList>
        </Container>
    );
}

const Container = styled.div`
    flex: 0 0 180px; /* largeur fixe */
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Tag = styled.span`
    background-color: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
`;

const Date = styled.span`
    font-size: 12px;
    color: #666;
`;

const Name = styled.h3`
    margin: 0;
    font-size: 16px;
`;

const ClimbersList = styled.div`
    display: flex;
    gap: 8px;
`;

const Climber = styled.div<{ $gotAvatar: boolean }>`
    width: 32px;
    height: 32px;
    border: 2px solid white;
    border-radius: 50%;

    &:not(:first-child) {
        margin-left: -16px;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    ${(props) =>
        !props.$gotAvatar &&
        `
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${colors.main.primary};
        color: white;
        font-weight: bold;
    `}
`;
