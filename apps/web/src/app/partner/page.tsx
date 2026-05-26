"use client";
import React from "react";
import { styled } from "styled-components";
import { SearchIcon, UserRoundPlus, ZapIcon } from "lucide-react";
import colors from "@/lib/colors";
import AvailableFriendCard from "@/components/available-friend-card";
import { useRouter } from "next/navigation";
export default function PartnerPage() {
    const router = useRouter();
    return (
        <Main>
            <h2>Tes partenaires</h2>
            <p>
                Retrouve tes partenaires et organise tes prochaines ascensions
                ensemble !
            </p>
            <SearchBar>
                <SearchIcon size={20} />
                <input type="text" placeholder="Rechercher un partenaire" />
            </SearchBar>

            <ActiveFriendSection>
                <h3>
                    <ZapIcon size={20} /> Disponible Maintenant
                </h3>

                <FriendList>
                    <AvailableFriendCard
                        name="John Doe"
                        avatarUrl="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                    />
                    <AvailableFriendCard
                        name="Jane Smith"
                        avatarUrl="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                    />

                    <AvailableFriendCard name="Alice Johnson" />
                </FriendList>
            </ActiveFriendSection>

            <AddFriendSection>
                <h4>Ajouter un partenaire</h4>
                <p>
                    Rejoins tes amis pour comparer vos progrès et planifier vos
                    sessions
                </p>
                <AddButton onClick={() => router.push("/partner/add")}>
                    <UserRoundPlus /> Trouver par code
                </AddButton>
            </AddFriendSection>

            <FriendSection>
                <ActiveFriendList>
                    <FriendItem>
                        <ImageContainer>
                            <ProfileImage
                                src="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                                alt="John Doe"
                            />
                        </ImageContainer>
                        <div>
                            <h5>John Doe</h5>
                            <NewTag>Nouveau</NewTag>

                            <TagList>
                                <Tag>Niveau 6b</Tag>
                                <Tag>Bloc & Voie</Tag>
                            </TagList>
                        </div>
                    </FriendItem>
                    <FriendItem>
                        <div></div>
                        <div>
                            <h5>Jane Smith</h5>
                            <p>Disponible maintenant</p>
                        </div>
                    </FriendItem>
                    <FriendItem>
                        <div></div>
                        <div>
                            <h5>Alice Johnson</h5>
                            <p>Disponible maintenant</p>
                        </div>
                    </FriendItem>
                    <FriendItem></FriendItem>
                    <FriendItem></FriendItem>
                </ActiveFriendList>
            </FriendSection>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    margin-top: 16px;
    background-color: ${colors.surface.light};
    border: 1px solid #bbcac5;

    input {
        flex: 1;
        border: none;
        background-color: transparent;
        font-size: 1rem;
    }
`;

const ActiveFriendSection = styled.section`
    margin-top: 32px;
    box-shadow: 0 4px 8px rgba(43, 187, 167, 0.08);
    background-color: ${colors.surface.light};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #eeeeee;

    h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: ${colors.main.primary};
    }

    ul {
        list-style: none;
    }
`;

const FriendList = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddFriendSection = styled.section`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid #b86dfd33;
    background-color: rgba(184, 109, 253, 0.1);
    border-radius: 16px;
`;

const AddButton = styled.button`
    h4 {
        font-size: 1.25rem;
        color: ${colors.main.secondary};
    }
    color: ${colors.main.secondary};
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: white;
    border: 1px solid ${colors.main.secondary};
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 8px;
`;

const FriendSection = styled.section`
    margin-top: 32px;
`;
const ActiveFriendList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const FriendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${colors.surface.light};
    border: 1px solid #eeeeee;

    h5 {
        font-size: 1rem;
        font-weight: 800;
    }
`;

const ImageContainer = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    overflow: hidden;
`;
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const NewTag = styled.span`
    background-color: ${colors.main.primary};
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
`;
const TagList = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`;
const Tag = styled.span`
    background-color: ${colors.surface.light};
    color: ${colors.main.primary};
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
`;
