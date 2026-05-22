import { prisma, QUESTIONAIRE_TYPE } from '../src/client.js';

const roleSeeds = [
    {
        name: 'Administrateur',
        description: 'Administrateur principal du projet',
        actions: [
            'Gérer les utilisateurs',
            'Gérer les rôles',
            'Gérer les permissions',
            'Gérer les partenaires',
            'Gérer les activités',
            'Gérer les réservations',
            'Gérer les paiements',
            'Gérer les rapports',
            'Gérer les paramètres du système',
            'Gérer les animateurs',
        ],
    },
    {
        name: 'Animateur',
        description: "Responsable d'ateliers et d'activités",
        actions: [
            "Gérer les activités qu'il gère",
            'Gérer les réservations',
            'Gérer les paiements',
            'Gérer les rapports',
        ],
    },
    {
        name: 'Hote',
        description:
            "Gérant de structure d'accueil non régulière (Restaurant, Hôtel, etc.)",
        actions: [
            'Gérer les activités',
            'Gérer les réservations',
            'Gérer les paiements',
            'Gérer les rapports',
        ],
    },
    {
        name: 'Partenaire',
        description:
            "Gérant de lieu d'activité régulière (Restaurant, Hôtel, etc.)",
        actions: [
            'Gérer les activités',
            'Suivre les réservations',
            'Suivre les paiements',
            'Gérer les rapports',
        ],
    },
    {
        name: 'Utilisateur',
        description: 'Utilisateur standard de la plateforme',
        actions: ['Accéder aux activités', 'Faire des réservations'],
    },
] as const;

async function main() {
    console.log('begin seeding');
    for (const roleSeed of roleSeeds) {
        const role = await prisma.role.upsert({
            where: { name: roleSeed.name },
            update: { description: roleSeed.description },
            create: {
                name: roleSeed.name,
                description: roleSeed.description,
            },
        });

        await prisma.rolePermission.deleteMany({
            where: { roleId: role.id },
        });

        await prisma.rolePermission.createMany({
            data: roleSeed.actions.map((action) => ({
                roleId: role.id,
                description: action,
            })),
        });
    }

    await prisma.$transaction([
        prisma.onBoardingAnswerProposition.deleteMany(),
        prisma.onBoardingQuestion.deleteMany(),
        prisma.onBoardingCategory.deleteMany(),
    ]);

    console.log('onboarding tables cleaned');
    await prisma.onBoardingCategory.create({
        data: {
            label: 'Votre Personnalité',
            value: 'votre-personnalite',
            questions: {
                create: [
                    {
                        question:
                            'Comment vos amis vous décriraient-ils en un mot ?',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Spontané(e)', order: 1 },
                                { answer: 'Fiable', order: 2 },
                                { answer: 'Rêveur(se)', order: 3 },
                                { answer: 'Leader', order: 4 },
                                { answer: 'Joyeux(se) / Optimiste', order: 5 },
                                {
                                    answer: 'Sociable / Extraverti(e)',
                                    order: 6,
                                },
                            ],
                        },
                    },
                    {
                        question: "Une soirée idéale pour vous, c'est plutôt :",
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                {
                                    answer: 'Un bon film ou un livre à la maison.',
                                    order: 1,
                                },
                                {
                                    answer: "Un dîner animé avec un petit groupe d'amis.",
                                    order: 2,
                                },
                                {
                                    answer: 'Une grande fête où rencontrer de nouvelles personnes.',
                                    order: 3,
                                },
                                {
                                    answer: 'Une sortie culturelle (théâtre, concert, expo).',
                                    order: 4,
                                },
                            ],
                        },
                    },
                    {
                        question: 'Face à un imprévu, votre réaction est de :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                {
                                    answer: "L'accueillir comme une nouvelle aventure.",
                                    order: 1,
                                },
                                {
                                    answer: 'Analyser la situation pour trouver la meilleure solution.',
                                    order: 2,
                                },
                                {
                                    answer: 'Vous sentir un peu déstabilisé(e).',
                                    order: 3,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.onBoardingCategory.create({
        data: {
            label: 'Vos Valeurs',
            value: 'vos-valeurs',
            questions: {
                create: [
                    {
                        question: "Classez par ordre d'importance pour vous",
                        type: QUESTIONAIRE_TYPE.MULTIPLE,
                        answerPropositions: {
                            create: [
                                { answer: 'La famille', order: 1 },
                                {
                                    answer: "L'épanouissement professionnel",
                                    order: 2,
                                },
                                {
                                    answer: 'Les voyages et la découverte',
                                    order: 3,
                                },
                                {
                                    answer: 'La sécurité et la stabilité',
                                    order: 4,
                                },
                            ],
                        },
                    },
                    {
                        question:
                            "Pour vous, la communication dans un couple, c'est avant tout :",
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                {
                                    answer: 'Une totale honnêteté, même si ça peut blesser.',
                                    order: 1,
                                },
                                {
                                    answer: "Beaucoup d'écoute et de bienveillance.",
                                    order: 2,
                                },
                                {
                                    answer: 'Des débats passionnés et stimulants.',
                                    order: 3,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.onBoardingCategory.create({
        data: {
            label: 'Vos Passions',
            value: 'vos-passions',
            questions: {
                create: [
                    {
                        question:
                            'Pendant votre temps libre, on vous trouve le plus souvent :',
                        type: QUESTIONAIRE_TYPE.MULTIPLE,
                        answerPropositions: {
                            create: [
                                { answer: 'Sport / plein air', order: 1 },
                                {
                                    answer: 'Créer / bricoler / jardiner',
                                    order: 2,
                                },
                                { answer: 'Lire / musée', order: 3 },
                                { answer: 'Apprendre / actualité', order: 4 },
                                {
                                    answer: 'Boire un verre avec des amis',
                                    order: 5,
                                },
                                { answer: 'Film / série', order: 6 },
                            ],
                        },
                    },
                    {
                        question:
                            'Le type de voyage qui vous correspond le mieux :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Farniente', order: 1 },
                                { answer: 'Aventure / randonnée', order: 2 },
                                { answer: 'City-trip culturel', order: 3 },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.onBoardingCategory.create({
        data: {
            label: 'Vos Attentes',
            value: 'vos-attentes',
            questions: {
                create: [
                    {
                        question:
                            "Qu'est-ce qui vous fait vous sentir le plus aimé(e) ?",
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Paroles valorisantes', order: 1 },
                                { answer: 'Temps de qualité', order: 2 },
                                { answer: 'Cadeaux', order: 3 },
                                { answer: 'Services rendus', order: 4 },
                                { answer: 'Contact physique', order: 5 },
                            ],
                        },
                    },
                    {
                        question:
                            'Votre partenaire idéal doit être avant tout :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Drôle', order: 1 },
                                { answer: 'Profond', order: 2 },
                                { answer: 'Soutenant', order: 3 },
                                { answer: 'Complice', order: 4 },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.onBoardingCategory.create({
        data: {
            label: 'Votre Style de Vie',
            value: 'votre-style-de-vie',
            questions: {
                create: [
                    {
                        question: 'Êtes-vous plutôt du matin ou du soir ?',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Lève-tôt', order: 1 },
                                { answer: 'Oiseau de nuit', order: 2 },
                            ],
                        },
                    },
                    {
                        question: 'Gestion des finances dans un couple :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Compte commun', order: 1 },
                                { answer: 'Comptes séparés', order: 2 },
                                { answer: 'Peu important', order: 3 },
                            ],
                        },
                    },
                    {
                        question: 'Au quotidien, vous êtes plutôt :',
                        type: QUESTIONAIRE_TYPE.MULTIPLE,
                        answerPropositions: {
                            create: [
                                { answer: 'Casanier', order: 1 },
                                { answer: 'Fêtard', order: 2 },
                                { answer: 'Sportif', order: 3 },
                                { answer: 'Épicurien', order: 4 },
                                { answer: 'Équilibré', order: 5 },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.onBoardingCategory.create({
        data: {
            label: 'Intimité et Relation',
            value: 'intimite-et-relation',
            questions: {
                create: [
                    {
                        question: 'La sexualité dans le couple est :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Priorité absolue', order: 1 },
                                { answer: 'Complément important', order: 2 },
                                { answer: 'Secondaire', order: 3 },
                            ],
                        },
                    },
                    {
                        question: "Dans l'intimité, vous êtes plutôt :",
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Explorateur', order: 1 },
                                { answer: 'Romantique', order: 2 },
                                { answer: 'Instinctif', order: 3 },
                            ],
                        },
                    },
                    {
                        question: 'Vision de la fidélité :',
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Exclusivité totale', order: 1 },
                                { answer: 'Ouverture possible', order: 2 },
                                { answer: 'Transparence avant tout', order: 3 },
                            ],
                        },
                    },
                    {
                        question: "Fréquence idéale de l'intimité :",
                        type: QUESTIONAIRE_TYPE.UNIQUE,
                        answerPropositions: {
                            create: [
                                { answer: 'Très régulière', order: 1 },
                                {
                                    answer: 'Quelques fois par semaine',
                                    order: 2,
                                },
                                { answer: 'Moins souvent', order: 3 },
                            ],
                        },
                    },
                    {
                        question: 'Pour pimenter votre vie intime :',
                        type: QUESTIONAIRE_TYPE.MULTIPLE,
                        answerPropositions: {
                            create: [
                                { answer: 'Communication', order: 1 },
                                { answer: 'Cadre / ambiance', order: 2 },
                                { answer: 'Humour / spontanéité', order: 3 },
                            ],
                        },
                    },
                ],
            },
        },
    });
    console.log('end of seeding');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
