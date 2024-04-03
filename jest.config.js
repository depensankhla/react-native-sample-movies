module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@react-native|react-redux/dist|@react-native-community|@babel/runtime|@babel/preset-env|@babel/plugin-transform-flow-strip-types|react-clone-referenced-element)"
    ],
    setupFiles: ["./jest.setup.js"],
};
