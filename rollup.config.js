import { readFileSync } from 'fs';
import run from '@rollup/plugin-run';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import includePaths from 'rollup-plugin-includepaths';
import commonjs from '@rollup/plugin-commonjs';

// eslint-disable-next-line no-undef
const dev = process.env.ROLLUP_WATCH === 'true';
const pkg = JSON.parse(readFileSync('./package.json'));

const config = {
	input: './src/index.ts',
	output: {
		file: 'dist/index.js',
	},
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.devDependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		includePaths({
			include: {},
			paths: ['.'],
			external: [],
			extensions: ['.js', '.ts', '.d.ts', '.cjs'],
		}),
		typescript(),
		commonjs({ extensions: ['.js', '.ts', '.cjs'] }),
		dev && run(),
		!dev && terser(),
	],
};

export default config;
