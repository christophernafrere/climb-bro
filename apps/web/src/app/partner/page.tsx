"use client";
import { styled } from "styled-components";
import { SearchIcon, UserRoundPlus, ZapIcon } from "lucide-react";
import colors from "@/lib/colors";
import AvailableFriendCard from "@/components/available-friend-card";
import { useRouter } from "next/navigation";
import FriendCard from "@/components/friend-card";
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
                <AddButton onClick={() => router.push("/partner/scan")}>
                    <UserRoundPlus /> Trouver par code
                </AddButton>
            </AddFriendSection>

            <FriendSection>
                <ActiveFriendList>
                    <FriendCard
                        name="John Doe"
                        avatarUrl="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                        level="5a"
                        climbingStyle="Bloc"
                    />

                    <FriendCard
                        name="John Doe"
                        avatarUrl="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                        level="5a"
                        climbingStyle="Bloc"
                    />

                    <FriendCard
                        name="John Doe"
                        avatarUrl="https://media.istockphoto.com/id/1399565382/fr/photo/jeune-homme-daffaires-m%C3%A9tis-heureux-les-bras-crois%C3%A9s-travaillant-seul-dans-un-bureau-au.jpg?s=612x612&w=is&k=20&c=qDc547l1rJDlv9ELqYe-VGJEysQiTfwspCdXI_z-EGs="
                        level="5a"
                        climbingStyle="Bloc"
                    />
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
    border: 1px solid ${colors.border.default};

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
    border: 1px solid ${colors.border.light};

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
    border: 1px solid ${colors.border.accent};
    background-color: ${colors.main.secondarySoft};
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
    background-color: ${colors.surface.white};
    border: 1px solid ${colors.border.secondary};
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 8px;
`;

const FriendSection = styled.section``;
const ActiveFriendList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
