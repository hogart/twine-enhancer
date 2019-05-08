import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html';
import { eslint } from 'rollup-plugin-eslint';

export default {
    input: 'content/index.js',
    output: {
        file: 'content/bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    context: 'null',
    moduleContext: 'null',
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            exclude: ['**/*.html'],
            formatter: 'unix',
        }),
        html(),
    ],
};