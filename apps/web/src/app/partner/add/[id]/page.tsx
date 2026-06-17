"use client";
import { Button } from "@/layouts/button";
import { apiFetch } from "@/lib/api";
import colors from "@/lib/colors";
import { HandshakeIcon, QrCodeIcon, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddPartenarPage() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = React.useState<{
        id: string;
        name: string;
        climbingLevel: string;
        _count: {
            sessions?: number;
        };
        imageUrl: string;
    } | null>(null);
    const [alwaysIsFriend, setAlwaysIsFriend] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePartnership = await apiFetch(
                    `/partnership/check/${id}`,
                );
                const isExisting = await responsePartnership.json();
                setAlwaysIsFriend(isExisting);
                const responseUserData = await apiFetch(`/user/${id}`);
                const dataUser = await responseUserData.json();
                setUser(dataUser);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <Main>
            <IconContainer>
                <QrCodeIcon color={colors.main.primary} size={56} />
            </IconContainer>
            <h1>Code scanné !</h1>
            <p> Nous avons trouvé un grimpeur correspondant.</p>

            <DataSection>
                <header>
                    <PPContainer>
                        <PPImage
                            src={user?.imageUrl || "/img/no-user.png"}
                            alt="Profile Picture"
                        />
                    </PPContainer>
                </header>

                <DataContent>
                    <h2>{user?.name}</h2>

                    <StatContainer>
                        <StatItem>
                            Niveau{" "}
                            <span className="tag">
                                {user?.climbingLevel
                                    .split("l")[1]
                                    .toUpperCase()}
                            </span>
                        </StatItem>
                        <StatItem>
                            Sessions <span>{user?._count?.sessions ?? 0}</span>
                        </StatItem>
                    </StatContainer>
                </DataContent>
            </DataSection>

            <ButtonContainer>
                <Button
                    color="primary"
                    disabled={alwaysIsFriend}
                    onClick={() => {
                        apiFetch(`/partnership/add/${id}`, {
                            method: "POST",
                        }).then((response) => {
                            if (!response.ok) {
                                if (response.status === 409) {
                                    toast.error(
                                        "Ce grimpeur est déjà votre partenaire !",
                                    );
                                }

                                throw new Error("Failed to add partner");
                            }

                            router.push("/partner/me");
                            toast.success("Demande de partenariat envoyée !");
                        });
                    }}
                >
                    {alwaysIsFriend ? (
                        "Vous êtes déjà partenaires !"
                    ) : (
                        <>
                            <UserPlus size={20} />
                            Ajouter comme partenaire
                        </>
                    )}
                </Button>

                <Button color="secondary" onClick={() => router.back()}>
                    Annuler
                </Button>
            </ButtonContainer>

            <InfoSection>
                <h3>
                    <IconContainer className="short">
                        <HandshakeIcon color={colors.main.primary} size={16} />
                    </IconContainer>
                    Pourquoi matcher ?
                </h3>

                <p>
                    En matchant avec un partenaire, vous pourrez suivre vos
                    performances ensemble, partager vos sessions et progresser
                    plus rapidement.
                </p>
            </InfoSection>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const DataSection = styled.section`
    width: 100%;
    background-color: white;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        position: relative;
        width: 100%;
        height: 100px;
        margin-bottom: 50px;
        background: linear-gradient(60deg, #2bbba886, #b86dfd86);
    }
`;

const PPContainer = styled.div`
    position: absolute;
    bottom: -0;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 4px;
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const PPImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

const DataContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
`;

const StatContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const StatItem = styled.div`
    width: 100%;
    font-size: 0.9rem;
    background-color: #f3f4f5;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    border-radius: 4px;
    height: 80px;
    span {
        font-weight: bold;
        color: black;
        font-size: 1.2rem;

        .tag {
            background-color: red;
            color: white;
        }
    }

    span.tag {
        background-color: ${colors.main.primary};
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${colors.main.primary}33;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    &.short {
        width: 32px;
        height: 32px;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    button {
        width: 100%;
        border-radius: 8px;
    }
`;

const InfoSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid ${colors.main.primary}33;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: ${colors.main.primary}11;

    h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
        font-weight: bold;
        color: ${colors.main.primary};
    }
`;
