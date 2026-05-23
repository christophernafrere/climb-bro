"use client";

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
            {/* test d'affichage des filtres */}
            <ul>
                {selectedFilter.map((filter) => (
                    <li key={filter}>{filter}</li>
                ))}
            </ul>
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
