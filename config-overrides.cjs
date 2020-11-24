import { override } from 'customize-cra';
import cspHtmlWebpackPlugin from "csp-html-webpack-plugin";

const cspConfigPolicy = {
    'default-src': "'none'",
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'self'"],
    'style-src': ["'self'"]
};

function addCspHtmlWebpackPlugin(config) {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

export const webpack = override(addCspHtmlWebpackPlugin);