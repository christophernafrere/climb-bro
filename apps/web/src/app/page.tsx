"use client";

import ClimbCard from "@/components/climb-card";
import colors from "@/lib/colors";
import { Info, TrophyIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
    const filters = [
        { name: "tous" },
        { name: "voie" },
        { name: "bloc" },
        { name: "tête" },
        { name: "moulinette" },
        { name: "niveau 4A" },
        { name: "niveau 4B" },
        { name: "niveau 4C" },
        { name: "niveau 5A" },
        { name: "niveau 5B" },
        { name: "niveau 5C" },
        { name: "niveau 6A" },
        { name: "niveau 6B" },
        { name: "niveau 6C" },
        { name: "niveau 7A" },
        { name: "niveau 7B" },
        { name: "niveau 7C" },
        { name: "niveau 8A" },
        { name: "niveau 8B" },
        { name: "niveau 8C" },
    ];

    const climbs = [
        {
            id: "1",
            name: "Première assention",
            date: "2026-05-25T10:00:00Z",
            type: ["voie", "tête"],
            level: ["6A", "6B", "6C"],
            members: [
                {
                    id: "1",
                    name: "John",
                    age: 30,
                },
            ],
        },
        {
            id: "2",
            name: "Les bloqueur de l'extrême",
            date: "2026-05-26T14:00:00Z",
            type: ["bloc"],
            level: ["5A", "5B", "5C"],
            members: [
                {
                    id: "1",
                    name: "Natalie",
                    age: 30,
                    profileImage:
                        "https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs=",
                },
                {
                    id: "2",
                    name: "Jane",
                    age: 28,
                    profileImage:
                        "https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs=",
                },
                {
                    id: "3",
                    name: "Doe",
                    age: 25,
                    profileImage:
                        "https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs=",
                },
            ],
        },
        {
            id: "3",
            name: "Moulinette pour les nuls",
            date: "2026-05-24porn vrT10:00:00Z",
            type: ["moulinette"],
            level: ["4A", "4B", "4C"],
            members: [
                {
                    id: "1",
                    name: "John",
                    age: 30,
                },
                {
                    id: "2",
                    name: "Jane",
                    age: 28,
                    profileImage:
                        "https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs=",
                },
                {
                    id: "3",
                    name: "Doe",
                    age: 25,
                    profileImage:
                        "https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs=",
                },
            ],
        },
    ];

    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
    return (
        <main>
            <h1>Climb Bro</h1>
            <p>
                Application installable pour trouver ton partenaire de grimpe.
            </p>

            <Filters>
                {filters.map((filter) => (
                    <FilterButton
                        key={filter.name}
                        $selected={
                            selectedFilter.includes(filter.name) ||
                            (filter.name === "tous" &&
                                selectedFilter.length === 0)
                        }
                        onClick={() => {
                            switch (filter.name) {
                                case "tous":
                                    setSelectedFilter([]);
                                    break;
                                default:
                                    setSelectedFilter((prev) =>
                                        prev.includes(filter.name)
                                            ? prev.filter(
                                                  (f) => f !== filter.name,
                                              )
                                            : [...prev, filter.name],
                                    );
                            }
                        }}>
                        {filter.name}
                    </FilterButton>
                ))}
            </Filters>
            <ClimbContainer>
                {climbs.slice(0, 2).map((climb) => (
                    <ClimbCard
                        key={climb.id}
                        groupName={climb.name}
                        type={climb.type[0]}
                        date={climb.date}
                        level={climb.level}
                        users={climb.members}
                    />
                ))}
            </ClimbContainer>

            <InfoContainer>
                <InfoCard>
                    <TrophyIcon size={32} color="white" />
                    Objectif de la semaine
                    <p>1/4 séances complétées</p>
                </InfoCard>
                <InfoCard>
                    <BallCoontainer>
                        <Ball className="ball-1" />
                        <Ball className="ball-2" />
                    </BallCoontainer>
                    Partenaires
                    <p>12 grimpeurs actifs</p>
                </InfoCard>
            </InfoContainer>

            <ClimbContainer>
                {climbs.slice(2).map((climb) => (
                    <ClimbCard
                        key={climb.id}
                        groupName={climb.name}
                        type={climb.type[0]}
                        date={climb.date}
                        level={climb.level}
                        users={climb.members}
                    />
                ))}
            </ClimbContainer>

            <AddButton> + </AddButton>
        </main>
    );
}

const Filters = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 8px;

    overflow-x: scroll;
    overflow-y: hidden;
    max-width: 100%;
    padding-bottom: 4px;
`;

const FilterButton = styled.button<{ $selected?: boolean }>`
    padding: 4px 12px;
    border-radius: 9999px;
    background-color: ${(props) => (props.$selected ? "#2BBBA7" : "#F8F9FA")};
    color: ${(props) => (props.$selected ? "#FFFFFF" : "#0f172a")};
    border: ${(props) => (props.$selected ? "none" : "1px solid #BBCAC5")};
    cursor: pointer;
`;

const ClimbContainer = styled.section`
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InfoContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const InfoCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    font-size: 18px;
    gap: 8px;
    background-color: ${colors.main.primary};
    color: white;
    font-weight: 800;
    border-radius: 8px;
    p {
        font-size: 14px;
        color: #ffffff81;
    }

    &:nth-child(2) {
        background-color: #e1e3e4;
        color: black;
        p {
            color: black;
        }
    }
`;

const BallCoontainer = styled.div`
    display: flex;
`;

const Ball = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;

    &.ball-1 {
        background-color: ${colors.main.secondary}A1;
    }

    &.ball-2 {
        background-color: ${colors.main.primary}A1;
        margin-left: -16px;
    }
`;

const AddButton = styled.button`
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background-color: ${colors.main.primary};
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
`;
