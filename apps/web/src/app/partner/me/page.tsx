"use client";
import styled from "styled-components";
import colors from "@/lib/colors";
import QRCode from "react-qr-code";
import { Button } from "@/layouts/button";
import { ScanQrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyQrCodePage() {
    const router = useRouter();
    return (
        <Main>
            <div>
                <h2>Mon QR Code</h2>

                <p>Scanne ce QR code pour devenir partenaire de grimpe</p>
            </div>
            <MainContent>
                <ProfileImageContainer>
                    <img
                        src="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                        alt="QR Code"
                    />
                </ProfileImageContainer>
                <ClimberData>
                    <h3>John Doe</h3>

                    <Tag className="primary">6b</Tag>
                </ClimberData>

                <QRCodeContainer>
                    <QRCode
                        value="https://climbbro.com/partenar/john-doe"
                        bgColor={colors.surface.cream}
                        fgColor={colors.main.primary}
                        level="H"
                    />
                </QRCodeContainer>
            </MainContent>

            <Button
                color="primary"
                style={{
                    width: "100%",
                }}
                onClick={() => {
                    router.push("/partner/scan");
                }}>
                <ScanQrCodeIcon size={20} />
                Ouvrir le scanner
            </Button>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: ${colors.surface.light};
    text-align: center;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: ${colors.surface.light};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
`;

const ProfileImageContainer = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid ${colors.main.primary}A1;
    padding: 4px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #fff;
    }
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
        border: 3px solid white;
        border-radius: 50%;
        background-color: ${colors.main.primary};
    }
`;

const Tag = styled.span`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    &.primary {
        background-color: ${colors.main.primary}1A;
        color: ${colors.main.primary};
    }
`;

const ClimberData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const QRCodeContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: ${colors.surface.cream};
    border-radius: 8px;
    box-shadow: 0 4px 6px ${colors.surface.soft};

    svg {
        width: 100%;
        height: auto;
    }
`;
