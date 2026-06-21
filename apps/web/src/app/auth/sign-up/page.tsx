"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { CameraIcon, MountainIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import type { ClimbingLevel, ClimbingType } from "@climb-bro/db";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/upload";

export default function page() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [gender, setGender] = useState<string | null>(null);
    const [weight, setWeight] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [climbType, setClimbType] = useState<ClimbingType | null>(null);
    const [climbingLevel, setClimbingLevel] = useState<ClimbingLevel | null>(
        null,
    );
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [cguAccepted, setCguAccepted] = useState(false);

    return (
        <Main>
            <h1>Créer ton profile</h1>
            <p>
                Trouve facilement des partenaires de grimpe sans partager ton
                numéro.
            </p>

            <Form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (!cguAccepted) {
                        alert(
                            "Vous devez accepter les conditions générales d'utilisation.",
                        );

                        router.push("/auth/sign-up");
                        return;
                    }

                    const imageUrl = await uploadImage(profilePicture as File);

                    const response = await apiFetch(
                        "/auth/sign-up",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                gender,
                                weight,
                                email,
                                password,
                                preferedClimbingType: climbType,
                                climbingLevel,
                                imageUrl,
                            }),
                        },
                        router,
                    );
                    const result = await response.json();
                    if (!response.ok) {
                        alert(
                            result.message ||
                                "Erreur lors de la création du compte.",
                        );
                        return;
                    }
                    alert("Compte créé avec succès !");
                    router.push("/auth/sign-in");
                }}
            >
                <FormPart>
                    <TitlePart> Identité et connexion </TitlePart>
                    <PofilePictureContainer>
                        <PhotoProfilButton>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setProfilePicture(file);
                                    }
                                }}
                            />
                            {profilePicture ? (
                                <img
                                    src={URL.createObjectURL(profilePicture)}
                                    alt="Profile Preview"
                                />
                            ) : (
                                <CameraIcon
                                    size={24}
                                    color={colors.main.primary}
                                />
                            )}
                            <PlusButton>+</PlusButton>
                        </PhotoProfilButton>

                        <p> Ajouter une photo de profil</p>
                    </PofilePictureContainer>

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
                            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                        >
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
                            onChange={(e) =>
                                setWeight(parseFloat(e.target.value) || 0)
                            }
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
                            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                        >
                            <RadioLabel $selected={climbingLevel === "l4a"}>
                                <input
                                    type="radio"
                                    name="climbLevel"
                                    value="l4a"
                                    onChange={() => setClimbingLevel("l4a")}
                                />
                                Débutant
                            </RadioLabel>
                            <RadioLabel $selected={climbingLevel === "l5a"}>
                                <input
                                    type="radio"
                                    name="climbLevel"
                                    value="l5a"
                                    onChange={() => setClimbingLevel("l5a")}
                                />
                                5a - 5c
                            </RadioLabel>
                            <RadioLabel $selected={climbingLevel === "l6a"}>
                                <input
                                    type="radio"
                                    name="climbLevel"
                                    value="l6a"
                                    onChange={() => setClimbingLevel("l6a")}
                                />
                                6a - 6c
                            </RadioLabel>
                            <RadioLabel $selected={climbingLevel === "l7a"}>
                                <input
                                    type="radio"
                                    name="climbLevel"
                                    value="l7a"
                                    onChange={() => setClimbingLevel("l7a")}
                                />
                                7a et plus
                            </RadioLabel>
                        </RadioGroup>
                    </RadioSection>

                    <RadioSection>
                        Type préféré
                        <RadioGroup
                            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                        >
                            <RadioLabel $selected={climbType === "BLOC"}>
                                <MountainIcon size={20} color={"#6C7A76"} />
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="BLOC"
                                    onChange={() => setClimbType("BLOC")}
                                />
                                Bloc
                            </RadioLabel>
                            <RadioLabel $selected={climbType === "VOIE"}>
                                <MountainIcon size={20} color={"#6C7A76"} />
                                <input
                                    type="radio"
                                    name="climbType"
                                    value="VOIE"
                                    onChange={() => setClimbType("VOIE")}
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
                    type="submit"
                >
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

    background: ${({ $selected }) => $selected && colors.main.primary}88;
    color: ${({ $selected }) => ($selected ? "white" : colors.text.strong)};
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

const PofilePictureContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        display: none;
    }
`;

const PhotoProfilButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 2px dashed ${colors.main.primary}aa;
    background: ${colors.main.primary}11;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
    }
`;

const PlusButton = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${colors.main.primary};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
`;
