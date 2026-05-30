"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { MountainIcon, Radio } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function page() {
    const [name, setName] = useState("");
    const [gender, setGender] = useState<string | null>(null);
    const [weight, setWeight] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [climbType, setClimbType] = useState<string | null>(null);
    const [cguAccepted, setCguAccepted] = useState(false);

    return (
        <Main>
            <h1>Créer ton profile</h1>
            <p>
                Trouve facilement des partenaires de grimpe sans partager ton
                numéro.
            </p>

            <Form>
                <FormPart>
                    <TitlePart> Identité et connexion </TitlePart>
                    <Label>
                        Prénom ou Pseudo
                        <input
                            type="text"
                            placeholder="Jean Dupont"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Label>
                    <RadioSection>
                        Sexe (Discret)
                        <RadioGroup
                            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                            <RadioLabel $selected={gender === "male"}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={() => setGender("male")}
                                />
                                Homme
                            </RadioLabel>
                            <RadioLabel $selected={gender === "female"}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={() => setGender("female")}
                                />
                                Femme
                            </RadioLabel>
                            <RadioLabel $selected={gender === "other"}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    onChange={() => setGender("other")}
                                />
                                Autre
                            </RadioLabel>
                        </RadioGroup>
                    </RadioSection>
                    <Label>
                        Poids (optionnel)
                        <input
                            type="number"
                            placeholder="70 kg"
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Label>
                    <Label>
                        Email
                        <input
                            type="email"
                            placeholder="jean.dupont@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Label>

                    <Label>
                        Mot de passe
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Label>
                </FormPart>

                <FormPart>
                    <TitlePart> Profil de grimpeur </TitlePart>
                    <RadioSection>
                        Ton niveau actuel
                        <RadioGroup
                            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                            <RadioLabel $selected={climbType === "debutant"}>
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="debutant"
                                    onChange={() => setClimbType("debutant")}
                                />
                                Débutant
                            </RadioLabel>
                            <RadioLabel $selected={climbType === "5a-5c"}>
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="5a-5c"
                                    onChange={() => setClimbType("5a-5c")}
                                />
                                5a - 5c
                            </RadioLabel>
                            <RadioLabel $selected={climbType === "6a-6c"}>
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="6a-6c"
                                    onChange={() => setClimbType("6a-6c")}
                                />
                                6a - 6c
                            </RadioLabel>
                            <RadioLabel $selected={climbType === "7a+"}>
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="7a+"
                                    onChange={() => setClimbType("7a+")}
                                />
                                7a et plus
                            </RadioLabel>
                        </RadioGroup>
                    </RadioSection>

                    <RadioSection>
                        Type préféré
                        <RadioGroup
                            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                            <RadioLabel $selected={climbType === "bloc"}>
                                <MountainIcon size={20} color={"#6C7A76"} />
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="bloc"
                                    onChange={() => setClimbType("bloc")}
                                />
                                Bloc
                            </RadioLabel>
                            <RadioLabel $selected={climbType === "salle"}>
                                <MountainIcon size={20} color={"#6C7A76"} />
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="salle"
                                    onChange={() => setClimbType("salle")}
                                />
                                Salle
                            </RadioLabel>
                        </RadioGroup>
                    </RadioSection>
                </FormPart>
                <CGULabel>
                    <input
                        type="checkbox"
                        checked={cguAccepted}
                        onChange={(e) => setCguAccepted(e.target.checked)}
                    />{" "}
                    J'accepte les conditions J'accepte les condition généerale
                    d'utilisation et la politique de confidentialité
                </CGULabel>

                <Button
                    style={{ width: "100%", borderRadius: "8px" }}
                    color="primary"
                    type="submit">
                    Créer mon compte
                </Button>
            </Form>

            <p>
                Déjà membre ? <Link href="/auth/sign-in">Se connecter</Link>
            </p>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
    text-align: left;
`;

const FormPart = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${colors.surface.light};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #edeeef;
    box-shadow: 0 4px 12px ${colors.main.primary}01A;
`;

const TitlePart = styled.h2`
    font-size: 20px;
    font-weight: 700;
    margin: 0;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    font-size: 15px;
    font-weight: 600;

    input {
        outline: none;
        background: #f8f9fa;
        border: 1px solid #bbcac5;
        padding: 8px;
        border-radius: 4px;
    }
`;

const RadioSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
`;

const RadioGroup = styled.div`
    display: grid;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;

const RadioLabel = styled.label<{ $selected?: boolean }>`
    font-size: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    font-weight: 400;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #bbcac5;

    background: ${({ $selected }) => $selected && "#e0f7fa"};
    input {
        display: none;
    }
`;

const CGULabel = styled.label`
    font-size: 12px;
    color: ${colors.text.strong};
    display: flex;
    align-items: center;
    gap: 8px;
`;
