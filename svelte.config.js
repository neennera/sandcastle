import adapter from '@sveltejs/adapter-vercel';

const config = {
    env: { dir: './' },
    kit: {
        adapter: adapter(),
        alias: {
            $api: "./src/routes/api",
        },
    }
};

export default config;
