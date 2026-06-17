"use client";
import { Button } from "@/layouts/button";
import Popup from "@/layouts/popup";
import { apiFetch } from "@/lib/api";
import colors from "@/lib/colors";
import { uploadImage } from "@/lib/upload";
import { ArrowRightIcon, CameraIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function ModifyProfilePicturePopup({
    isOpen,
    onClose,
    oldProfilePicture,
}: {
    isOpen: boolean;
    onClose: () => void;
    oldProfilePicture: string | null;
}) {
    const router = useRouter();
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    return (
        <PopupWrapper
            isOpen={isOpen}
            onClose={onClose}
            style={{
                width: "80%",
                height: "300px",
                display: "flex",
                gap: "16px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Modifier la photo de profil</h1>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (!profilePicture) {
                        toast.warn("Veuillez sélectionner une image");
                        return;
                    }

                    const newImageUrl = uploadImage(profilePicture);

                    const response = await apiFetch(
                        "/user/profile/picture",
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                imageUrl: (await newImageUrl).secure_url,
                            }),
                        },
                        router,
                    );

                    if (!response.ok) {
                        toast.error(
                            "Erreur lors de la mise à jour de la photo de profil",
                        );
                        return;
                    }

                    toast.success("Photo de profil mise à jour avec succès");
                    onClose();
                    router.refresh();
                }}
            >
                <ProfilePictureContainer>
                    <PhotoProfilButton>
                        <img
                            src={oldProfilePicture || "/img/no-user.png"}
                            alt="Profile Preview"
                        />
                    </PhotoProfilButton>
                    <ArrowRightIcon size={56} color={colors.main.primary} />
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
                            <CameraIcon size={24} color={colors.main.primary} />
                        )}
                        <PlusButton>+</PlusButton>
                    </PhotoProfilButton>
                </ProfilePictureContainer>
                <ButtonContainer>
                    <CloseButton type="button" onClick={onClose}>
                        Annuler
                    </CloseButton>
                    <Button
                        style={{
                            borderRadius: "8px",
                        }}
                        color="primary"
                        type="submit"
                    >
                        Enregistrer
                    </Button>
                </ButtonContainer>
            </form>
        </PopupWrapper>
    );
}

const PopupWrapper = styled(Popup)`
    width: 80%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }

    gap h1 {
        font-size: 1.2rem;
        text-align: center;
    }
`;

const ProfilePictureContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
`;

const CloseButton = styled(Button)`
    border: 2px solid black;
    background: white;
    color: black;
    border-radius: 8px;
`;
