const path = require("path");
const fs = require('fs');

let localCanisters, prodCanisters, canisters

function initCanisterIds() {
    try {
        localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"))
    } catch (error) {
        console.log("No local canister_ids.json found. Continuing production")
    }
    try {
        prodCanisters = require(path.resolve("canister_ids.json"))
    } catch (error) {
        console.log("No production canister_ids.json found. Continuing with local")
    }

    const network =
        process.env.DFX_NETWORK ||
        (process.env.NODE_ENV === "production" ? "ic" : "local")

    console.info(`initCanisterIds: network=${network}`)
    console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`)

    canisters = network === "local" ? localCanisters : prodCanisters

    const declarationsPath = './src/declarations';
    setCanister(canisters, declarationsPath, network);
    createCanisterIndex(canisters, declarationsPath);
}

function setCanister(canisters, declarationsPath, network) {
    for (const canister in canisters) {
        const envCanisterId = `CANISTER_ID_${canister.toUpperCase()}`;
        const nextEnvCanisterId = `NEXT_PUBLIC_${canister.toUpperCase()}_CANISTER_ID`;

        process.env[nextEnvCanisterId] =
            canisters[canister][network]

        if (canister != "__Candid_UI") {
            const filePath = path.join(declarationsPath, canister, "index.js");

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                const updatedContent = data.replace(new RegExp(envCanisterId, 'g'), nextEnvCanisterId);

                fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
    }
}

function createCanisterIndex(canisters, declarationsPath) {
    const headContentArray = [];
    const canisterNamesArray = [];
    for (canister in canisters) {
        if (canister != "__Candid_UI") {
            const newLine = `export * as ${canister} from "./${canister}";`
            headContentArray.push(newLine);
            canisterNamesArray.push(`"${canister}"`);
        }
    }

    const canisterNameTypes = `export type CanisterNamesType = ${canisterNamesArray.join(" | ")};`;

    const fileContentArray = [headContentArray.join("\n"), canisterNameTypes];

    const fileContent = fileContentArray.join("\n\n");

    const filePath = path.join(declarationsPath, "index.ts");

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error creating the file:', err);
        } else {
            console.log(`File '${filePath}' has been created successfully.`);
        }
    });
}

module.exports = {
    initCanisterIds: initCanisterIds
}
