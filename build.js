'use strict';

const fs       = require('fs');
const rimraf   = require('rimraf');
const path     = require('path');
const argv     = require('yargs').argv;
const exec     = require('child_process').execSync;
const tsconfig = require('./tsconfig.json');

const OUT_DIR = tsconfig.compilerOptions.outDir;
const ENV_DIR = path.join(OUT_DIR, 'environments');

class Build {
  constructor(environment) {
    Build.cleanup();
    Build.transpile();

    if (environment) {
      Build.setEnvironment(environment);
    }
  }

  static cleanup() {
    rimraf.sync(OUT_DIR);
  }

  static transpile() {
    exec('./node_modules/.bin/tsc');
  }

  static setEnvironment(env) {
    const sourceFile    = `environment.${env}.js`;
    const sourceMapFile = sourceFile + '.map';

    const sourcePath   = path.resolve(path.join(ENV_DIR, sourceFile));
    const sourceMapPath = path.resolve(path.join(ENV_DIR, sourceMapFile));

    if (fs.existsSync(sourcePath)) {
      const targetPath = path.resolve(path.join(ENV_DIR, 'environment.js'));
      fs.writeFileSync(targetPath, Build.getEnvironmentSource(env));
    } else {
      console.log(`source not found: ${sourcePath}`);
    }

    if (fs.existsSync(sourceMapPath)) {
      const targetPath = path.resolve(path.join(ENV_DIR, 'environment.js.map'));
      fs.writeFileSync(targetPath, Build.getEnvironmentSourceMap());
    } else {
      console.log(`source-map not found: ${sourceMapPath}`);
    }
  }


  static getEnvironmentSource(env) {
    return `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_${env}_1 = require("./environment.${env}");
exports.environment = environment_prod_1.environment;
//# sourceMappingURL=environment.js.map
`;
  }

  static getEnvironmentSourceMap() {
    return '{"version":3,"file":"environment.js","sourceRoot":"","sources":["../../src/environments/environment.ts"],"names":[],"mappings":";;AAAA,uDAA+C;AAAvC,yCAAA,WAAW,CAAA"}';
  }
}

new Build(argv.environment);


