import adapter from '@sveltejs/adapter-vercel';

const config = { 
    env: { dir: './'},
    kit: { adapter: adapter() } };

export default config;
