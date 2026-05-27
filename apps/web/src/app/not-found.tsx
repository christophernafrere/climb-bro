"use client";
import { Button } from "@/layouts/button";
import colors from "@/lib/colors";
import { CompassIcon, HelpCircleIcon, OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function NotFound() {
    const router = useRouter();
    return (
        <Main>
            <ImageContainer>
                <Text404>404</Text404>
                <Ilustration src="/img/not-found.png" alt="Not Found" />
            </ImageContainer>
            <h2>Oops ! tu as devissé.</h2>
            <p>
                On dirais que cette voie n'existe pas ou qu'elle a été
                déséquipéee. Pas de panique, la corde te retient !
            </p>

            <Button color="primary" onClick={() => router.push("/")}>
                <CompassIcon color={colors.surface.light} /> Retour à l'accueil
            </Button>

            <HelperSection>
                <div>
                    <HelpCircleIcon color={colors.main.secondary} />
                    Aide
                </div>
                <div>
                    <OctagonAlertIcon color={colors.main.secondary} />
                    Signaler
                </div>
            </HelperSection>
        </Main>
    );
}

const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1000;

    gap: 1rem;
    h3 {
        font-size: 1.5rem;
        font-weight: 400;
    }
`;

const HelperSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 2rem;
        border: 1px solid ${colors.border.default};
        background-color: ${colors.surface.mist};
        border-radius: 0.5rem;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 50vw;
    height: 50vw;
    background-color: ${colors.surface.light};
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.15);
    overflow: hidden;
`;

const Ilustration = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Text404 = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 5rem;
    font-weight: 500;
    color: ${colors.surface.cloud};
`;
