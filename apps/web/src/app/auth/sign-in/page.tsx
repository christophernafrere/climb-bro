"use client";
import { EyeIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import colors from "@/lib/colors";
import { Button } from "@/layouts/button";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Main>
            <h1>Bienvenue au somet</h1>
            <p>Connecter vous pour retrouver votre communauté de grimpeur</p>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault();

                    const response = await fetch(
                        "http://localhost:8000/auth/sign-in",
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email,
                                password,
                            }),
                        },
                    );

                    if (response.ok) {
                        // Rediriger vers la page d'accueil ou une autre page protégée
                        router.push("/");
                    }
                }}
            >
                <label>
                    Email
                    <Inputcontainer>
                        <MailIcon size={20} color={"#6C7A76"} />
                        <input
                            type="email"
                            placeholder="nom@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Inputcontainer>
                </label>

                <label>
                    Mot de passe
                    <Inputcontainer>
                        <LockIcon size={20} color={"#6C7A76"} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <EyeIcon
                            size={20}
                            color={"#6C7A76"}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </Inputcontainer>
                    <Link href="/auth/forgot-password">
                        Mot de passe oublié?
                    </Link>
                </label>

                <Button type="submit">Se connecter</Button>
            </Form>

            <p>
                Pas encore de compte ?{" "}
                <Link href="/auth/sign-up">S'inscrire</Link>{" "}
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

    a {
        color: ${colors.main.primary};
        text-decoration: none;
        align-self: flex-end;
    }
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;

    label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: left;
        font-size: 15px;
        font-weight: 600;
    }

    button {
        border-radius: 8px;
    }
`;

const Inputcontainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    gap: 8px;
    background: white;

    input {
        outline: none;
        background: transparent;
        border: none;
        flex: 1;
    }
`;

const Separatorcontainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
`;

const Separator = styled.div`
    flex: 1;
    height: 1px;
    background-color: #f0f0f0;
`;

const SocialButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    width: 100%;
    border: 1px solid #ccc;
    background: white;
    color: #333;
`;
