import type { Loader } from 'astro/loaders';

const fallback_membercount = 19;

export function discordStatsLoader(): Loader {
  return {
    name: 'discord-stats',
    load: async ({ store, logger }) => {
      const token = import.meta.env.DISCORD_BOT_TOKEN;
      const guildId = import.meta.env.DISCORD_GUILD_ID;

      if (!token || !guildId) {
        logger.warn('DISCORD_BOT_TOKEN or DISCORD_GUILD_ID not set, using fallback');
        store.set({
          id: 'members',
          data: {
            label: 'Members',
            value: `${fallback_membercount} Active`,
            order: 2,
          },
        });
        return;
      }

      const res = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
        { headers: { Authorization: `Bot ${token}` } },
      );

      if (!res.ok) {
        logger.warn(`Discord API returned ${res.status}, using fallback`);
        store.set({
          id: 'members',
          data: {
            label: 'Members',
            value: `${fallback_membercount} Active`,
            order: 2,
          },
        });
        return;
      }

      const guild = await res.json();
      const count = guild.approximate_member_count ?? fallback_membercount;

      store.set({
        id: 'members',
        data: {
          label: 'Members',
          value: `${count} Active`,
          order: 2,
        },
      });

      logger.info(`Fetched Discord member count: ${count}`);
    },
  };
}
