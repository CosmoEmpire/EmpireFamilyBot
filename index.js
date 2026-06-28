require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Events,
    Partials,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// ================= BOT READY =================
client.once(Events.ClientReady, () => {
    console.log(`✅ Бот запущен как ${client.user.tag}`);
});

// ================= MEMBER JOIN =================
client.on(Events.GuildMemberAdd, async (member) => {

    try {

        const embed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle("👋 Присоединяйся к самой дружной семье!")
            .setDescription("**Семья Empire** - государственная семья проекта **Majestic RP**.")
            .addFields(
                {
                    name: "🎯 Мы предлагаем",
                    value:
                        "• Помощь в развитии\n" +
                        "• Большие выплаты\n" +
                        "• Хороший коллектив и многое другое"
                },
                {
                    name: "📌 Информация",
                    value:
                        "Присоединившись к нам, ты становишься частью активного и дружного сообщества."
                }
            )
            .setImage("https://i.ibb.co/RGJ0y548/Chat-GPT-Image-28-2026-18-51-27.png")
            .setFooter({ text: "Empire Family • Добро пожаловать!" })
            .setTimestamp();

        // ================= BUTTONS =================
        const row = new ActionRowBuilder()
            .addComponents(

                // 🔵 КНОПКА 1 - ЗАЯВКА
                new ButtonBuilder()
                    .setLabel("📩 Стать участником семьи")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.com/channels/1372646239077928980/1439228952446107779"),

                // 🟣 КНОПКА 2 - ИНФО
                new ButtonBuilder()
                    .setCustomId("about_family")
                    .setLabel("❓ Что такое семья Empire?")
                    .setStyle(ButtonStyle.Secondary)
            );

        await member.send({
            embeds: [embed],
            components: [row]
        });
        // ================= WELCOME CHANNEL =================

const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === "welcome"
);

if (welcomeChannel) {

    const welcomeEmbed = new EmbedBuilder()
        .setColor(0xFFD700)
        .setTitle("👋 Добро пожаловать в официальный Discord-сервер семьи Empire!")
        .setDescription(
            `Добро пожаловать, ${member}!\n\n` +
            "Мы рады видеть тебя в нашем сообществе."
        )
        .addFields(
            {
                name: "📩 В первую очередь",
                value:
                    "Подай заявку на вступление в семью."
            },
            {
                name: "💬 Общий чат семьи",
                value:
                    "После вступления обязательно загляни в чат для новичков."
            },
            {
                name: "🌐 Полезные ссылки",
                value:
                    "Официальный сайт Majestic RP."
            }
        )
        .setThumbnail(member.guild.iconURL({ dynamic: true }))
        .setFooter({
            text: "Семья Empire"
        })
        .setTimestamp();

    const welcomeButtons = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
                .setLabel("📩 Подать заявку")
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/channels/1372646239077928980/1439228952446107779"),

            new ButtonBuilder()
                .setLabel("💬 Общий чат")
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/channels/1372646239077928980/1491113887985041619"),

            new ButtonBuilder()
                .setLabel("🌐 Majestic RP")
                .setStyle(ButtonStyle.Link)
                .setURL("https://majestic-rp.ru/")
        );

    await welcomeChannel.send({
        content: `${member}`,
        embeds: [welcomeEmbed],
        components: [welcomeButtons]
    });
}

        console.log(`📩 DM отправлен: ${member.user.tag}`);

    } catch (err) {
        console.log("❌ DM не отправился:", err);
    }
});

// ================= BUTTON INTERACTIONS =================
client.on(Events.InteractionCreate, async (interaction) => {

    if (!interaction.isButton()) return;

    // ❓ КНОПКА "ЧТО ТАКОЕ СЕМЬЯ"
    if (interaction.customId === "about_family") {

        try {

            const infoEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle("❓ Что такое семья Empire?")
                .setDescription(
                    "Мы - огромное сообщество игроков, которое развивается и ставит уникальные рекорды!\n\n" +
                    "🏡 Семья готова оказать поддержку любому игроку проекта\n\n" +
                    "🚗 У нас большой автопарк\n" +
                    "🍽 Кухня максимального уровня\n" +
                    "🏢 Современный офис\n" +
                    "📦 Огромный склад\n" +
                    "🔧 Полноценная мастерская\n\n" +
                    "🔥 Мы развиваемся каждый день и создаём сильное RP-сообщество!"
                )
                .addFields({
                    name: "🌐 Официальный Discord",
                    value: "https://discord.gg/FCt9R82u5D"
                })
                .setFooter({ text: "Empire Family" })
                .setTimestamp();

            await interaction.reply({
                embeds: [infoEmbed],
                ephemeral: true
            });

        } catch (err) {
            console.log("Ошибка about_family:", err);
        }
    }
});
// ================= LOGIN =================
client.login(process.env.TOKEN);