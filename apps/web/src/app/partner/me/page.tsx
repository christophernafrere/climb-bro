"use client";
import styled from "styled-components";
import colors from "@/lib/colors";
import QRCode from "react-qr-code";
import { Button } from "@/layouts/button";
import { ScanQrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function MyQrCodePage() {
    const router = useRouter();
    const [user, setUser] = useState<{
        id: string;
        name: string;
        climbingLevel: string;
        imageUrl: string;
    }>();

    useEffect(() => {
        const fetchMyData = async () => {
            const response = await apiFetch("/user/me");

            const data = await response.json();

            setUser(data);
        };

        fetchMyData();
    }, []);

    return (
        <Main>
            <div>
                <h2>Mon QR Code</h2>

                <p>Scanne ce QR code pour devenir partenaire de grimpe</p>
            </div>
            <MainContent>
                <ProfileImageContainer>
                    <img
                        src={user?.imageUrl || "/img/no-user.png"}
                        alt="QR Code"
                    />
                </ProfileImageContainer>
                <ClimberData>
                    <h3>{user?.name}</h3>

                    <Tag className="primary">
                        Niveau {user?.climbingLevel.split("l")[1].toUpperCase()}
                    </Tag>
                </ClimberData>

                <QRCodeContainer>
                    <QRCode
                        value={`http://localhost:3000/partner/add/${user?.id}`}
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
                }}
            >
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
