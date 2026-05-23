"use client";
import generateTeamName from "@/components/team-name-generator";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { DicesIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const climbGrades = [
    "4a",
    "4b",
    "4c",
    "5a",
    "5b",
    "5c",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
    "9b+",
    "9c",
];

export default function CreateClimbSession() {
    const [groupName, setGroupName] = useState("");
    const [selectedClimbType, setSelectedClimbType] = useState<string>("");
    const [minimalGrade, setMinimalGrade] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [minimalMembers, setMinimalMembers] = useState<number>(1);
    return (
        <main>
            <h1>Créer une séance</h1>
            <p>
                Invitez d'autres grimpeurs à rejoindre votre prochaine
                ascension.
            </p>

            <Form>
                <FormSection>
                    <label>
                        Nom du groupe
                        <NameInput>
                            <input
                                type="text"
                                name="groupName"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newGroupName = generateTeamName();
                                    setGroupName(newGroupName);
                                }}>
                                <DicesIcon size={20} />
                            </button>
                        </NameInput>
                    </label>
                    <SelectContainer>
                        <label>
                            <Radio
                                type="radio"
                                name="type"
                                value="bloc"
                                onChange={(e) =>
                                    setSelectedClimbType(e.target.value)
                                }
                                checked={selectedClimbType === "bloc"}
                            />
                            Bloc
                        </label>
                        <label>
                            <Radio
                                type="radio"
                                name="type"
                                value="tête"
                                onChange={(e) =>
                                    setSelectedClimbType(e.target.value)
                                }
                                checked={selectedClimbType === "tête"}
                            />
                            Tête
                        </label>
                        <label>
                            <Radio
                                type="radio"
                                name="type"
                                value="voie"
                                onChange={(e) =>
                                    setSelectedClimbType(e.target.value)
                                }
                                checked={selectedClimbType === "voie"}
                            />
                            Voie
                        </label>
                    </SelectContainer>
                </FormSection>

                <FormSection>
                    <label>
                        Date
                        <DateInput
                            type="datetime-local"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                </FormSection>
                <FormSection>
                    <label>
                        Message optionnel
                        <TextArea
                            placeholder="Ajoutez un message pour vos camarades de grimpe..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </FormSection>

                <FormSection>
                    <label>
                        Niveau requis : {minimalGrade}
                        <Slider
                            type="range"
                            min={0}
                            max={climbGrades.length - 1}
                            value={Math.max(
                                0,
                                climbGrades.indexOf(minimalGrade),
                            )}
                            onChange={(e) =>
                                setMinimalGrade(
                                    climbGrades[Number(e.target.value)],
                                )
                            }
                        />
                        <ButtonContainer>
                            <LevelButton
                                type="button"
                                $selected={minimalGrade === "4a"}
                                onClick={() => setMinimalGrade("4a")}>
                                4a
                            </LevelButton>

                            <LevelButton
                                type="button"
                                $selected={minimalGrade === "6a"}
                                onClick={() => setMinimalGrade("6a")}>
                                6a
                            </LevelButton>

                            <LevelButton
                                type="button"
                                $selected={minimalGrade === "9c"}
                                onClick={() => setMinimalGrade("9c")}>
                                9c
                            </LevelButton>
                        </ButtonContainer>
                    </label>
                </FormSection>

                <FormSection>
                    <label>
                        Nombre de participants max
                        <NumberInputContainer>
                            <NumberButton
                                onClick={() =>
                                    setMinimalMembers((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }>
                                -
                            </NumberButton>
                            <Input
                                type="number"
                                value={minimalMembers}
                                onChange={(e) =>
                                    setMinimalMembers(Number(e.target.value))
                                }
                                min={1}
                                max={100}
                            />
                            <NumberButton
                                onClick={() =>
                                    setMinimalMembers((prev) =>
                                        Math.min(100, prev + 1),
                                    )
                                }>
                                +
                            </NumberButton>
                        </NumberInputContainer>
                    </label>
                </FormSection>
                <SubmitButton type="submit">Publier la séance</SubmitButton>
            </Form>
        </main>
    );
}

const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px 0;
    gap: 16px;
    label {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.surface.light};
    gap: 8px;
    box-shadow: 0 4px 8px ${colors.main.accent}14;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 8px;
`;

const SubmitButton = styled(Button)`
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: ${colors.main.primary};
`;

const Radio = styled.input`
    display: none;
`;

const SelectContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    label {
        margin: auto;
        border-radius: 8px;
        width: 100%;
        background-color: ${colors.surface.soft};
        box-sizing: border-box;
        padding: 4px 8px;
        gap: 8px;
        text-align: center;

        &:has(${Radio}:checked) {
            background-color: ${colors.main.secondary};
            color: white;
        }
    }
`;

const NameInput = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
    background-color: ${colors.surface.cream};
    box-shadow: 0 4px 8px ${colors.main.accent}1a;
    border: 1px solid ${colors.border.light};

    border-radius: 8px;
    input {
        flex: 1;
        padding: 8px;
        border-radius: 8px;
        font-size: 16px;
        border: none;
        background-color: transparent;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: transparent;
    }
`;

const Input = styled.input`
    width: 100%;
    gap: 8px;
    background-color: ${colors.surface.cream};
    box-shadow: 0 4px 8px ${colors.main.accent}1a;
    border: 1px solid ${colors.border.light};
`;

const DateInput = styled.input`
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: ${colors.surface.cream};
    box-shadow: 0 4px 8px ${colors.main.accent}1a;
    border: 1px solid ${colors.border.light};
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 12px;
    background-color: ${colors.surface.cream};
    box-shadow: 0 4px 8px ${colors.main.accent}1a;
    border: 1px solid ${colors.border.light};
    resize: vertical;
    min-height: 80px;
`;

const Slider = styled.input`
    width: 100%;
    appearance: none;
    height: 6px;
    border-radius: 999px;
    background: ${colors.surface.muted};
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${colors.main.primary};
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${colors.main.primary};
        border: none;
        cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LevelButton = styled.button<{ $selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: ${colors.surface.cream};
    border-radius: 8px;
    border: 1px solid ${colors.border.default};

    ${({ $selected }) =>
        $selected &&
        `
            background-color: ${colors.main.secondary};
            color: white;
            border: 1px solid ${colors.main.secondary};
        `}
`;

const NumberInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${colors.surface.cream};
    padding: 6px;
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid ${colors.border.default};
    box-sizing: border-box;

    input {
        padding: 8px;
        background-color: transparent;
        border: none;
        text-align: center;
        box-shadow: none;
    }
`;

const NumberButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 16px;
    border: none;
    background-color: ${colors.surface.muted};
`;
