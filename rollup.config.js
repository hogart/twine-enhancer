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
}, {
    input: 'background/index.js',
    output: {
        file: 'background/index.bundle.js',
        format: 'esm',
        sourcemap: true,
    },
    context: 'null',
    moduleContext: 'null',
    plugins,
}];

// eslint-disable-next-line import/no-default-export
export default config;