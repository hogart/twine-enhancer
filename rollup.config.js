import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html';
import { eslint } from 'rollup-plugin-eslint';

const plugins = [
    resolve(),
    commonjs(),
    eslint({
        exclude: ['**/*.html'],
        formatter: 'unix',
    }),
    html(),
];

export default [{
    input: 'content/index.js',
    output: {
        file: 'content/index.bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    context: 'null',
    moduleContext: 'null',
    plugins,
}, {
    input: 'options/options.js',
    output: {
        file: 'options/options.bundle.js',
        format: 'esm',
        sourcemap: true,
    },
    context: 'null',
    moduleContext: 'null',
    plugins,
}];