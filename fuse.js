const { FuseBox, QuantumPlugin, WebIndexPlugin } = require("fuse-box");
const tsTransform = require("ts-transform-inferno").default;

const IsProduction = process.argv[2] == "production";

const fusebox = FuseBox.init({
    tsConfig: "./tsconfig.json",
    target: "browser@es6",
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [QuantumPlugin({
        target: "npm-universal",
        bakeApiIntoBundle: true,
        containedAPI: true,
        uglify: true,
        treeshake: true
    })],
    transformers: {
        before: [tsTransform()]
    }
})

if (IsProduction) {
    fusebox.bundle("inferno-fontawesome")
        .instructions(" > FontAwesomeIcon.tsx");
    fusebox.run();
}
else {
    fusebox.dev();
    fusebox
        .bundle("test")
        .instructions(" > test.tsx")
        .sourceMaps(true)
        .hmr({ reload: true })
        .watch();
    fusebox.run();
}