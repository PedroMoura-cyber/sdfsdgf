// ====================== CONFIGURAÇÕES GLOBAIS ======================
const DEBUG_MODE = true;
const MAX_HAND_CARDS = 5;
const CARD_SCALE = 0.4;
const INITIAL_EXCHANGE_CHARGES = 3;
const PHASES = [
    { name: "Iniciante", cultivationRequired: 0 },
    { name: "Aprendiz", cultivationRequired: 3 },
    { name: "Adepto", cultivationRequired: 6 },
    { name: "Mestre", cultivationRequired: 9 },
    { name: "Iluminado", cultivationRequired: 12 }
];

// ====================== LISTA COMPLETA DE CARTAS ======================
const CARD_TEMPLATES = {
    // ---- FASE DO APRENDIZADO ARCANO ----
    CELESTIAL_BLADE: {
        name: "Lâmina Celeste",
        type: "attack",
        levels: [
            { damage: 6, defense: 0, texture: "celestial_blade_1", description: "Corte básico de magia arcana" },
            { damage: 9, defense: 0, texture: "celestial_blade_2", description: "Corte aprimorado com energia mística" },
            { damage: 12, defense: 0, texture: "celestial_blade_3", description: "Corte magistral que canaliza o éter" }
        ]
    },

    MISTY_ARROW: {
        name: "Flecha Nebulosa",
        type: "attack",
        levels: [
            { 
                damage: 5, defense: 0, texture: "misty_arrow_1",
                description: "Toque da Névoa: +3 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 3;
                    return target.takeDamage(5);
                }
            },
            { 
                damage: 6, defense: 0, texture: "misty_arrow_2",
                description: "Toque da Névoa: +5 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 5;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 7, defense: 0, texture: "misty_arrow_3",
                description: "Toque da Névoa: +7 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 7;
                    return target.takeDamage(7);
                }
            }
        ]
    },

    EARTHEN_CLAW: {
        name: "Garra Terrena",
        type: "attack",
        levels: [
            { 
                damage: 4, defense: 0, texture: "earthen_claw_1",
                description: "Toque da Névoa: +4 DEF",
                effect: (game, player, target) => {
                    player.defense += 4;
                    return target.takeDamage(4);
                }
            },
            { 
                damage: 6, defense: 0, texture: "earthen_claw_2",
                description: "Toque da Névoa: +6 DEF",
                effect: (game, player, target) => {
                    player.defense += 6;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 8, defense: 0, texture: "earthen_claw_3",
                description: "Toque da Névoa: +8 DEF",
                effect: (game, player, target) => {
                    player.defense += 8;
                    return target.takeDamage(8);
                }
            }
        ]
    },

    MAGE_GLOW: {
        name: "Brilho do Mago",
        type: "special",
        levels: [
            { 
                damage: 4, defense: 0, texture: "mage_glow_1",
                description: "Essência +1",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    return target.takeDamage(4);
                }
            },
            { 
                damage: 4, defense: 0, texture: "mage_glow_2",
                description: "Essência +2",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    return target.takeDamage(4);
                }
            },
            { 
                damage: 4, defense: 0, texture: "mage_glow_3",
                description: "Essência +3",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    return target.takeDamage(4);
                }
            }
        ]
    },

    ARCANE_BASTION: {
        name: "Baluarte Arcano",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 5, 
                texture: "arcane_bastion_1",
                description: "Essência +1 | DEF +5",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.defense += 5;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 5, 
                texture: "arcane_bastion_2",
                description: "Essência +2 | DEF +5",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    player.defense += 5;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 5, 
                texture: "arcane_bastion_3",
                description: "Essência +3 | DEF +5",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.defense += 5;
                    return 0;
                }
            }
        ]
    },

    CRYSTAL_BLOOD: {
        name: "Sangue de Cristal",
        type: "special",
        levels: [
            { 
                damage: 0, 
                defense: 0, 
                texture: "crystal_blood_1",
                description: "Essência +2 | Próximo ataque perfura armaduras",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    player.systems.addContinuousEffect({
                        description: "Perfurar Armadura",
                        duration: 1,
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            // Níveis 2 e 3 seguem o mesmo padrão com valores aumentados
            { 
                damage: 0, 
                defense: 0, 
                texture: "crystal_blood_2",
                description: "Essência +3 | Próximo ataque perfura armaduras",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.systems.addContinuousEffect({
                        description: "Perfurar Armadura",
                        duration: 1,
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "crystal_blood_3",
                description: "Essência +4 | Próximo ataque perfura armaduras",
                effect: (game, player, target) => {
                    player.systems.essence += 4;
                    player.systems.addContinuousEffect({
                        description: "Perfurar Armadura",
                        duration: 1,
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return 0;
                
                }
            }
        ]
    },

    GRIFFIN_FURY: {
        name: "Fúria do Grifo",
        type: "attack",
        levels: [
            { 
                damage: 10, 
                defense: 0, 
                essenceCost: 1,
                texture: "griffin_fury_1",
                description: "(Custo: 1 Essência) 10 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        return target.takeDamage(10);
                    }
                    return 0;
                }
            },
            { 
                damage: 13, 
                defense: 0, 
                essenceCost: 1,
                texture: "griffin_fury_2",
                description: "(Custo: 1 Essência) 13 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        return target.takeDamage(13);
                    }
                    return 0;
                }
            },
            { 
                damage: 16, 
                defense: 0, 
                essenceCost: 1,
                texture: "griffin_fury_3",
                description: "(Custo: 1 Essência) 16 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        return target.takeDamage(16);
                    }
                    
                }
            }
        ]
    },

    ANCESTRAL_THUNDER: {
        name: "Trovão Ancestral",
        type: "attack",
        levels: [
            { 
                damage: 5, 
                defense: 0, 
                essenceCost: 1,
                texture: "ancestral_thunder_1",
                description: "(Custo: 1 Essência) 5 ATK | Sangrando: +6 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const baseDmg = target.takeDamage(5);
                        if (player.systems.bleedingStacks > 0) {
                            baseDmg += target.takeDamage(6);
                        }
                        return baseDmg;
                    }
                    return 0;
                }
            },
            { 
                damage: 8, 
                defense: 0, 
                essenceCost: 1,
                texture: "ancestral_thunder_2",
                description: "(Custo: 1 Essência) 8 ATK | Sangrando: +9 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const baseDmg = target.takeDamage(8);
                        if (player.systems.bleedingStacks > 0) {
                            baseDmg += target.takeDamage(9);
                        }
                        return baseDmg;
                    }
                    return 0;
                }
            },
            { 
                damage: 11, 
                defense: 0, 
                essenceCost: 1,
                texture: "ancestral_thunder_3",
                description: "(Custo: 1 Essência) 11 ATK | Sangrando: +12 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const baseDmg = target.takeDamage(11);
                        if (player.systems.bleedingStacks > 0) {
                            baseDmg += target.takeDamage(12);
                        }
                        return baseDmg;
                    }
                    return 0;
                }
            }
        ]
    },

    VENGEANCE_CUT: {
        name: "Corte da Vingança",
        type: "attack",
        levels: [
            { 
                damage: 4, 
                defense: 0, 
                texture: "vengeance_cut_1",
                description: "Foco da Lâmina +2",
                effect: (game, player, target) => {
                    player.systems.focus += 2;
                    return target.takeDamage(4);
                }
            },
            { 
                damage: 6, 
                defense: 0, 
                texture: "vengeance_cut_2",
                description: "Foco da Lâmina +3",
                effect: (game, player, target) => {
                    player.systems.focus += 3;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 8, 
                defense: 0, 
                texture: "vengeance_cut_3",
                description: "Foco da Lâmina +4",
                effect: (game, player, target) => {
                    player.systems.focus += 4;
                    return target.takeDamage(8);
                }
            }
        ]
    },

    RUNIC_SHIELD: {
        name: "Escudo Rúnico",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 4, 
                texture: "runic_shield_1",
                description: "DEF +4 | Foco da Lâmina +2",
                effect: (game, player, target) => {
                    player.defense += 4;
                    player.systems.focus += 2;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 6, 
                texture: "runic_shield_2",
                description: "DEF +6 | Foco da Lâmina +3",
                effect: (game, player, target) => {
                    player.defense += 6;
                    player.systems.focus += 3;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 8, 
                texture: "runic_shield_3",
                description: "DEF +8 | Foco da Lâmina +4",
                effect: (game, player, target) => {
                    player.defense += 8;
                    player.systems.focus += 4;
                    return 0;
                }
            }
        ]
    },

    PHANTOM_DART: {
        name: "Dardo Fantasma",
        type: "attack",
        levels: [
            { 
                damage: 8, 
                defense: 0, 
                essenceCost: 1,
                texture: "phantom_dart_1",
                description: "(Custo: 1 Essência) 8 ATK | Sangrando: recupera Foco gasto",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const dmg = target.takeDamage(8);
                        if (player.systems.bleedingStacks > 0) {
                            player.systems.focus += 1; // Recupera o Foco gasto
                        }
                        return dmg;
                    }
                    return 0;
                }
            },
            { 
                damage: 11, 
                defense: 0, 
                essenceCost: 1,
                texture: "phantom_dart_2",
                description: "(Custo: 1 Essência) 11 ATK | Sangrando: recupera Foco gasto",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const dmg = target.takeDamage(11);
                        if (player.systems.bleedingStacks > 0) {
                            player.systems.focus += 1; // Recupera o Foco gasto
                        }
                        return dmg;
                    }
                    return 0;
                }
            },
            { 
                damage: 14, 
                defense: 0, 
                essenceCost: 1,
                texture: "phantom_dart_3",
                description: "(Custo: 1 Essência) 14 ATK | Sangrando: recupera Foco gasto",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const dmg = target.takeDamage(14);
                        if (player.systems.bleedingStacks > 0) {
                            player.systems.focus += 1; // Recupera o Foco gasto
                        }
                        return dmg;
                    }
                    return 0;
                }
            }
        ]
    },

    ENCHANTED_GALE: {
        name: "Vendaval Encantado",
        type: "attack",
        levels: [
            { 
                damage: 3, 
                defense: 0, 
                texture: "enchanted_gale_1",
                description: "ATK x2",
                effect: (game, player, target) => {
                    return target.takeDamage(3) + target.takeDamage(3);
                }
            },
            { 
                damage: 4, 
                defense: 0, 
                texture: "enchanted_gale_2",
                description: "ATK x2",
                effect: (game, player, target) => {
                    return target.takeDamage(4) + target.takeDamage(4);
                }
            },
            { 
                damage: 6, 
                defense: 0, 
                texture: "enchanted_gale_3",
                description: "ATK x2",
                effect: (game, player, target) => {
                    return target.takeDamage(6) + target.takeDamage(6);
                }
            }
        ]
    },

    // ---- FASE DA TORRE DO FEITICEIRO ----
    ETHEREAL_WALL: {
        name: "Muralha de Éter",
        type: "defense",
        levels: [
            { 
                defense: 8, damage: 0, texture: "ethereal_wall_1",
                description: "Toque da Névoa: Cura +3",
                effect: (game, player, target) => {
                    player.defense += 8;
                    player.heal(3);
                    return 0;
                }
            },
            { 
                defense: 11, damage: 0, texture: "ethereal_wall_2",
                description: "Toque da Névoa: Cura +5",
                effect: (game, player, target) => {
                    player.defense += 11;
                    player.heal(5);
                    return 0;
                }
            },
            { 
                defense: 14, damage: 0, texture: "ethereal_wall_3",
                description: "Toque da Névoa: Cura +7",
                effect: (game, player, target) => {
                    player.defense += 14;
                    player.heal(7);
                    return 0;
                }
            }
        ]
    },

    ARCANIST_RIDDLE: {
        name: "Enigma do Arcanista",
        type: "attack",
        levels: [
            { 
                damage: 6, defense: 0, texture: "arcanist_riddle_1",
                description: "Toque da Névoa: Foco +2",
                effect: (game, player, target) => {
                    player.systems.focus += 2;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 8, defense: 0, texture: "arcanist_riddle_2",
                description: "Toque da Névoa: Foco +3",
                effect: (game, player, target) => {
                    player.systems.focus += 3;
                    return target.takeDamage(8);
                }
            },
            { 
                damage: 10, defense: 0, texture: "arcanist_riddle_3",
                description: "Toque da Névoa: Foco +4",
                effect: (game, player, target) => {
                    player.systems.focus += 4;
                    return target.takeDamage(10);
                }
            }
        ]
    },

    ARCANE_MIRAGE: {
        name: "Miragem Arcana",
        type: "attack",
        levels: [
            { 
                damage: 0, defense: 0, texture: "arcane_mirage_1",
                description: "Toque da Névoa: 9 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 9;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "arcane_mirage_2",
                description: "Toque da Névoa: 13 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 13;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "arcane_mirage_3",
                description: "Toque da Névoa: 17 ATK",
                effect: (game, player, target) => {
                    player.systems.focus += 17;
                    return 0;
                }
            }
        ]
    },

    TRANSCENDENT_RHYTHM: {
        name: "Ritmo do Transcendente",
        type: "special",
        levels: [
            { 
                damage: 0, defense: 0, texture: "transcendent_rhythm_1",
                description: "Essência +3",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "transcendent_rhythm_2",
                description: "Essência +4",
                effect: (game, player, target) => {
                    player.systems.essence += 4;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "transcendent_rhythm_3",
                description: "Essência +5",
                effect: (game, player, target) => {
                    player.systems.essence += 5;
                    return 0;
                }
            }
        ]
    },

    FORGE_SPIRIT: {
        name: "Espírito da Forja",
        type: "attack",
        levels: [
            { 
                damage: 0, defense: 0, texture: "forge_spirit_1",
                description: "Essência +2 | Se Essência >2: +3 ATK x2",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    if (player.systems.essence > 2) {
                        target.takeDamage(3);
                        target.takeDamage(3);
                    }
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "forge_spirit_2",
                description: "Essência +3 | Se Essência >3: +3 ATK x2",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    if (player.systems.essence > 3) {
                        target.takeDamage(3);
                        target.takeDamage(3);
                    }
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "forge_spirit_3",
                description: "Essência +4 | Se Essência >4: +3 ATK x2",
                effect: (game, player, target) => {
                    player.systems.essence += 4;
                    if (player.systems.essence > 4) {
                        target.takeDamage(3);
                        target.takeDamage(3);
                    }
                    return 0;
                }
            }
        ]
    },

    LEVIATHAN_PRESENCE: {
        name: "Presença do Leviatã",
        type: "attack",
        levels: [
            { 
                damage: 16, 
                defense: 0, 
                essenceCost: 2,
                texture: "leviathan_presence_1",
                description: "(Custo: 2 Essência) 16 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 2) {
                        player.systems.essence -= 2;
                        return target.takeDamage(16);
                    }
                    return 0;
                }
            },
            { 
                damage: 20, 
                defense: 0, 
                essenceCost: 2,
                texture: "leviathan_presence_2",
                description: "(Custo: 2 Essência) 20 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 2) {
                        player.systems.essence -= 2;
                        return target.takeDamage(20);
                    }
                    return 0;
                }
            },
            { 
                damage: 24, 
                defense: 0, 
                essenceCost: 2,
                texture: "leviathan_presence_3",
                description: "(Custo: 2 Essência) 24 ATK",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 2) {
                        player.systems.essence -= 2;
                        return target.takeDamage(24);
                    }
                    return 0;
                }
            }
        ]
    },

    SAGE_MEDITATION: {
        name: "Meditação do Sábio",
        type: "special",
        levels: [
            { 
                damage: 0, 
                defense: 0, 
                texture: "sage_meditation_1",
                description: "Essência +1 | Foco +3",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.focus += 3;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "sage_meditation_2",
                description: "Essência +1 | Foco +4",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.focus += 4;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "sage_meditation_3",
                description: "Essência +1 | Foco +5",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.focus += 5;
                    return 0;
                }
            }
        ]
    },

    HARMONIZATION_CIRCLE: {
        name: "Círculo de Harmonização",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 9, 
                texture: "harmonization_circle_1",
                description: "DEF +9 | Consome Foco: +1 Essência por ponto",
                effect: (game, player, target) => {
                    player.defense += 9;
                    player.systems.essence += player.systems.focus;
                    player.systems.focus = 0;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 14, 
                texture: "harmonization_circle_2",
                description: "DEF +14 | Consome Foco: +1 Essência por ponto",
                effect: (game, player, target) => {
                    player.defense += 14;
                    player.systems.essence += player.systems.focus;
                    player.systems.focus = 0;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 19, 
                texture: "harmonization_circle_3",
                description: "DEF +19 | Consome Foco: +1 Essência por ponto",
                effect: (game, player, target) => {
                    player.defense += 19;
                    player.systems.essence += player.systems.focus;
                    player.systems.focus = 0;
                    return 0;
                }
            }
        ]
    },

    ABYSSAL_BLADE: {
        name: "Lâmina do Abismo",
        type: "attack",
        levels: [
            { 
                damage: 8, 
                defense: 0, 
                essenceCost: 1,
                texture: "abyssal_blade_1",
                description: "(Custo: 1 Essência) 8 ATK | Sangrando: DEF = dano causado",
                effect: (game, player, target) => {
                    if (player.systems.essence >= 1) {
                        player.systems.essence -= 1;
                        const dmg = target.takeDamage(8);
                        if (player.systems.bleedingStacks > 0) {
                            player.defense = dmg;
                        }
                        return dmg;
                    }
                    return 0;
                }
            },
            { 
                damage: 11, 
                defense: 0, 
                essenceCost: 1,
                texture: "abyssal_blade_2",
                description: "(Custo: 1 Essência) 11 ATK | Sangrando: DEF = dano causado",
                effect: (game, player, target) => {
                    // Implementação similar ao nível 1
                }
            },
            { 
                damage: 14, 
                defense: 0, 
                essenceCost: 1,
                texture: "abyssal_blade_3",
                description: "(Custo: 1 Essência) 14 ATK | Sangrando: DEF = dano causado",
                effect: (game, player, target) => {
                    // Implementação similar ao nível 1
                }
            }
        ]
    },

ARTIFICER_WILL: {
    name: "Vontade do Artífice",
    type: "attack",
    levels: [
        { 
            damage: 8, 
            defense: 0, 
            essenceCost: 1,
            texture: "artificer_will_1",
            description: "(Custo: 1 Essência) 8 ATK | Sangrando: Foco +3",
            effect: (game, player, target) => {
                if (player.systems.essence >= 1) {
                    player.systems.essence -= 1;
                    const dmg = target.takeDamage(8);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.focus += 3;
                    }
                    return dmg;
                }
                return 0;
            }
        },
        { 
            damage: 11, 
            defense: 0, 
            essenceCost: 1,
            texture: "artificer_will_2",
            description: "(Custo: 1 Essência) 11 ATK | Sangrando: Foco +4",
            effect: (game, player, target) => {
                if (player.systems.essence >= 1) {
                    player.systems.essence -= 1;
                    const dmg = target.takeDamage(11);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.focus += 4;
                    }
                    return dmg;
                }
                return 0;
            }
        },
        { 
            damage: 8, 
            defense: 0, 
            essenceCost: 1,
            texture: "artificer_will_3",
            description: "(Custo: 1 Essência) 14 ATK | Sangrando: Foco +5",
            effect: (game, player, target) => {
                if (player.systems.essence >= 1) {
                    player.systems.essence -= 1;
                    const dmg = target.takeDamage(14);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.focus += 5;
                    }
                    return dmg;
                }
                return 0;
            }
        },


    ]
},

MOONLIGHT_SOLACE: {
    name: "Luar Consolador",
    type: "continuous",
    levels: [
        { 
            damage: 0, 
            defense: 0, 
            texture: "moonlight_solace_1",
            description: "Contínuo: Cura 2HP por 'Lâmina Nebulosa'",
            effect: (game, player, target) => {
                player.systems.addContinuousEffect({
                    description: "Cura por Lâmina Nebulosa",
                    onCardPlay: (card) => {
                        if (card.name === "Flecha Nebulosa") {
                            player.heal(2);
                        }
                    },
                    expired: false
                });
                return 0;
            }
        },
        { 
            damage: 0, 
            defense: 0, 
            texture: "moonlight_solace_2",
            description: "Contínuo: Cura 3HP por 'Lâmina Nebulosa'",
            effect: (game, player, target) => {
                player.systems.addContinuousEffect({
                    description: "Cura por Lâmina Nebulosa",
                    onCardPlay: (card) => {
                        if (card.name === "Flecha Nebulosa") {
                            player.heal(3);
                        }
                    },
                    expired: false
                });
                return 0;
            }
        },
        { 
            damage: 0, 
            defense: 0, 
            texture: "moonlight_solace_3",
            description: "Contínuo: Cura 4HP por 'Lâmina Nebulosa'",
            effect: (game, player, target) => {
                player.systems.addContinuousEffect({
                    description: "Cura por Lâmina Nebulosa",
                    onCardPlay: (card) => {
                        if (card.name === "Flecha Nebulosa") {
                            player.heal(4);
            }
        },
        expired: false
    
    });
        return 0;

            }
        },
    ]
},

    CRUEL_NECESSITY: {
        name: "Necessidade Cruel",
        type: "attack",
        levels: [
            { 
                damage: 4, defense: 0, texture: "cruel_necessity_1",
                description: "ATK x2 | Toque da Névoa: Próximo ataque ignora DEF",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(4) + target.takeDamage(4);
                    player.systems.addContinuousEffect({
                        description: "Ignorar DEF",
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return dmg;
                }
            },
            { 
                damage: 6, defense: 0, texture: "cruel_necessity_2",
                description: "ATK x2 | Toque da Névoa: Próximo ataque ignora DEF",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(6) + target.takeDamage(6);
                    player.systems.addContinuousEffect({
                        description: "Ignorar DEF",
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return dmg;
                }
            },
            { 
                damage: 8, defense: 0, texture: "cruel_necessity_3",
                description: "ATK x2 | Toque da Névoa: Próximo ataque ignora DEF",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(8) + target.takeDamage(8);
                    player.systems.addContinuousEffect({
                        description: "Ignorar DEF",
                        onCardPlay: (card) => {
                            if (card.type === "attack") card.ignoreDefense = true;
                            this.expired = true;
                        },
                        expired: false
                    });
                    return dmg;
                }
            }
        ]
    },

    STARPIERCER: {
        name: "Perfurante das Estrelas",
        type: "attack",
        levels: [
            { 
                damage: 0, defense: 0, texture: "starpiercer_1",
                description: "Essência +2 | ATK = Essência",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    return target.takeDamage(player.systems.essence);
                }
            },
            { 
                damage: 0, defense: 0, texture: "starpiercer_2",
                description: "Essência +3 | ATK = Essência",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    return target.takeDamage(player.systems.essence);
                }
            },
            { 
                damage: 0, defense: 0, texture: "starpiercer_3",
                description: "Essência +4 | ATK = Essência",
                effect: (game, player, target) => {
                    player.systems.essence += 4;
                    return target.takeDamage(player.systems.essence);
                }
            }
        ]
    },

    SPECTRAL_OPPRESSION: {
        name: "Opressão Espectral",
        type: "attack",
        levels: [
            { 
                damage: 7, defense: 0, texture: "spectral_oppression_1",
                description: "Toque da Névoa: +1 Essência por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.systems.essence += bladeCount;
                    return target.takeDamage(7);
                }
            },
            { 
                damage: 11, defense: 0, texture: "spectral_oppression_2",
                description: "Toque da Névoa: +1 Essência por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.systems.essence += bladeCount;
                    return target.takeDamage(11);
                }
            },
            { 
                damage: 15, defense: 0, texture: "spectral_oppression_3",
                description: "Toque da Névoa: +1 Essência por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.systems.essence += bladeCount;
                    return target.takeDamage(15);
                }
            }
        ]
    },

    CLOUD_DANCE: {
        name: "Dança das Nuvens",
        type: "special",
        levels: [
            { 
                damage: 0, 
                defense: 2, 
                texture: "cloud_dance_1",
                description: "Essência +2 | DEF +2 | Foco +2",
                effect: (game, player, target) => {
                    player.systems.essence += 2;
                    player.defense += 2;
                    player.systems.focus += 2;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 3, 
                texture: "cloud_dance_2",
                description: "Essência +3 | DEF +3 | Foco +3",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.defense += 3;
                    player.systems.focus += 3;
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 4, 
                texture: "cloud_dance_3",
                description: "Essência +4 | DEF +4 | Foco +4",
                effect: (game, player, target) => {
                    player.systems.essence += 4;
                    player.defense += 4;
                    player.systems.focus += 4;
                    return 0;
                }
            }
        ]
    },

    RAVEN_SPIRIT: {
        name: "Espírito do Corvo",
        type: "attack",
        levels: [
            { 
                damage: 6, 
                defense: 0, 
                texture: "raven_spirit_1",
                description: "+2 DEF por Essência",
                effect: (game, player, target) => {
                    player.defense += player.systems.essence * 2;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 6, 
                defense: 0, 
                texture: "raven_spirit_2",
                description: "+3 DEF por Essência",
                effect: (game, player, target) => {
                    player.defense += player.systems.essence * 3;
                    return target.takeDamage(6);
                }
            },
            { 
                damage: 6, 
                defense: 0, 
                texture: "raven_spirit_3",
                description: "+4 DEF por Essência",
                effect: (game, player, target) => {
                    player.defense += player.systems.essence * 4;
                    return target.takeDamage(6);
                }
            }
        ]
    },

    RUNIC_EXPLOSION: {
        name: "Explosão Rúnica",
        type: "attack",
        levels: [
            { 
                damage: 11, 
                defense: 0, 
                texture: "runic_explosion_1",
                description: "11 ATK | Sangrando: Inimigo perde 1 Essência",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(11);
                    if (player.systems.bleedingStacks > 0) {
                        target.systems.essence = Math.max(0, target.systems.essence - 1);
                    }
                    return dmg;
                }
            },
            { 
                damage: 13, 
                defense: 0, 
                texture: "runic_explosion_2",
                description: "13 ATK | Sangrando: Inimigo perde 2 Essência",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(13);
                    if (player.systems.bleedingStacks > 0) {
                        target.systems.essence = Math.max(0, target.systems.essence - 2);
                    }
                    return dmg;
                }
            },
            { 
                damage: 15, 
                defense: 0, 
                texture: "runic_explosion_3",
                description: "15 ATK | Sangrando: Inimigo perde 3 Essência",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(15);
                    if (player.systems.bleedingStacks > 0) {
                        target.systems.essence = Math.max(0, target.systems.essence - 3);
                    }
                    return dmg;
                }
            }
        ]
    },

    ROCK_FANG: {
        name: "Presa do Rochedo",
        type: "attack",
        levels: [
            { 
                damage: 9, 
                defense: 0, 
                texture: "rock_fang_1",
                description: "9 ATK | Se Essência>0: Ataque Extra",
                effect: (game, player, target) => {
                    let dmg = target.takeDamage(9);
                    if (player.systems.essence > 0) {
                        dmg += target.takeDamage(9);
                    }
                    return dmg;
                }
            },
            { 
                damage: 12, 
                defense: 0, 
                texture: "rock_fang_2",
                description: "12 ATK | Se Essência>0: Ataque Extra",
                effect: (game, player, target) => {
                    let dmg = target.takeDamage(12);
                    if (player.systems.essence > 0) {
                        dmg += target.takeDamage(12);
                    }
                    return dmg;
                }
            },
            { 
                damage: 15, 
                defense: 0, 
                texture: "rock_fang_3",
                description: "15 ATK | Se Essência>0: Ataque Extra",
                effect: (game, player, target) => {
                    let dmg = target.takeDamage(15);
                    if (player.systems.essence > 0) {
                        dmg += target.takeDamage(15);
                    }
                    return dmg;
                }
            }
        ]
    },

    MAGIC_RETALIATION: {
        name: "Retaliação Mágica",
        type: "attack",
        levels: [
            { 
                damage: 11, 
                defense: 0, 
                texture: "magic_retaliation_1",
                description: "11 ATK | Sangrando: +7 DEF no próximo turno",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(11);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.addContinuousEffect({
                            description: "Bônus de DEF",
                            duration: 1, // Aplica no próximo turno
                            onTurnStart: () => {
                                player.defense += 7;
                                this.expired = true;
                            },
                            expired: false
                        });
                    }
                    return dmg;
                }
            },
            { 
                damage: 14, 
                defense: 0, 
                texture: "magic_retaliation_2",
                description: "14 ATK | Sangrando: +10 DEF no próximo turno",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(14);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.addContinuousEffect({
                            description: "Bônus de DEF",
                            duration: 1,
                            onTurnStart: () => {
                                player.defense += 10;
                                this.expired = true;
                            },
                            expired: false
                        });
                    }
                    return dmg;
                }
            },
            { 
                damage: 17, 
                defense: 0, 
                texture: "magic_retaliation_3",
                description: "17 ATK | Sangrando: +13 DEF no próximo turno",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(17);
                    if (player.systems.bleedingStacks > 0) {
                        player.systems.addContinuousEffect({
                            description: "Bônus de DEF",
                            duration: 1,
                            onTurnStart: () => {
                                player.defense += 13;
                                this.expired = true;
                            },
                            expired: false
                        });
                    }
                    return dmg;
                }
            }
        ]
    },

    MIRROR_GARDEN: {
        name: "Jardim de Espelhos",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 3, 
                texture: "mirror_garden_1",
                description: "DEF +3 | ATK = DEF",
                effect: (game, player, target) => {
                    player.defense += 3;
                    return target.takeDamage(player.defense);
                }
            },
            { 
                damage: 0, 
                defense: 5, 
                texture: "mirror_garden_2",
                description: "DEF +5 | ATK = DEF",
                effect: (game, player, target) => {
                    player.defense += 5;
                    return target.takeDamage(player.defense);
                }
            },
            { 
                damage: 0, 
                defense: 8, 
                texture: "mirror_garden_3",
                description: "DEF +8 | ATK = DEF",
                effect: (game, player, target) => {
                    player.defense += 8;
                    return target.takeDamage(player.defense);
                }
            }
        ]
    },

    ARCANE_TRIAD: {
        name: "Tríade Arcana",
        type: "attack",
        levels: [
            { 
                damage: 3, 
                defense: 0, 
                texture: "arcane_triad_1",
                description: "ATK x3",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 3; i++) {
                        totalDamage += target.takeDamage(3);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 4, 
                defense: 0, 
                texture: "arcane_triad_2",
                description: "ATK x3",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 3; i++) {
                        totalDamage += target.takeDamage(4);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 5, 
                defense: 0, 
                texture: "arcane_triad_3",
                description: "ATK x3",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 3; i++) {
                        totalDamage += target.takeDamage(5);
                    }
                    return totalDamage;
                }
            }
        ]
    },

    // ---- FASE DA IMORTALIDADE ARCANA ----
    PHOENIX_BREATH: {
        name: "Sopro da Fênix",
        type: "attack",
        levels: [
            { 
                damage: 4, defense: 0, texture: "phoenix_breath_1",
                description: "Toque da Névoa: Ataque Extra",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(4);
                    player.systems.focus += 4; // Ataque extra
                    return dmg;
                }
            },
            { 
                damage: 8, defense: 0, texture: "phoenix_breath_2",
                description: "Toque da Névoa: Ataque Extra",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(8);
                    player.systems.focus += 8; // Ataque extra
                    return dmg;
                }
            },
            { 
                damage: 12, defense: 0, texture: "phoenix_breath_3",
                description: "Toque da Névoa: Ataque Extra",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(12);
                    player.systems.focus += 12; // Ataque extra
                    return dmg;
                }
            }
        ]
    },

    MOON_MANTLE: {
        name: "Manto da Lua",
        type: "defense",
        levels: [
            { 
                damage: 0, defense: 1, texture: "moon_mantle_1",
                description: "Toque da Névoa: +2 pilhas de Aumento de ATK",
                effect: (game, player, target) => {
                    player.defense += 1;
                    player.systems.attackStack += 2;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 2, texture: "moon_mantle_2",
                description: "Toque da Névoa: +3 pilhas de Aumento de ATK",
                effect: (game, player, target) => {
                    player.defense += 2;
                    player.systems.attackStack += 3;
                    return 0;
                }
            },
            { 
                damage: 0, defense: 3, texture: "moon_mantle_3",
                description: "Toque da Névoa: +4 pilhas de Aumento de ATK",
                effect: (game, player, target) => {
                    player.defense += 3;
                    player.systems.attackStack += 4;
                    return 0;
                }
            }
        ]
    },

    SOUL_CIRCLE: {
        name: "Círculo da Alma",
        type: "continuous",
        levels: [
            { 
                damage: 0, defense: 0, texture: "soul_circle_1",
                description: "Essência +1 | Contínuo: +1 Essência a cada 2 turnos",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.addContinuousEffect({
                        description: "Ganho de Essência",
                        duration: Infinity,
                        onTurnEnd: () => {
                            if (game.currentRound % 2 === 0) {
                                player.systems.essence += 1;
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "soul_circle_2",
                description: "Essência +1 | Contínuo: +1 Essência por turno",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.addContinuousEffect({
                        description: "Ganho de Essência",
                        duration: Infinity,
                        onTurnEnd: () => {
                            player.systems.essence += 1;
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "soul_circle_3",
                description: "Essência +3 | Contínuo: +1 Essência por turno",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.systems.addContinuousEffect({
                        description: "Ganho de Essência",
                        duration: Infinity,
                        onTurnEnd: () => {
                            player.systems.essence += 1;
                        },
                        expired: false
                    });
                    return 0;
                }
            }
        ]
    },

    HUMMINGBIRD_SONG: {
        name: "Canção do Colibri",
        type: "continuous",
        levels: [
            { 
                damage: 0, defense: 0, texture: "hummingbird_song_1",
                description: "Essência +1 | Contínuo: Custo de 'Espírito' reduzido em 1",
                effect: (game, player, target) => {
                    player.systems.essence += 1;
                    player.systems.addContinuousEffect({
                        description: "Redução de Custo",
                        duration: Infinity,
                        onCardPlay: (card) => {
                            if (card.name.includes("Espírito")) {
                                card.essenceCost = Math.max(0, card.essenceCost - 1);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "hummingbird_song_2",
                description: "Essência +3 | Contínuo: Custo de 'Espírito' reduzido em 1",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.systems.addContinuousEffect({
                        description: "Redução de Custo",
                        duration: Infinity,
                        onCardPlay: (card) => {
                            if (card.name.includes("Espírito")) {
                                card.essenceCost = Math.max(0, card.essenceCost - 1);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 0, texture: "hummingbird_song_3",
                description: "Essência +3 | Contínuo: Custo de 'Espírito' reduzido em 2",
                effect: (game, player, target) => {
                    player.systems.essence += 3;
                    player.systems.addContinuousEffect({
                        description: "Redução de Custo",
                        duration: Infinity,
                        onCardPlay: (card) => {
                            if (card.name.includes("Espírito")) {
                                card.essenceCost = Math.max(0, card.essenceCost - 2);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            }
        ]
    },

    HERON_SPIRIT: {
        name: "Espírito da Garça",
        type: "attack",
        levels: [
            { 
                damage: 5, defense: 0, texture: "heron_spirit_1",
                description: "+2 ATK por Essência",
                effect: (game, player, target) => {
                    const totalDamage = 5 + (player.systems.essence * 2);
                    return target.takeDamage(totalDamage);
                }
            },
            { 
                damage: 5, defense: 0, texture: "heron_spirit_2",
                description: "+3 ATK por Essência",
                effect: (game, player, target) => {
                    const totalDamage = 5 + (player.systems.essence * 3);
                    return target.takeDamage(totalDamage);
                }
            },
            { 
                damage: 5, defense: 0, texture: "heron_spirit_3",
                description: "+4 ATK por Essência",
                effect: (game, player, target) => {
                    const totalDamage = 5 + (player.systems.essence * 4);
                    return target.takeDamage(totalDamage);
                }
            }
        ]
    },

    KRAKEN_TIDE: {
        name: "Maré do Kraken",
        type: "attack",
        levels: [
            { 
                damage: 10, defense: 0, texture: "kraken_tide_1",
                description: "DEF +10 | Ataque Extra",
                effect: (game, player, target) => {
                    player.defense += 10;
                    const dmg = target.takeDamage(10);
                    target.takeDamage(10); // Ataque extra
                    return dmg;
                }
            },
            { 
                damage: 13, defense: 0, texture: "kraken_tide_2",
                description: "DEF +13 | Ataque Extra",
                effect: (game, player, target) => {
                    player.defense += 13;
                    const dmg = target.takeDamage(13);
                    target.takeDamage(13); // Ataque extra
                    return dmg;
                }
            },
            { 
                damage: 16, defense: 0, texture: "kraken_tide_3",
                description: "DEF +16 | Ataque Extra",
                effect: (game, player, target) => {
                    player.defense += 16;
                    const dmg = target.takeDamage(16);
                    target.takeDamage(16); // Ataque extra
                    return dmg;
                }
            }
        ]
    },

    SAGE_ILLUMINATION: {
        name: "Iluminação do Sábio",
        type: "attack",
        levels: [
            { 
                damage: 8, defense: 0, texture: "sage_illumination_1",
                description: "+1 Foco por Essência (máx 4) | Sangrando: Aumenta máximo para 7",
                effect: (game, player, target) => {
                    const maxFocus = player.systems.bleedingStacks > 0 ? 7 : 4;
                    player.systems.focus += Math.min(player.systems.essence, maxFocus);
                    return target.takeDamage(8);
                }
            },
            { 
                damage: 12, defense: 0, texture: "sage_illumination_2",
                description: "+1 Foco por Essência (máx 4) | Sangrando: Aumenta máximo para 10",
                effect: (game, player, target) => {
                    const maxFocus = player.systems.bleedingStacks > 0 ? 10 : 4;
                    player.systems.focus += Math.min(player.systems.essence, maxFocus);
                    return target.takeDamage(12);
                }
            },
            { 
                damage: 16, defense: 0, texture: "sage_illumination_3",
                description: "+1 Foco por Essência (máx 4) | Sangrando: Aumenta máximo para 13",
                effect: (game, player, target) => {
                    const maxFocus = player.systems.bleedingStacks > 0 ? 13 : 4;
                    player.systems.focus += Math.min(player.systems.essence, maxFocus);
                    return target.takeDamage(16);
                }
            }
        ]
    },

    MIST_CHAOS: {
        name: "Caos das Brumas",
        type: "attack",
        levels: [
            { 
                damage: 2, defense: 0, essenceCost: 1, texture: "mist_chaos_1",
                description: "ATK x4",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 4; i++) {
                        totalDamage += target.takeDamage(2);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 2, defense: 0, essenceCost: 1, texture: "mist_chaos_2",
                description: "ATK x5",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 5; i++) {
                        totalDamage += target.takeDamage(2);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 2, defense: 0, essenceCost: 1, texture: "mist_chaos_3",
                description: "ATK x6",
                effect: (game, player, target) => {
                    let totalDamage = 0;
                    for (let i = 0; i < 6; i++) {
                        totalDamage += target.takeDamage(2);
                    }
                    return totalDamage;
                }
            }
        ]
    },

    LUNAR_BARRIER: {
        name: "Barreira Lunar",
        type: "defense",
        levels: [
            { 
                damage: 0, defense: 10, texture: "lunar_barrier_1",
                description: "DEF +10 | DEF não reduz por 4 turnos",
                effect: (game, player, target) => {
                    player.defense += 10;
                    player.systems.addContinuousEffect({
                        description: "Manutenção de DEF",
                        duration: 4,
                        onTurnEnd: () => {},
                        onRemove: () => player.defense = Math.max(0, player.defense - 10),
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 14, texture: "lunar_barrier_2",
                description: "DEF +14 | DEF não reduz por 4 turnos",
                effect: (game, player, target) => {
                    player.defense += 14;
                    player.systems.addContinuousEffect({
                        description: "Manutenção de DEF",
                        duration: 4,
                        onTurnEnd: () => {},
                        onRemove: () => player.defense = Math.max(0, player.defense - 14),
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, defense: 18, texture: "lunar_barrier_3",
                description: "DEF +18 | DEF não reduz por 4 turnos",
                effect: (game, player, target) => {
                    player.defense += 18;
                    player.systems.addContinuousEffect({
                        description: "Manutenção de DEF",
                        duration: 4,
                        onTurnEnd: () => {},
                        onRemove: () => player.defense = Math.max(0, player.defense - 18),
                        expired: false
                    });
                    return 0;
                }
            }
        ]
    },

    LIBERATION_DUALITY: {
        name: "Libertação - Dualidade",
        type: "attack",
        levels: [
            { 
                damage: 4, 
                defense: 0, 
                texture: "liberation_duality_1",
                description: "+1 ataque por 'Libertação' usada",
                effect: (game, player, target) => {
                    // Conta quantas cartas "Libertação" estão nos slots
                    const liberationCount = player.cardsInSlots.filter(c => 
                        c?.name.includes("Libertação")
                    ).length;
                    
                    // Dano base + ataques extras
                    let totalDamage = target.takeDamage(4);
                    for (let i = 0; i < liberationCount; i++) {
                        totalDamage += target.takeDamage(4);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 6, 
                defense: 0, 
                texture: "liberation_duality_2",
                description: "+1 ataque por 'Libertação' usada",
                effect: (game, player, target) => {
                    const liberationCount = player.cardsInSlots.filter(c => 
                        c?.name.includes("Libertação")
                    ).length;
                    
                    let totalDamage = target.takeDamage(6);
                    for (let i = 0; i < liberationCount; i++) {
                        totalDamage += target.takeDamage(6);
                    }
                    return totalDamage;
                }
            },
            { 
                damage: 9, 
                defense: 0, 
                texture: "liberation_duality_3",
                description: "+1 ataque por 'Libertação' usada",
                effect: (game, player, target) => {
                    const liberationCount = player.cardsInSlots.filter(c => 
                        c?.name.includes("Libertação")
                    ).length;
                    
                    let totalDamage = target.takeDamage(9);
                    for (let i = 0; i < liberationCount; i++) {
                        totalDamage += target.takeDamage(9);
                    }
                    return totalDamage;
                }
            }
        ]
    },

    // Fase da encarnação divina

    DRAGON_DANCE: {
        name: "Dança do Dragão",
        type: "attack",
        levels: [
            { 
                damage: 2, 
                defense: 0, 
                texture: "dragon_dance_1",
                description: "ATK x2 | Toque da Névoa: +3 DEF",
                effect: (game, player, target) => {
                    const dmg = target.takeDamage(2) + target.takeDamage(2);
                    player.defense += 3;
                    return dmg;
                }
            },
            { 
                damage: 2, 
                defense: 0, 
                texture: "dragon_dance_2",
                description: "ATK x3 | Toque da Névoa: +5 DEF",
                effect: (game, player, target) => {
                    let dmg = 0;
                    for (let i = 0; i < 3; i++) dmg += target.takeDamage(2);
                    player.defense += 5;
                    return dmg;
                }
            },
            { 
                damage: 2, 
                defense: 0, 
                texture: "dragon_dance_3",
                description: "ATK x4 | Toque da Névoa: +7 DEF",
                effect: (game, player, target) => {
                    let dmg = 0;
                    for (let i = 0; i < 4; i++) dmg += target.takeDamage(2);
                    player.defense += 7;
                    return dmg;
                }
            }
        ]
    },

    ETHEREAL_STEPS: {
        name: "Passos Etéreos",
        type: "attack",
        levels: [
            { 
                damage: 3, 
                defense: 3, 
                texture: "ethereal_steps_1",
                description: "ATK x2 DEF +3 | +3 DEF por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.defense += 3 + (bladeCount * 3);
                    return target.takeDamage(3) + target.takeDamage(3);
                }
            },
            { 
                damage: 3, 
                defense: 4, 
                texture: "ethereal_steps_2",
                description: "ATK x3 DEF +4 | +4 DEF por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.defense += 4 + (bladeCount * 4);
                    let dmg = 0;
                    for (let i = 0; i < 3; i++) dmg += target.takeDamage(3);
                    return dmg;
                }
            },
            { 
                damage: 3, 
                defense: 7, 
                texture: "ethereal_steps_3",
                description: "ATK x4 DEF +7 | +5 DEF por 'Lâmina Nebulosa' anterior",
                effect: (game, player, target) => {
                    const bladeCount = player.cardsInSlots.filter(c => c?.name === "Flecha Nebulosa").length;
                    player.defense += 7 + (bladeCount * 5);
                    let dmg = 0;
                    for (let i = 0; i < 4; i++) dmg += target.takeDamage(3);
                    return dmg;
                }
            }
        ]
    },

    GHOST_BLADE: {
        name: "Lâmina Fantasma",
        type: "attack",
        levels: [
            { 
                damage: 1, 
                defense: 0, 
                texture: "ghost_blade_1",
                description: "ATK x4 | +1 Essência por ataque que ferir",
                effect: (game, player, target) => {
                    let dmg = 0;
                    let essenceGained = 0;
                    for (let i = 0; i < 4; i++) {
                        const hitDmg = target.takeDamage(1);
                        dmg += hitDmg;
                        if (hitDmg > 0) essenceGained++;
                    }
                    player.systems.essence += essenceGained;
                    return dmg;
                }
            },
            { 
                damage: 1, 
                defense: 0, 
                texture: "ghost_blade_2",
                description: "ATK x5 | +1 Essência por ataque que ferir",
                effect: (game, player, target) => {
                    let dmg = 0;
                    let essenceGained = 0;
                    for (let i = 0; i < 5; i++) {
                        const hitDmg = target.takeDamage(1);
                        dmg += hitDmg;
                        if (hitDmg > 0) essenceGained++;
                    }
                    player.systems.essence += essenceGained;
                    return dmg;
                }
            },
            { 
                damage: 1, 
                defense: 0, 
                texture: "ghost_blade_3",
                description: "ATK x6 | +1 Essência por ataque que ferir",
                effect: (game, player, target) => {
                    let dmg = 0;
                    let essenceGained = 0;
                    for (let i = 0; i < 6; i++) {
                        const hitDmg = target.takeDamage(1);
                        dmg += hitDmg;
                        if (hitDmg > 0) essenceGained++;
                    }
                    player.systems.essence += essenceGained;
                    return dmg;
                }
            }
        ]
    },

    VEIL_OF_TRANSCENDENCE: {
        name: "Véu da Transcendência",
        type: "attack",
        levels: [
            { 
                damage: 5, 
                defense: 0, 
                texture: "veil_transcendence_1",
                description: "Consome Essência: +5 ATK por ponto",
                effect: (game, player, target) => {
                    const boost = player.systems.essence * 5;
                    player.systems.essence = 0;
                    return target.takeDamage(5 + boost);
                }
            },
            { 
                damage: 5, 
                defense: 0, 
                texture: "veil_transcendence_2",
                description: "Consome Essência: +6 ATK por ponto",
                effect: (game, player, target) => {
                    const boost = player.systems.essence * 6;
                    player.systems.essence = 0;
                    return target.takeDamage(5 + boost);
                }
            },
            { 
                damage: 5, 
                defense: 0, 
                texture: "veil_transcendence_3",
                description: "Consome Essência: +7 ATK por ponto",
                effect: (game, player, target) => {
                    const boost = player.systems.essence * 7;
                    player.systems.essence = 0;
                    return target.takeDamage(5 + boost);
                }
            }
        ]
    },

    BLADE_ECSTASY: {
        name: "Êxtase da Lâmina",
        type: "special",
        levels: [
            { 
                damage: 0, 
                defense: 0, 
                texture: "blade_ecstasy_1",
                description: "Aumenta Foco existente em 80%",
                effect: (game, player, target) => {
                    player.systems.focus = Math.floor(player.systems.focus * 1.8);
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "blade_ecstasy_2",
                description: "Aumenta Foco existente em 110%",
                effect: (game, player, target) => {
                    player.systems.focus = Math.floor(player.systems.focus * 2.1);
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "blade_ecstasy_3",
                description: "Aumenta Foco existente em 140%",
                effect: (game, player, target) => {
                    player.systems.focus = Math.floor(player.systems.focus * 2.4);
                    return 0;
                }
            }
        ]
    },

    CELESTIAL_DOMINION: {
        name: "Domínio Celestial",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 8, 
                essenceCost: 1,
                texture: "celestial_dominion_1",
                description: "DEF +8 | Ataque Extra | Sem custo se DEF > 0",
                effect: (game, player, target) => {
                    if (player.defense > 0) this.essenceCost = 0;
                    player.defense += 8;
                    target.takeDamage(8); // Ataque extra
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 14, 
                essenceCost: 1,
                texture: "celestial_dominion_2",
                description: "DEF +14 | Ataque Extra | Sem custo se DEF > 0",
                effect: (game, player, target) => {
                    if (player.defense > 0) this.essenceCost = 0;
                    player.defense += 14;
                    target.takeDamage(14);
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 20, 
                essenceCost: 1,
                texture: "celestial_dominion_3",
                description: "DEF +20 | Ataque Extra | Sem custo se DEF > 0",
                effect: (game, player, target) => {
                    if (player.defense > 0) this.essenceCost = 0;
                    player.defense += 20;
                    target.takeDamage(20);
                    return 0;
                }
            }
        ]
    },

    ECHO_OF_ANCIENTS: {
        name: "Eco dos Antigos",
        type: "defense",
        levels: [
            { 
                damage: 0, 
                defense: 1, 
                texture: "echo_ancients_1",
                description: "DEF +1 | Reativa última 'Formação' usada",
                effect: (game, player, target) => {
                    player.defense += 1;
                    if (player.systems.lastUsedFormation) {
                        const lastFormation = player.systems.lastUsedFormation;
                        lastFormation.effect(game, player, target);
                    }
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 5, 
                texture: "echo_ancients_2",
                description: "DEF +5 | Reativa última 'Formação' usada",
                effect: (game, player, target) => {
                    player.defense += 5;
                    if (player.systems.lastUsedFormation) {
                        const lastFormation = player.systems.lastUsedFormation;
                        lastFormation.effect(game, player, target);
                    }
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 10, 
                texture: "echo_ancients_3",
                description: "DEF +10 | Reativa última 'Formação' usada",
                effect: (game, player, target) => {
                    player.defense += 10;
                    if (player.systems.lastUsedFormation) {
                        const lastFormation = player.systems.lastUsedFormation;
                        lastFormation.effect(game, player, target);
                    }
                    return 0;
                }
            }
        ]
    },

    LIBERATION_VOID: {
        name: "Libertação - Vácuo",
        type: "continuous",
        levels: [
            { 
                damage: 0, 
                defense: 0, 
                texture: "liberation_void_1",
                description: "Contínuo: Cura 30% do dano causado por 'Libertação'",
                effect: (game, player, target) => {
                    player.systems.addContinuousEffect({
                        description: "Cura por Libertação (30%)",
                        duration: Infinity,
                        onCardPlay: (playedCard) => {
                            if (playedCard.name.includes("Libertação") && playedCard.damage > 0) {
                                const healAmount = Math.floor(playedCard.damage * 0.3);
                                player.heal(healAmount);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "liberation_void_2",
                description: "Contínuo: Cura 50% do dano causado por 'Libertação'",
                effect: (game, player, target) => {
                    player.systems.addContinuousEffect({
                        description: "Cura por Libertação (50%)",
                        duration: Infinity,
                        onCardPlay: (playedCard) => {
                            if (playedCard.name.includes("Libertação") && playedCard.damage > 0) {
                                const healAmount = Math.floor(playedCard.damage * 0.5);
                                player.heal(healAmount);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            },
            { 
                damage: 0, 
                defense: 0, 
                texture: "liberation_void_3",
                description: "Contínuo: Cura 70% do dano causado por 'Libertação'",
                effect: (game, player, target) => {
                    player.systems.addContinuousEffect({
                        description: "Cura por Libertação (70%)",
                        duration: Infinity,
                        onCardPlay: (playedCard) => {
                            if (playedCard.name.includes("Libertação") && playedCard.damage > 0) {
                                const healAmount = Math.floor(playedCard.damage * 0.7);
                                player.heal(healAmount);
                            }
                        },
                        expired: false
                    });
                    return 0;
                }
            }
        ]
    }
}; // FIM DA LISTA DE CARTAS




// ====================== SISTEMAS DO JOGO ======================
class GameSystems {
    constructor() {
        this.reset();
    }

    reset() {
        this.essence = 0;
        this.focus = 0;
        this.continuousEffects = [];
        this.lastUsedFormation = null;
        this.bleedingStacks = 0;
        this.attackStack = 0;
    }

    addContinuousEffect(effect) {
        if (this.continuousEffects.length < 2) {
            this.continuousEffects.push(effect);
            return true;
        }
        return false;
    }

    processTurnEnd() {
        this.continuousEffects.forEach(effect => {
            if (effect.onTurnEnd) effect.onTurnEnd();
        });
        this.continuousEffects = this.continuousEffects.filter(e => !e.expired);
        this.bleedingStacks = 0;
    }

    getModifiedDamage(baseDamage) {
        return baseDamage + this.focus;
    }
}

// ====================== CLASSES PRINCIPAIS ======================
class Player {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this.maxHp = 100;
        this.destiny = 100;
        this.defense = 0;
        this.cultivation = 0;
        this.cardsInSlots = Array(8).fill(null);
        this.handCards = [];
        this.exchangeCharges = INITIAL_EXCHANGE_CHARGES;
        this.currentPhase = 0;
        this.passives = [];
        this.specialCards = [];
        this.phase = 0;
        this.readyForBreakthrough = false;
        this.breakthroughThresholds = [3, 6, 9, 12, 15];
        this.systems = new GameSystems();
    }

    takeDamage(damage) {
        const actualDamage = Math.max(damage - this.defense, 0);
        this.hp = Math.max(this.hp - actualDamage, 0);
        return actualDamage;
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);
    }

    loseDestiny(amount) {
        this.destiny = Math.max(this.destiny - amount, 0);
        return this.destiny > 0;
    }

    consumeCard() {
        this.cultivation++;
        this.checkBreakthrough();
    }

    checkBreakthrough() {
        const nextPhase = this.phase + 1;
        if (nextPhase < this.breakthroughThresholds.length && 
            this.cultivation >= this.breakthroughThresholds[this.phase]) {
            this.readyForBreakthrough = true;
            return true;
        }
        return false;
    }

    performBreakthrough() {
        if (this.readyForBreakthrough) {
            this.phase++;
            this.readyForBreakthrough = false;
            return true;
        }
        return false;
    }

    useExchangeCharge() {
        if (this.exchangeCharges > 0) {
            this.exchangeCharges--;
            return true;
        }
        return false;
    }
}

class Bot extends Player {
    constructor(gameManager) {
        super(`Bot-${Math.floor(Math.random() * 1000)}`);
        this.gameManager = gameManager;
        this.cultivation = Math.floor(Math.random() * 3);
    }

    fillSlots() {
        for (let i = 0; i < this.gameManager.availableSlots; i++) {
            if (this.cardsInSlots[i] === null && this.gameManager.deck.length > 0) {
                this.cardsInSlots[i] = this.gameManager.deck.pop();
            }
        }
    }
}

class Card {
    constructor(template, level = 1) {
        if (!template) {
            console.error("Invalid card template");
            template = { name: "Unknown", levels: [{}] }; // Fallback template
        }

        this.name = template.name || "Unknown";
        this.type = template.type || 'normal';
        this.level = Math.min(level, 3); // Ensure level is between 1-3
        
        // Handle missing level data
        this.levelData = template.levels 
            ? template.levels[this.level - 1] || template.levels[0] 
            : {};
            
        this.texture = this.levelData.texture || 'cardBack';
        this.description = this.levelData.description || '';
        this.damage = this.levelData.damage || 0;
        this.defense = this.levelData.defense || 0;
        this.essenceCost = this.levelData.essenceCost || 0;
    
        
        if (typeof this.levelData.effect === 'function') {
            this.customEffect = this.levelData.effect; // Guarda efeito customizado
        }
    }

    play(game, player, target) {
        return this.customEffect 
            ? this.customEffect(game, player, target) 
            : this.defaultEffect(game, player, target);
    }


    defaultEffect(game, player, target) {
        if (this.damage > 0) {
            const totalDamage = player.systems.getModifiedDamage(this.damage);
            player.systems.focus = 0;
            return target.takeDamage(totalDamage);
        }
        if (this.defense > 0) {
            target.defense += this.defense;
        }
        return 0;
    }

    canMergeWith(otherCard) {
        return this.name === otherCard.name && 
               this.level === otherCard.level && 
               this.level < 3;
    }

    getUpgradedVersion() {
        const newLevel = this.level + 1;
        return new Card(
            {
                name: this.name,
                levels: [
                    {...this.levelData}, 
                    {...this.levelData}, 
                    {...this.levelData}
                ]
            },
            newLevel
        );
    }
}

// ====================== GERENCIADOR PRINCIPAL ======================
class GameManager {
    constructor(scene) {
        this.scene = scene;
        this.players = [];
        this.currentRound = 1;
        this.maxSlots = 8;
        this.availableSlots = 3;
        this.readyPlayers = 0;
        this.deck = [];
        this.initDeck(); // Move a inicialização para o construtor
    }

    initDeck() {
        this.deck = [];
        Object.values(CARD_TEMPLATES).forEach(template => {
            for (let i = 0; i < 3; i++) {
                this.deck.push(new Card(template, 1));
            }
        });
        this.shuffleDeck();
    }


    initGame() {
        this.initDeck(); // Agora isso é chamado apenas quando o jogo inicia
        this.players.push(new Player("Player1"));
        for (let i = 1; i < 4; i++) this.players.push(new Bot(this));
        this.drawAdditionalCards(this.players[0], 3);
    }


    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawAdditionalCards(player, amount) {
        const cardsToDraw = Math.min(
            amount, 
            MAX_HAND_CARDS - player.handCards.length,
            this.deck.length
        );
        
        for (let i = 0; i < cardsToDraw; i++) {
            player.handCards.push(this.deck.pop());
        }
    }

    checkReady() {
        console.log("Checking ready state...");
        const player1 = this.players[0];
        const player2 = this.players[1];
        
        if (!player1 || !player2) {
            console.error("Missing players!");
            return;
        }
    
        if (player1.cardsInSlots.some(c => c) && player2.cardsInSlots.some(c => c)) {
            console.log("Starting combat...");
            const playerStarts = player1.cultivation >= player2.cultivation ? player1 : player2;
            this.startCombat(player1, player2, playerStarts);
        } else {
            console.error("Players don't have cards in slots!");
        }
    }

    startCombat(player1, player2, playerStarts) {
        // Verifique se a cena existe e se a referência está correta
        if (!this.scene || !this.scene.scene) {
            console.error("Referência de cena inválida!");
            return;
        }

        // Use this.scene.scene para acessar o gerenciador de cenas do Phaser
        this.scene.scene.launch('CombatScene', {
            player1: this.serializePlayer(player1),
            player2: this.serializePlayer(player2),
            playerStarts: this.serializePlayer(playerStarts)
        });
    }

    serializePlayer(player) {
        if (!player) return null;
        
        return {
            name: player.name,
            hp: player.hp,
            maxHp: player.maxHp,
            destiny: player.destiny,
            defense: player.defense,
            cultivation: player.cultivation,
            phase: player.phase,
            cardsInSlots: player.cardsInSlots.map(c => c ? this.serializeCard(c) : null),
            handCards: player.handCards.map(c => this.serializeCard(c)),
            systems: {
                essence: player.systems.essence,
                focus: player.systems.focus,
                bleedingStacks: player.systems.bleedingStacks,
                attackStack: player.systems.attackStack
            }
        };
    }
    
    serializeCard(card) {
        if (!card) return null;
        
        return {
            name: card.name,
            type: card.type,
            level: card.level,
            damage: card.damage,
            defense: card.defense,
            essenceCost: card.essenceCost,
            texture: card.texture,
            description: card.description
        };
    }

    serializeCard(card) {
        return {
            name: card.name,
            type: card.type,
            level: card.level,
            damage: card.damage,
            defense: card.defense,
            essenceCost: card.essenceCost,
            texture: card.texture,
            description: card.description
        };
    }

    endCombat(loser) {
        loser.loseDestiny(10);
        if (loser.destiny <= 0) {
            this.players = this.players.filter(p => p.destiny > 0);
        }

        this.currentRound++;
        this.readyPlayers = 0;
        
        const player = this.players[0];
        if (player) {
            player.defense = 0;
            player.systems.processTurnEnd();
            this.drawAdditionalCards(player, 3);
            player.exchangeCharges = Math.min(player.exchangeCharges + 3, 5);
        }

        this.scene.start('PlanningScene');
    }
}

// ====================== CENAS DO JOGO ======================
class PlanningScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlanningScene' });
    }

    preload() {
        // Load basic assets
        this.load.image('cardBack', 'assets/cards/back.png');
        this.load.image('playerSprite', 'assets/players/player1.png');
        this.load.image('enemySprite', 'assets/players/enemy1.png');
        this.load.image('readyBtn', 'assets/ui/ready_btn.png');
        this.load.image('slot', 'assets/ui/slot.png');
        this.load.image('deckIcon', 'assets/ui/deck.png');
        this.load.image('breakthroughBtn', 'assets/ui/breakthrough_btn.png');
        this.load.image('healthbar_back', 'assets/ui/healthbar_back.png');
        this.load.image('healthbar_fill', 'assets/ui/healthbar_fill.png');

        // Load all card textures
        Object.values(CARD_TEMPLATES).forEach(card => {
            card.levels.forEach(level => {
                if (level.texture) {
                    this.load.image(level.texture, `assets/cards/${level.texture}.png`);
                }
            });
        });
    }

    create() {
        // Initialize game manager
        this.gameManager = this.registry.get('gameManager');
        if (!this.gameManager) {
            this.gameManager = new GameManager(this);
            this.gameManager.initGame();
            this.registry.set('gameManager', this.gameManager);
        }

        // Background
        this.add.rectangle(500, 350, 1000, 700, 0x1a1a2e).setDepth(0);

        // UI Setup
        this.setupUI();
        this.setupSlots();
        this.setupHandCards();
        this.setupDeckIcon();
        this.setupReadyButton();
        this.setupDragDrop();
        this.setupRightClick();

        // Debug info
        if (DEBUG_MODE) {
            console.log('PlanningScene initialized');
            console.log('Player cards:', this.gameManager.players[0].handCards.length);
            console.log('Deck count:', this.gameManager.deck.length);
        }
    }

    setupUI() {
        const player = this.gameManager.players[0];
        
        // Cultivation text
        this.cultivationText = this.add.text(100, 50, 
            `Phase ${player.phase + 1} | Cultivation: ${player.cultivation}/${player.breakthroughThresholds[player.phase] || 'MAX'}`,
            { fontSize: '24px', fill: '#fff' }
        ).setOrigin(0.5);

        // Breakthrough button
        this.breakthroughButton = this.add.image(150, 550, 'breakthroughBtn')
            .setScale(0.3)
            .setInteractive()
            .setVisible(player.readyForBreakthrough)
            .on('pointerdown', () => this.performBreakthrough());
    }

    setupSlots() {
        this.slotSprites = [];
        const player = this.gameManager.players[0];

        for (let i = 0; i < this.gameManager.maxSlots; i++) {
            const slot = this.add.image(100 + i * 100, 300, 'slot')
                .setScale(0.5)
                .setInteractive()
                .setData('index', i);

            if (i >= this.gameManager.availableSlots) {
                slot.setTint(0x888888).setAlpha(0.5);
            }

            if (player.cardsInSlots[i]) {
                const cardSprite = this.add.image(slot.x, slot.y, player.cardsInSlots[i].texture)
                    .setScale(CARD_SCALE)
                    .setInteractive()
                    .setData('cardData', player.cardsInSlots[i])
                    .setData('slotIndex', i);
                
                this.input.setDraggable(cardSprite);
                slot.setData('cardSprite', cardSprite);
            }

            this.slotSprites.push(slot);
        }
    }

    setupHandCards() {
        this.handCardSprites = [];
        const player = this.gameManager.players[0];
        const handCards = player.handCards.filter(card => 
            !player.cardsInSlots.includes(card)
        );

        const startX = (1000 - (Math.min(MAX_HAND_CARDS, handCards.length) * 120)) / 2;

        handCards.forEach((card, i) => {
            const cardSprite = this.add.image(startX + i * 120, 550, card.texture)
                .setScale(CARD_SCALE)
                .setInteractive()
                .setData('cardData', card)
                .setData('handIndex', i);
            
            this.input.setDraggable(cardSprite);
            this.handCardSprites.push(cardSprite);
        });
    }

    setupDeckIcon() {
        const player = this.gameManager.players[0];
        this.deckSprite = this.add.image(900, 550, 'deckIcon')
            .setScale(0.4)
            .setInteractive();
        
        this.exchangeText = this.add.text(900, 600, `Exchange: ${player.exchangeCharges}/5`, 
            { fontSize: '18px', fill: '#fff' })
            .setOrigin(0.5);
    }

    setupReadyButton() {
        this.readyButton = this.add.image(900, 50, 'readyBtn')
            .setScale(0.3)
            .setInteractive()
            .on('pointerdown', () => {
                console.log("Ready button clicked");
                console.log("Player1 cards:", this.gameManager.players[0].cardsInSlots);
                console.log("Player2 cards:", this.gameManager.players[1].cardsInSlots);
                
                this.gameManager.players.slice(1).forEach(bot => bot.fillSlots());
                this.gameManager.checkReady();
            });
    }

    setupDragDrop() {
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0x888888);
            this.children.bringToTop(gameObject);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            this.handleCardDrop(gameObject);
        });
    }

    setupRightClick() {
        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                this.handCardSprites.forEach((card, i) => {
                    if (Phaser.Geom.Rectangle.Contains(card.getBounds(), pointer.x, pointer.y)) {
                        this.consumeCard(card, i, false);
                    }
                });

                this.slotSprites.forEach((slot, i) => {
                    const card = slot.getData('cardSprite');
                    if (card && Phaser.Geom.Rectangle.Contains(card.getBounds(), pointer.x, pointer.y)) {
                        this.consumeCard(card, i, true);
                    }
                });
            }
        });
    }

    handleCardDrop(gameObject) {
        const player = this.gameManager.players[0];
        const cardData = gameObject.getData('cardData');
        
        // Check if dropped on deck (exchange)
        if (Phaser.Geom.Rectangle.Contains(this.deckSprite.getBounds(), gameObject.x, gameObject.y)) {
            if (player.useExchangeCharge()) {
                this.exchangeText.setText(`Exchange: ${player.exchangeCharges}/5`);
                const slotIndex = gameObject.getData('slotIndex');
                
                if (slotIndex !== undefined) {
                    player.cardsInSlots[slotIndex] = null;
                    this.slotSprites[slotIndex].setData('cardSprite', null);
                }
                
                this.gameManager.deck.push(cardData);
                this.gameManager.shuffleDeck();
                
                if (this.gameManager.deck.length > 0) {
                    const newCard = this.gameManager.deck.pop();
                    if (slotIndex !== undefined) {
                        player.cardsInSlots[slotIndex] = newCard;
                    } else {
                        const handIndex = player.handCards.indexOf(cardData);
                        if (handIndex !== -1) player.handCards[handIndex] = newCard;
                    }
                    
                    gameObject.setTexture(newCard.texture)
                             .setData('cardData', newCard);
                }
                
                this.returnCardToPosition(gameObject);
            }
            return;
        }
        
        // Check if dropped on slot
        const slotIndex = this.slotSprites.findIndex(slot => 
            Phaser.Geom.Rectangle.Contains(slot.getBounds(), gameObject.x, gameObject.y)
        );
        
        if (slotIndex !== -1 && slotIndex < this.gameManager.availableSlots) {
            this.moveCardToSlot(gameObject, slotIndex);
        } else {
            this.returnCardToPosition(gameObject);
        }
    }

    moveCardToSlot(gameObject, slotIndex) {
        const player = this.gameManager.players[0];
        const cardData = gameObject.getData('cardData');
        const previousSlotIndex = gameObject.getData('slotIndex');
        
        if (previousSlotIndex !== undefined) {
            player.cardsInSlots[previousSlotIndex] = null;
            this.slotSprites[previousSlotIndex].setData('cardSprite', null);
        }
        
        const existingCard = this.slotSprites[slotIndex].getData('cardSprite');
        if (existingCard) {
            player.handCards.push(existingCard.getData('cardData'));
            this.handCardSprites.push(existingCard);
            existingCard.setData('slotIndex', undefined);
            existingCard.x = this.getHandPosition(this.handCardSprites.length - 1);
            existingCard.y = 550;
        }
        
        player.cardsInSlots[slotIndex] = cardData;
        gameObject.x = this.slotSprites[slotIndex].x;
        gameObject.y = this.slotSprites[slotIndex].y;
        gameObject.setData('slotIndex', slotIndex);
        this.slotSprites[slotIndex].setData('cardSprite', gameObject);
        
        const handIndex = this.handCardSprites.indexOf(gameObject);
        if (handIndex !== -1) {
            this.handCardSprites.splice(handIndex, 1);
        }
        
        this.rearrangeHandCards();
    }

    returnCardToPosition(gameObject) {
        const slotIndex = gameObject.getData('slotIndex');
        if (slotIndex !== undefined) {
            this.gameManager.players[0].cardsInSlots[slotIndex] = null;
            this.slotSprites[slotIndex].setData('cardSprite', null);
            gameObject.setData('slotIndex', undefined);
        }
        
        if (!this.handCardSprites.includes(gameObject)) {
            this.handCardSprites.push(gameObject);
        }
        
        this.tweens.add({
            targets: gameObject,
            x: this.getHandPosition(this.handCardSprites.indexOf(gameObject)),
            y: 550,
            duration: 300,
            ease: 'Power2'
        });
        
        this.rearrangeHandCards();
    }

    rearrangeHandCards() {
        this.handCardSprites.forEach((card, index) => {
            card.x = this.getHandPosition(index);
            card.y = 550;
            card.setData('handIndex', index);
        });
    }

    getHandPosition(index) {
        const cards = this.gameManager.players[0].handCards.filter(c => 
            !this.gameManager.players[0].cardsInSlots.includes(c)
        );
        const cardStartX = (1000 - (Math.min(MAX_HAND_CARDS, cards.length) * 120)) / 2;
        return cardStartX + index * 120;
    }

    consumeCard(card, index, isInSlot) {
        const player = this.gameManager.players[0];
        const cardData = card.getData('cardData');
        
        if (isInSlot) {
            player.cardsInSlots[index] = null;
            this.slotSprites[index].setData('cardSprite', null);
        } else {
            const handIndex = player.handCards.indexOf(cardData);
            if (handIndex !== -1) player.handCards.splice(handIndex, 1);
            this.handCardSprites.splice(index, 1);
        }
        
        card.destroy();
        player.consumeCard();
        this.updateBreakthroughUI();
        
        if (!isInSlot) {
            this.rearrangeHandCards();
        }
    }

    updateBreakthroughUI() {
        const player = this.gameManager.players[0];
        player.checkBreakthrough();
        this.breakthroughButton.setVisible(player.readyForBreakthrough);
        this.cultivationText.setText(
            `Phase ${player.phase + 1} | Cultivation: ${player.cultivation}/${player.breakthroughThresholds[player.phase] || 'MAX'}`
        );
    }

    performBreakthrough() {
        const player = this.gameManager.players[0];
        if (player.performBreakthrough()) {
            this.scene.pause();
            this.scene.launch('RewardScene', { 
                player: player,
                phase: player.phase - 1
            });
        }
    }
}

class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' }); 
    }

    preload() {
        this.load.image('healthbar_back', 'assets/ui/healthbar_back.png');
        this.load.image('healthbar_fill', 'assets/ui/healthbar_fill.png');
        
        // Pré-carregamento dinâmico de todas as texturas de cartas
        this.loadAllCardTextures();
    }
    
    // Função para carregar todas as texturas de cartas
    loadAllCardTextures() {
        const texturesToLoad = new Set(); // Usamos Set para evitar duplicatas
    
        // Percorre todas as cartas e níveis
        if (CARD_TEMPLATES) {
            Object.values(CARD_TEMPLATES).forEach(card => {
                card.levels.forEach(level => {
                    if (level.texture) {
                        texturesToLoad.add(level.texture);
                    }
                });
            });
        }
    
        // Carrega cada textura única
        texturesToLoad.forEach(texture => {
            if (!this.textures.exists(texture)) {
                this.load.image(texture, `assets/cards/${texture}.png`);
            }
        });
    }

    init(data) {
        if (!data || !data.player1 || !data.player2) {
            console.error("Dados de combate inválidos!");
            this.scene.start('PlanningScene');
            return;
        }
        
        this.player1 = this.reconstructPlayer(data.player1);
        this.player2 = this.reconstructPlayer(data.player2);
        this.playerStarts = data.playerStarts ? 
            (data.playerStarts.name === this.player1.name ? this.player1 : this.player2) : 
            (Math.random() > 0.5 ? this.player1 : this.player2);
            
        // Armazenar os dados originais para referência
        this.originalData = data;
        
        // Registrar o gameManager
        this.gameManager = this.scene.get('PlanningScene').gameManager;
    }

    create() {
        this.add.rectangle(500, 350, 1000, 700, 0x2a0e0e).setDepth(0);
        
        this.playerSprite = this.add.sprite(200, 350, 'playerSprite')
            .setScale(0.6)
            .setDepth(2);
        
        this.enemySprite = this.add.sprite(800, 350, 'enemySprite')
            .setScale(0.6)
            .setDepth(2);

        // Debug info
        if (DEBUG_MODE) {
            this.add.text(10, 10, `Player1: ${this.player1.name}, HP: ${this.player1.hp}`, 
                { fontSize: '14px', fill: '#ffffff' });
            this.add.text(10, 30, `Player2: ${this.player2.name}, HP: ${this.player2.hp}`, 
                { fontSize: '14px', fill: '#ffffff' });
        }

        this.createHealthBars();
        this.setupCombatCards();
        
        // Iniciar combate após um pequeno delay para garantir que tudo esteja carregado
        this.time.delayedCall(800, this.startCombat, [], this);
    }

    createHealthBars() {
        const barWidth = 120;
        const offsetY = -100;
        
        this.playerHealthBarBack = this.add.image(200, 350 + offsetY, 'healthbar_back')
            .setDisplaySize(barWidth, 20)
            .setDepth(4);
        
        this.playerHealthBarFill = this.add.image(
            200 - (barWidth/2) + 2,
            350 + offsetY, 
            'healthbar_fill'
        )
        .setOrigin(0, 0.5)
        .setDisplaySize(barWidth - 4, 16)
        .setDepth(5);
        
        this.enemyHealthBarBack = this.add.image(800, 350 + offsetY, 'healthbar_back')
            .setDisplaySize(barWidth, 20)
            .setDepth(4);
        
        this.enemyHealthBarFill = this.add.image(
            800 - (barWidth/2) + 2,
            350 + offsetY, 
            'healthbar_fill'
        )
        .setOrigin(0, 0.5)
        .setDisplaySize(barWidth - 4, 16)
        .setDepth(5);
        
        // Adicionar textos de HP
        this.playerHpText = this.add.text(200, 350 + offsetY + 20, 
            `${this.player1.hp}/${this.player1.maxHp}`, 
            { fontSize: '16px', fill: '#ffffff' })
            .setOrigin(0.5)
            .setDepth(5);
            
        this.enemyHpText = this.add.text(800, 350 + offsetY + 20, 
            `${this.player2.hp}/${this.player2.maxHp}`, 
            { fontSize: '16px', fill: '#ffffff' })
            .setOrigin(0.5)
            .setDepth(5);
        
        this.updateHealthBars();
    }

    updateHealthBars() {
        const playerHpPercent = Math.max(0, this.player1.hp / this.player1.maxHp);
        this.playerHealthBarFill.setDisplaySize(116 * playerHpPercent, 16);
        this.playerHpText.setText(`${Math.ceil(this.player1.hp)}/${this.player1.maxHp}`);
        
        const enemyHpPercent = Math.max(0, this.player2.hp / this.player2.maxHp);
        this.enemyHealthBarFill.setDisplaySize(116 * enemyHpPercent, 16);
        this.enemyHpText.setText(`${Math.ceil(this.player2.hp)}/${this.player2.maxHp}`);
    }

    setupCombatCards() {
        this.playerCardSprites = [];
        this.enemyCardSprites = [];
        
        // Verificar e garantir que todas as texturas estejam carregadas antes de criar os sprites
        let allTexturesLoaded = true;
        
        // Verificar texturas do jogador 1
        for (let i = 0; i < this.player1.cardsInSlots.length; i++) {
            const card = this.player1.cardsInSlots[i];
            if (card && !this.textures.exists(card.texture)) {
                allTexturesLoaded = false;
                console.warn(`Textura não encontrada: ${card.texture}`);
            }
        }
        
        // Verificar texturas do jogador 2
        for (let i = 0; i < this.player2.cardsInSlots.length; i++) {
            const card = this.player2.cardsInSlots[i];
            if (card && !this.textures.exists(card.texture)) {
                allTexturesLoaded = false;
                console.warn(`Textura não encontrada: ${card.texture}`);
            }
        }
        
        // Criar sprites de cartas do jogador
        for (let i = 0; i < this.player1.cardsInSlots.length; i++) {
            if (this.player1.cardsInSlots[i]) {
                const textureName = this.player1.cardsInSlots[i].texture || 'cardBack';
                const card = this.add.sprite(150 + (i * 90), 550, textureName)
                    .setScale(0.3)
                    .setDepth(1)
                    .setData('cardData', this.player1.cardsInSlots[i]);
                
                // Adicionar tooltip no hover
                card.setInteractive({ useHandCursor: true });
                card.on('pointerover', () => {
                    const cardData = card.getData('cardData');
                    this.showCardInfo(cardData, card.x, card.y - 100);
                });
                card.on('pointerout', () => {
                    this.hideCardInfo();
                });
                
                this.playerCardSprites.push(card);
            }
        }

        // Criar sprites de cartas do inimigo
        for (let i = 0; i < this.player2.cardsInSlots.length; i++) {
            if (this.player2.cardsInSlots[i]) {
                const textureName = this.player2.cardsInSlots[i].texture || 'cardBack';
                const card = this.add.sprite(850 - (i * 90), 550, textureName)
                    .setScale(0.3)
                    .setDepth(1)
                    .setData('cardData', this.player2.cardsInSlots[i]);
                
                // Adicionar tooltip no hover
                card.setInteractive({ useHandCursor: true });
                card.on('pointerover', () => {
                    const cardData = card.getData('cardData');
                    this.showCardInfo(cardData, card.x, card.y - 100);
                });
                card.on('pointerout', () => {
                    this.hideCardInfo();
                });
                
                this.enemyCardSprites.push(card);
            }
        }
    }
    
    showCardInfo(cardData, x, y) {
        this.hideCardInfo();
        
        // Criar fundo do tooltip
        this.cardInfoBg = this.add.rectangle(x, y, 200, 100, 0x000000, 0.8)
            .setDepth(10);
            
        // Adicionar textos
        this.cardInfoTexts = [];
        this.cardInfoTexts.push(
            this.add.text(x, y - 35, cardData.name, 
                { fontSize: '16px', fill: '#FFFFFF', fontStyle: 'bold' })
                .setOrigin(0.5)
                .setDepth(11)
        );
        
        if (cardData.damage > 0) {
            this.cardInfoTexts.push(
                this.add.text(x, y - 10, `Dano: ${cardData.damage}`, 
                    { fontSize: '14px', fill: '#FF6666' })
                    .setOrigin(0.5)
                    .setDepth(11)
            );
        }
        
        if (cardData.defense > 0) {
            this.cardInfoTexts.push(
                this.add.text(x, y + 10, `Defesa: ${cardData.defense}`, 
                    { fontSize: '14px', fill: '#66FF66' })
                    .setOrigin(0.5)
                    .setDepth(11)
            );
        }
        
        if (cardData.description) {
            this.cardInfoTexts.push(
                this.add.text(x, y + 35, cardData.description, 
                    { fontSize: '12px', fill: '#FFFFFF', wordWrap: { width: 180 } })
                    .setOrigin(0.5)
                    .setDepth(11)
            );
        }
    }
    
    hideCardInfo() {
        if (this.cardInfoBg) {
            this.cardInfoBg.destroy();
            this.cardInfoBg = null;
        }
        
        if (this.cardInfoTexts && this.cardInfoTexts.length > 0) {
            this.cardInfoTexts.forEach(text => text.destroy());
            this.cardInfoTexts = [];
        }
    }

    startCombat() {
        this.currentTurn = this.playerStarts === this.player1 ? 0 : 1;
        this.actionLog = this.add.text(500, 50, '', 
            { fontSize: '18px', fill: '#FFFFFF', backgroundColor: '#000000' })
            .setOrigin(0.5)
            .setDepth(5);
            
        this.logAction("Combate iniciado!");
        this.time.delayedCall(1000, this.processCombatTurn, [], this);
    }
    
    logAction(text) {
        this.actionLog.setText(text);
        this.actionLog.setAlpha(1);
        
        this.tweens.killTweensOf(this.actionLog);
        this.tweens.add({
            targets: this.actionLog,
            alpha: 0.2,
            duration: 2000,
            delay: 1000
        });
    }

    processCombatTurn() {
        if (this.player1.hp <= 0 || this.player2.hp <= 0) {
            this.endCombat();
            return;
        }

        const isPlayerTurn = this.currentTurn % 2 === 0;
        const activePlayer = isPlayerTurn ? this.player1 : this.player2;
        const targetPlayer = isPlayerTurn ? this.player2 : this.player1;
        const activeSprite = isPlayerTurn ? this.playerSprite : this.enemySprite;
        const targetSprite = isPlayerTurn ? this.enemySprite : this.playerSprite;
        const cardSprites = isPlayerTurn ? this.playerCardSprites : this.enemyCardSprites;

        // Calcula o índice da carta com base na divisão do turno por 2 e o módulo do número de cartas
        const maxCards = Math.max(
            this.player1.cardsInSlots.filter(c => c).length,
            this.player2.cardsInSlots.filter(c => c).length
        );
        
        if (maxCards === 0) {
            this.logAction("Nenhuma carta disponível!");
            this.endCombat();
            return;
        }
        
        const cardIndex = Math.floor(this.currentTurn / 2) % maxCards;
        const activeCards = isPlayerTurn ? 
            this.player1.cardsInSlots.filter(c => c) : 
            this.player2.cardsInSlots.filter(c => c);
            
        // Verifica se o índice é válido
        if (cardIndex < activeCards.length && cardIndex < cardSprites.length) {
            const cardData = activeCards[cardIndex];
            const cardSprite = cardSprites[cardIndex];
            
            // Destaca o jogador ativo
            this.highlightActivePlayer(activeSprite);
            
            // Destaca a carta ativa
            this.highlightActiveCard(cardSprite);
            
            // Indica quem está jogando
            this.logAction(`${activePlayer.name} usa ${cardData.name}!`);
            
            // Resolve o efeito da carta
            this.time.delayedCall(1000, () => {
                this.resolveCard(
                    cardSprite,
                    cardData,
                    targetSprite,
                    targetPlayer,
                    isPlayerTurn,
                    () => {
                        this.currentTurn++;
                        this.time.delayedCall(800, this.processCombatTurn, [], this);
                    }
                );
            });
        } else {
            // Pula o turno se não houver carta disponível
            this.logAction(`${activePlayer.name} passa o turno!`);
            this.currentTurn++;
            this.time.delayedCall(800, this.processCombatTurn, [], this);
        }
    }
    
    highlightActivePlayer(sprite) {
        // Remove highlight de todos os sprites
        [this.playerSprite, this.enemySprite].forEach(s => {
            s.clearTint();
            s.setScale(0.6);
        });
        
        // Aplica highlight ao jogador ativo
        sprite.setTint(0xFFFFAA);
        this.tweens.add({
            targets: sprite,
            scaleX: 0.65,
            scaleY: 0.65,
            duration: 200,
            yoyo: true
        });
    }
    
    highlightActiveCard(cardSprite) {
        // Remove highlight de todas as cartas
        [...this.playerCardSprites, ...this.enemyCardSprites].forEach(card => {
            if (card) {
                card.clearTint();
                card.setScale(0.3);
            }
        });
        
        // Aplica highlight à carta ativa
        if (cardSprite) {
            cardSprite.setTint(0xFFFFAA);
            this.tweens.add({
                targets: cardSprite,
                scaleX: 0.35,
                scaleY: 0.35,
                duration: 300,
                yoyo: true
            });
        }
    }

    resolveCard(cardSprite, cardData, targetSprite, target, isPlayer, onComplete) {
        // Animação de uso da carta
        this.tweens.add({
            targets: cardSprite,
            y: cardSprite.y - 40,
            duration: 200,
            ease: 'Sine.easeOut',
            yoyo: true,
            onComplete: () => {
                // Aqui devemos usar o método play da classe Card
                let damage = 0;
                
                // Verifica se customEffect existe e é uma função
                if (cardData.customEffect && typeof cardData.customEffect === 'function') {
                    damage = cardData.customEffect(this, isPlayer ? this.player1 : this.player2, target);
                } else {
                    // Usa defaultEffect para cartas sem efeito customizado
                    if (cardData.damage > 0) {
                        // Aplica dano modificado por sistemas
                        const attacker = isPlayer ? this.player1 : this.player2;
                        damage = attacker.systems ? 
                            attacker.systems.getModifiedDamage(cardData.damage) : 
                            cardData.damage;
                            
                        // Reseta foco após uso
                        if (attacker.systems) attacker.systems.focus = 0;
                        
                        // Aplica dano ao alvo
                        damage = target.takeDamage(damage);
                    }
                    
                    if (cardData.defense > 0) {
                        const defender = isPlayer ? this.player1 : this.player2;
                        defender.defense += cardData.defense;
                        this.logAction(`${defender.name} ganha ${cardData.defense} de defesa!`);
                    }
                }
                
                // Feedback visual do resultado
                if (damage > 0) {
                    this.logAction(`${target.name} recebe ${damage} de dano!`);
                    
                    // Animação de dano
                    this.tweens.add({
                        targets: targetSprite,
                        x: targetSprite.x + (isPlayer ? -15 : 15),
                        yoyo: true,
                        repeat: 3,
                        duration: 50,
                        onComplete: () => {
                            targetSprite.setTint(0xff0000);
                            this.updateHealthBars();
                            
                            this.time.delayedCall(200, () => {
                                targetSprite.clearTint();
                                onComplete();
                            });
                        }
                    });
                } else {
                    // Sem dano, vai para próximo turno
                    this.updateHealthBars();
                    this.time.delayedCall(200, onComplete);
                }
            }
        });
    }

    endCombat() {
        const winner = this.player1.hp > 0 ? this.player1 : this.player2;
        const loser = this.player1.hp > 0 ? this.player2 : this.player1;
        
        this.logAction(`${winner.name} venceu o combate!`);
        
        // Animação de vitória
        const winnerSprite = winner === this.player1 ? this.playerSprite : this.enemySprite;
        const loserSprite = loser === this.player1 ? this.playerSprite : this.enemySprite;
        
        // Animação do perdedor caindo
        this.tweens.add({
            targets: loserSprite,
            y: loserSprite.y + 100,
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
        });
        
        // Animação do vencedor pulando
        this.tweens.add({
            targets: winnerSprite,
            y: winnerSprite.y - 30,
            yoyo: true,
            repeat: 3,
            duration: 200,
            ease: 'Sine.easeOut'
        });
        
        // Retorna para a cena de planejamento após delay
        this.time.delayedCall(2000, () => {
            // Tenta obter o gameManager da cena de planejamento
            const planningScene = this.scene.get('PlanningScene');
            if (planningScene && planningScene.gameManager) {
                planningScene.gameManager.endCombat(loser);
            } else {
                console.error("Não foi possível acessar o gameManager da cena de planejamento");
                this.scene.start('PlanningScene');
            }
            
            this.scene.stop();
        });
    }

    reconstructPlayer(data) {
        const player = new Player(data.name);
        
        // Copia dados básicos
        player.hp = data.hp;
        player.maxHp = data.maxHp;
        player.destiny = data.destiny;
        player.defense = data.defense;
        player.cultivation = data.cultivation;
        player.phase = data.phase;
        
        // Recria os sistemas do jogador
        player.systems = new GameSystems();
        if (data.systems) {
            Object.assign(player.systems, data.systems);
        }
        
        // Recria as cartas nas slots
        player.cardsInSlots = data.cardsInSlots.map(cardData => {
            if (!cardData) return null;
            
            // Cria uma nova instância da carta a partir dos dados serializados
            const card = {
                name: cardData.name,
                type: cardData.type,
                level: cardData.level,
                damage: cardData.damage,
                defense: cardData.defense,
                essenceCost: cardData.essenceCost,
                texture: cardData.texture,
                description: cardData.description,
                
                // Método padrão para resolver o efeito da carta
                effect: function(game, player, target) {
                    if (this.damage > 0) {
                        const totalDamage = player.systems ? 
                            player.systems.getModifiedDamage(this.damage) : 
                            this.damage;
                            
                        if (player.systems) player.systems.focus = 0;
                        return target.takeDamage(totalDamage);
                    }
                    if (this.defense > 0) {
                        player.defense += this.defense;
                    }
                    return 0;
                }
            };
            
            return card;
        });
        
        // Recria as cartas na mão
        player.handCards = data.handCards.map(cardData => {
            if (!cardData) return null;
            
            return {
                name: cardData.name,
                type: cardData.type,
                level: cardData.level,
                damage: cardData.damage,
                defense: cardData.defense,
                essenceCost: cardData.essenceCost,
                texture: cardData.texture,
                description: cardData.description
            };
        });
        
        return player;
    }
}

 
    class RewardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RewardScene' });
    }

    create(data) {
        if (!data || !data.player) {
            this.scene.resume('PlanningScene');
            this.scene.stop();
            return;
        }

        const { player, phase } = data;
        const rewards = this.getRewardsForPhase(phase);
        
        // Fundo
        this.add.rectangle(500, 350, 800, 500, 0x000000, 0.8)
            .setInteractive();
        
        // Título
        this.add.text(500, 150, `Fase ${phase + 2} Desbloqueada!`, 
            { fontSize: '32px', fill: '#FFD700' })
            .setOrigin(0.5);
        
        // Recompensas
        rewards.forEach((reward, i) => {
            const yPos = 250 + (i * 100);
            const btn = this.add.graphics()
                .fillStyle(0x2a2a2a, 1)
                .fillRoundedRect(250, yPos - 30, 500, 80, 15)
                .setInteractive(new Phaser.Geom.Rectangle(250, yPos - 30, 500, 80), Phaser.Geom.Rectangle.Contains);
            
            btn.on('pointerover', () => {
                btn.clear().fillStyle(0x3a3a3a, 1).fillRoundedRect(250, yPos - 30, 500, 80, 15);
            });
            
            btn.on('pointerout', () => {
                btn.clear().fillStyle(0x2a2a2a, 1).fillRoundedRect(250, yPos - 30, 500, 80, 15);
            });

            this.add.text(270, yPos - 10, reward.name, 
                { fontSize: '22px', fill: '#FFD700' })
                .setOrigin(0, 0.5);

            this.add.text(270, yPos + 15, reward.desc, 
                { fontSize: '18px', fill: '#AAAAAA' })
                .setOrigin(0, 0.5);

            btn.on('pointerdown', () => {
                if (reward.type === 'passive') {
                    player.passives.push(reward.effect);
                    reward.effect.call(player);
                } else {
                    const newCard = new Card(reward.card);
                    player.specialCards.push(newCard);
                    player.handCards.push(newCard);
                }
                
                this.scene.resume('PlanningScene');
                this.scene.stop();
            });
        });
    }

    getRewardsForPhase(phase) {
        // Recompensas básicas - pode ser expandido
        return [
            {
                type: 'card',
                name: "Golpe Celestial",
                desc: "Ataque poderoso que ignora parte da defesa",
                card: {
                    name: "Golpe Celestial",
                    levels: [
                        { damage: 25, defense: 0, texture: "specialAttack1" }
                    ],
                    type: "attack"
                }
            },
            {
                type: 'passive',
                name: "Defesa Elevada",
                desc: "+5 de defesa permanente",
                effect: function() { this.defense += 5; }
            }
        ];
    }
}

// ====================== INICIALIZAÇÃO ======================
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    scene: [PlanningScene, CombatScene, RewardScene],
    backgroundColor: '#1a1a2e',
    render: {
        antialias: true,
        pixelArt: false,
        willReadFrequently: true
    },
    webgl: {
        antialias: true,
        failIfMajorPerformanceCaveat: false
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
