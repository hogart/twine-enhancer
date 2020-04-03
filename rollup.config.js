import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { eslint } from 'rollup-plugin-eslint';

const plugins = [
    resolve(),
    commonjs(),
    json({
        preferConst: true,
    }),
    eslint({
        exclude: ['manifest.json'],
        formatter: 'unix',
    }),
];


const config = [{
    input: 'content/index.js',
    output: {
        file: 'content/content.bundle.js',
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
}, {
    input: 'background/index.js',
    output: {
        file: 'background/background.bundle.js',
        format: 'esm',
        sourcemap: true,
    },
    context: 'null',
    moduleContext: 'null',
    plugins,
}];

export default config; // eslint-disable-line import/no-default-export