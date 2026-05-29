import colors from "@/lib/colors";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function Popup({
    isOpen,
    onClose,
    children,
    style,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style: React.CSSProperties;
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);
    return (
        <Backdrop
            onClick={() => {
                onClose();
            }}
            style={{ display: isOpen ? "flex" : "none" }}>
            <Container style={style} onClick={(e) => e.stopPropagation()}>
                {children}
            </Container>
        </Backdrop>
    );
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    background-color: ${colors.surface.white};
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.15);
    width: 60%;
    min-height: 30%;
    display: flex;
`;
