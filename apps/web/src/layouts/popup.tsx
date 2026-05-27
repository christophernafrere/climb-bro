import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner() {
    useEffect(() => {
        const scanner = new Html5Qrcode("reader");

        scanner
            .start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: {
                        width: 250,
                        height: 250,
                    },
                },
                (decodedText) => {
                    console.log("QR Code détecté :", decodedText);

                    // Exemple :
                    // window.location.href = decodedText;
                },
                () => {},
            )
            .catch(console.error);

        return () => {
            scanner.stop().catch(() => {});
        };
    }, []);

    return (
        <Container>
            <CameraContainer id="reader" />

            <Overlay />

            <ScanArea>
                <CornerTopLeft />
                <CornerTopRight />
                <CornerBottomLeft />
                <CornerBottomRight />

                <ScanLine />
            </ScanArea>

            <BottomContainer>
                <QRCodeButton>Mon QR Code</QRCodeButton>

                <HelpText>Problème de scan ?</HelpText>
            </BottomContainer>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: ${colors.surface.ink};
`;

const CameraContainer = styled.div`
    position: absolute;
    inset: 0;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(11, 17, 32, 0.45);
`;

const scanAnimation = keyframes`
    0% {
        top: 12%;
    }

    50% {
        top: 88%;
    }

    100% {
        top: 12%;
    }
`;

const ScanArea = styled.div`
    position: absolute;

    width: min(72vw, 320px);
    height: min(72vw, 320px);

    top: 42%;
    left: 50%;

    transform: translate(-50%, -50%);

    border-radius: 32px;

    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.45);

    z-index: 2;
`;

const CornerBase = styled.div`
    position: absolute;

    width: 42px;
    height: 42px;

    border-color: ${colors.main.accent};
    border-style: solid;
`;

const CornerTopLeft = styled(CornerBase)`
    top: 0;
    left: 0;

    border-width: 4px 0 0 4px;
    border-top-left-radius: 20px;
`;

const CornerTopRight = styled(CornerBase)`
    top: 0;
    right: 0;

    border-width: 4px 4px 0 0;
    border-top-right-radius: 20px;
`;

const CornerBottomLeft = styled(CornerBase)`
    bottom: 0;
    left: 0;

    border-width: 0 0 4px 4px;
    border-bottom-left-radius: 20px;
`;

const CornerBottomRight = styled(CornerBase)`
    bottom: 0;
    right: 0;

    border-width: 0 4px 4px 0;
    border-bottom-right-radius: 20px;
`;

const ScanLine = styled.div`
    position: absolute;

    left: 10%;
    width: 80%;
    height: 3px;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.95);

    box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);

    animation: ${scanAnimation} 2.2s linear infinite;
`;

const BottomContainer = styled.div`
    position: absolute;

    bottom: 48px;
    left: 50%;

    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;

    z-index: 5;
`;

const QRCodeButton = styled.button`
    border: none;

    padding: 14px 28px;

    border-radius: 999px;

    font-size: 16px;
    font-weight: 600;

    color: white;

    background: linear-gradient(
        135deg,
        ${colors.main.secondary},
        ${colors.main.purple}
    );

    cursor: pointer;

    backdrop-filter: blur(10px);
`;

const HelpText = styled.p`
    margin: 0;

    color: ${colors.surface.white};

    font-size: 14px;
    opacity: 0.85;
`;
