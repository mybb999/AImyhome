---
title: "2026-03-27 流式输出小项目"
description: "因为公司太严了，导致自己在公司电脑做的文档流式输出小项目导出不了外面，只能先记录部分重要的代码my-vue-app server-express"
date: 2026-03-27
collection: ai-tools
tags: ["流式输出"]
readingTime: 1
wordage: 52
originalUrl: "https://www.jianshu.com/p/f19238c01ce2"
---
因为公司太严了，导致自己在公司电脑做的文档流式输出小项目导出不了外面，只能先记录部分重要的代码  
my-vue-app

```
// package-lock.json
{
  "name": "my-vue-app",
  "version": "0.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "my-vue-app",
      "version": "0.0.0",
      "dependencies": {
        "@esbuild/win32-x64": "^0.25.2",
        "axios": "^1.8.4",
        "element-plus": "^2.9.7",
        "marked": "^15.0.10",
        "pinia": "^3.0.2",
        "vue": "^3.5.13",
        "vue-router": "^4.5.0"
      },
      "devDependencies": {
        "@types/node": "^22.14.0",
        "@vitejs/plugin-vue": "^5.2.1",
        "@vue/tsconfig": "^0.7.0",
        "typescript": "~5.7.2",
        "vite": "^6.2.0",
        "vue-tsc": "^2.2.4"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.25.9",
      "resolved": "http://npm.msxf.com/@babel%2fhelper-string-parser/-/helper-string-parser-7.25.9.tgz",
      "integrity": "sha512-4A/SCr/2KLd5jrtOMFzaKjVtAei3+2r/NChoBNoZ3EyP/+GlhoaEGoWOZUmFmoITP7zOJyHIMm+DYRd8o3PvHA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.25.9",
      "resolved": "http://npm.msxf.com/@babel%2fhelper-validator-identifier/-/helper-validator-identifier-7.25.9.tgz",
      "integrity": "sha512-Ed61U6XJc3CVRfkERJWDz4dJwKe7iLmmJsbOGu9wSloNSFttHV0I8g6UAgb7qnK5ly5bGLPd4oXZlxCdANBOWQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.27.0",
      "resolved": "http://npm.msxf.com/@babel%2fparser/-/parser-7.27.0.tgz",
      "integrity": "sha512-iaepho73/2Pz7w2eMS0Q5f83+0RKI7i4xmiYeBmDzfRVbQtTOG7Ts0S4HzJVsTMGI9keU8rNfuZr8DKfSt7Yyg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.27.0",
      "resolved": "http://npm.msxf.com/@babel%2ftypes/-/types-7.27.0.tgz",
      "integrity": "sha512-H45s8fVLYjbhFH62dIJ3WtmJ6RSPt/3DRO0ZcT2SUiYiQyz3BLVb9ADEnLl91m74aQPS3AzzeajZHYOalWe3bg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.25.9",
        "@babel/helper-validator-identifier": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@ctrl/tinycolor": {
      "version": "3.6.1",
      "resolved": "http://npm.msxf.com/@ctrl%2ftinycolor/-/tinycolor-3.6.1.tgz",
      "integrity": "sha512-SITSV6aIXsuVNV3f3O0f2n/cgyEDWoSqtZMYiAmcsYHydcKrOz3gUxB/iXd/Qf08+IZX4KpgNbvUdMBmWz+kcA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@element-plus/icons-vue": {
      "version": "2.3.1",
      "resolved": "http://npm.msxf.com/@element-plus%2ficons-vue/-/icons-vue-2.3.1.tgz",
      "integrity": "sha512-XxVUZv48RZAd87ucGS48jPf6pKu0yV5UCg9f4FFwtrYxXOwWuVJo6wOvSLKEoMQKjv8GsX/mhP6UsC1lRwbUWg==",
      "license": "MIT",
      "peerDependencies": {
        "vue": "^3.2.0"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.2",
      "resolved": "http://npm.msxf.com/@esbuild%2fwin32-x64/-/win32-x64-0.25.2.tgz",
      "integrity": "sha512-kM3HKb16VIXZyIeVrM1ygYmZBKybX8N4p754bw390wGO3Tf2j4L2/WYL+4suWujpgf6GBYs3jv7TyUivdd05JA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.6.9",
      "resolved": "http://npm.msxf.com/@floating-ui%2fcore/-/core-1.6.9.tgz",
      "integrity": "sha512-uMXCuQ3BItDUbAMhIXw7UPXRfAlOAvZzdK9BWpE60MCn+Svt3aLn9jsPTi/WNGlRUu2uI0v5S7JiIUsbsvh3fw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.6.13",
      "resolved": "http://npm.msxf.com/@floating-ui%2fdom/-/dom-1.6.13.tgz",
      "integrity": "sha512-umqzocjDgNRGTuO7Q8CU32dkHkECqI8ZdMZ5Swb6QAM0t5rnlrN3lGo1hdpscRd3WS8T6DKYK4ephgIH9iRh3w==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.6.0",
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.9",
      "resolved": "http://npm.msxf.com/@floating-ui%2futils/-/utils-0.2.9.tgz",
      "integrity": "sha512-MDWhGtE+eHw5JW7lq4qhc5yRLS11ERl1c7Z6Xd0a58DozHES6EnNNwUWbMiG4J9Cgj053Bhk8zvlhFYKVhULwg==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.0",
      "resolved": "http://npm.msxf.com/@jridgewell%2fsourcemap-codec/-/sourcemap-codec-1.5.0.tgz",
      "integrity": "sha512-gv3ZRaISU3fjPAgNsriBRqGWQL6quFx04YMPW/zD8XMLsU32mhCCbfbO6KZFLjvYpCZ8zyDEgqsgf+PwPaM7GQ==",
      "license": "MIT"
    },
    "node_modules/@popperjs/core": {
      "name": "@sxzz/popperjs-es",
      "version": "2.11.7",
      "resolved": "http://npm.msxf.com/@sxzz%2fpopperjs-es/-/popperjs-es-2.11.7.tgz",
      "integrity": "sha512-Ccy0NlLkzr0Ex2FKvh2X+OyERHXJ88XJ1MXtsI9y9fGexlaXaVTPzBCRBwIxFkORuOb+uBqeu+RqnpgYTEZRUQ==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/popperjs"
      }
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.39.0",
      "resolved": "http://npm.msxf.com/@rollup%2frollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.39.0.tgz",
      "integrity": "sha512-yAkUOkIKZlK5dl7u6dg897doBgLXmUHhIINM2c+sND3DZwnrdQkkSiDh7N75Ll4mM4dxSkYfXqU9fW3lLkMFug==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/estree": {
      "version": "1.0.7",
      "resolved": "http://npm.msxf.com/@types%2festree/-/estree-1.0.7.tgz",
      "integrity": "sha512-w28IoSUCJpidD/TGviZwwMJckNESJZXFu7NBZ5YJ4mEUnNraUn9Pm8HSZm/jDF1pDWYKspWE7oVphigUPRakIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/lodash": {
      "version": "4.17.16",
      "resolved": "http://npm.msxf.com/@types%2flodash/-/lodash-4.17.16.tgz",
      "integrity": "sha512-HX7Em5NYQAXKW+1T+FiuG27NGwzJfCX3s1GjOa7ujxZa52kjJLOr4FUxT+giF6Tgxv1e+/czV/iTtBw27WTU9g==",
      "license": "MIT"
    },
    "node_modules/@types/lodash-es": {
      "version": "4.17.12",
      "resolved": "http://npm.msxf.com/@types%2flodash-es/-/lodash-es-4.17.12.tgz",
      "integrity": "sha512-0NgftHUcV4v34VhXm8QBSftKVXtbkBG3ViCjs6+eJ5a6y6Mi/jiFGPc1sC7QK+9BFhWrURE3EOggmWaSxL9OzQ==",
      "license": "MIT",
      "dependencies": {
        "@types/lodash": "*"
      }
    },
    "node_modules/@types/node": {
      "version": "22.14.0",
      "resolved": "http://npm.msxf.com/@types%2fnode/-/node-22.14.0.tgz",
      "integrity": "sha512-Kmpl+z84ILoG+3T/zQFyAJsU6EPTmOCj8/2+83fSN6djd6I4o7uOuGIH6vq3PrjY5BGitSbFuMN18j3iknubbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/web-bluetooth": {
      "version": "0.0.16",
      "resolved": "http://npm.msxf.com/@types%2fweb-bluetooth/-/web-bluetooth-0.0.16.tgz",
      "integrity": "sha512-oh8q2Zc32S6gd/j50GowEjKLoOVOwHP/bWVjKJInBwQqdOYMdPrf1oVlelTlyfFK3CKxL1uahMDAr+vy8T7yMQ==",
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-vue": {
      "version": "5.2.3",
      "resolved": "http://npm.msxf.com/@vitejs%2fplugin-vue/-/plugin-vue-5.2.3.tgz",
      "integrity": "sha512-IYSLEQj4LgZZuoVpdSUCw3dIynTWQgPlaRP6iAvMle4My0HdYwr5g5wQAfwOeHQBmYwEkqF70nRpSilr6PoUDg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "peerDependencies": {
        "vite": "^5.0.0 || ^6.0.0",
        "vue": "^3.2.25"
      }
    },
    "node_modules/@volar/language-core": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2flanguage-core/-/language-core-2.4.12.tgz",
      "integrity": "sha512-RLrFdXEaQBWfSnYGVxvR2WrO6Bub0unkdHYIdC31HzIEqATIuuhRRzYu76iGPZ6OtA4Au1SnW0ZwIqPP217YhA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@volar/source-map": "2.4.12"
      }
    },
    "node_modules/@volar/source-map": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2fsource-map/-/source-map-2.4.12.tgz",
      "integrity": "sha512-bUFIKvn2U0AWojOaqf63ER0N/iHIBYZPpNGogfLPQ68F5Eet6FnLlyho7BS0y2HJ1jFhSif7AcuTx1TqsCzRzw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@volar/typescript": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2ftypescript/-/typescript-2.4.12.tgz",
      "integrity": "sha512-HJB73OTJDgPc80K30wxi3if4fSsZZAOScbj2fcicMuOPoOkcf9NNAINb33o+DzhBdF9xTKC1gnPmIRDous5S0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@volar/language-core": "2.4.12",
        "path-browserify": "^1.0.1",
        "vscode-uri": "^3.0.8"
      }
    },
    "node_modules/@vue/compiler-core": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-core/-/compiler-core-3.5.13.tgz",
      "integrity": "sha512-oOdAkwqUfW1WqpwSYJce06wvt6HljgY3fGeM9NcVA1HaYOij3mZG9Rkysn0OHuyUAGMbEbARIpsG+LPVlBJ5/Q==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.25.3",
        "@vue/shared": "3.5.13",
        "entities": "^4.5.0",
        "estree-walker": "^2.0.2",
        "source-map-js": "^1.2.0"
      }
    },
    "node_modules/@vue/compiler-dom": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-dom/-/compiler-dom-3.5.13.tgz",
      "integrity": "sha512-ZOJ46sMOKUjO3e94wPdCzQ6P1Lx/vhp2RSvfaab88Ajexs0AHeV0uasYhi99WPaogmBlRHNRuly8xV75cNTMDA==",
      "license": "MIT",
      "dependencies": {
        "@vue/compiler-core": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "node_modules/@vue/compiler-sfc": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-sfc/-/compiler-sfc-3.5.13.tgz",
      "integrity": "sha512-6VdaljMpD82w6c2749Zhf5T9u5uLBWKnVue6XWxprDobftnletJ8+oel7sexFfM3qIxNmVE7LSFGTpv6obNyaQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.25.3",
        "@vue/compiler-core": "3.5.13",
        "@vue/compiler-dom": "3.5.13",
        "@vue/compiler-ssr": "3.5.13",
        "@vue/shared": "3.5.13",
        "estree-walker": "^2.0.2",
        "magic-string": "^0.30.11",
        "postcss": "^8.4.48",
        "source-map-js": "^1.2.0"
      }
    },
    "node_modules/@vue/compiler-ssr": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-ssr/-/compiler-ssr-3.5.13.tgz",
      "integrity": "sha512-wMH6vrYHxQl/IybKJagqbquvxpWCuVYpoUJfCqFZwa/JY1GdATAQ+TgVtgrwwMZ0D07QhA99rs/EAAWfvG6KpA==",
      "license": "MIT",
      "dependencies": {
        "@vue/compiler-dom": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "node_modules/@vue/compiler-vue2": {
      "version": "2.7.16",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-vue2/-/compiler-vue2-2.7.16.tgz",
      "integrity": "sha512-qYC3Psj9S/mfu9uVi5WvNZIzq+xnXMhOwbTFKKDD7b1lhpnn71jXSFdTQ+WsIEk0ONCd7VV2IMm7ONl6tbQ86A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "de-indent": "^1.0.2",
        "he": "^1.2.0"
      }
    },
    "node_modules/@vue/devtools-api": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-api/-/devtools-api-7.7.2.tgz",
      "integrity": "sha512-1syn558KhyN+chO5SjlZIwJ8bV/bQ1nOVTG66t2RbG66ZGekyiYNmRO7X9BJCXQqPsFHlnksqvPhce2qpzxFnA==",
      "license": "MIT",
      "dependencies": {
        "@vue/devtools-kit": "^7.7.2"
      }
    },
    "node_modules/@vue/devtools-kit": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-kit/-/devtools-kit-7.7.2.tgz",
      "integrity": "sha512-CY0I1JH3Z8PECbn6k3TqM1Bk9ASWxeMtTCvZr7vb+CHi+X/QwQm5F1/fPagraamKMAHVfuuCbdcnNg1A4CYVWQ==",
      "license": "MIT",
      "dependencies": {
        "@vue/devtools-shared": "^7.7.2",
        "birpc": "^0.2.19",
        "hookable": "^5.5.3",
        "mitt": "^3.0.1",
        "perfect-debounce": "^1.0.0",
        "speakingurl": "^14.0.1",
        "superjson": "^2.2.1"
      }
    },
    "node_modules/@vue/devtools-shared": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-shared/-/devtools-shared-7.7.2.tgz",
      "integrity": "sha512-uBFxnp8gwW2vD6FrJB8JZLUzVb6PNRG0B0jBnHsOH8uKyva2qINY8PTF5Te4QlTbMDqU5K6qtJDr6cNsKWhbOA==",
      "license": "MIT",
      "dependencies": {
        "rfdc": "^1.4.1"
      }
    },
    "node_modules/@vue/language-core": {
      "version": "2.2.8",
      "resolved": "http://npm.msxf.com/@vue%2flanguage-core/-/language-core-2.2.8.tgz",
      "integrity": "sha512-rrzB0wPGBvcwaSNRriVWdNAbHQWSf0NlGqgKHK5mEkXpefjUlVRP62u03KvwZpvKVjRnBIQ/Lwre+Mx9N6juUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@volar/language-core": "~2.4.11",
        "@vue/compiler-dom": "^3.5.0",
        "@vue/compiler-vue2": "^2.7.16",
        "@vue/shared": "^3.5.0",
        "alien-signals": "^1.0.3",
        "minimatch": "^9.0.3",
        "muggle-string": "^0.4.1",
        "path-browserify": "^1.0.1"
      },
      "peerDependencies": {
        "typescript": "*"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@vue/reactivity": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2freactivity/-/reactivity-3.5.13.tgz",
      "integrity": "sha512-NaCwtw8o48B9I6L1zl2p41OHo/2Z4wqYGGIK1Khu5T7yxrn+ATOixn/Udn2m+6kZKB/J7cuT9DbWWhRxqixACg==",
      "license": "MIT",
      "dependencies": {
        "@vue/shared": "3.5.13"
      }
    },
    "node_modules/@vue/runtime-core": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fruntime-core/-/runtime-core-3.5.13.tgz",
      "integrity": "sha512-Fj4YRQ3Az0WTZw1sFe+QDb0aXCerigEpw418pw1HBUKFtnQHWzwojaukAs2X/c9DQz4MQ4bsXTGlcpGxU/RCIw==",
      "license": "MIT",
      "dependencies": {
        "@vue/reactivity": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "node_modules/@vue/runtime-dom": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fruntime-dom/-/runtime-dom-3.5.13.tgz",
      "integrity": "sha512-dLaj94s93NYLqjLiyFzVs9X6dWhTdAlEAciC3Moq7gzAc13VJUdCnjjRurNM6uTLFATRHexHCTu/Xp3eW6yoog==",
      "license": "MIT",
      "dependencies": {
        "@vue/reactivity": "3.5.13",
        "@vue/runtime-core": "3.5.13",
        "@vue/shared": "3.5.13",
        "csstype": "^3.1.3"
      }
    },
    "node_modules/@vue/server-renderer": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fserver-renderer/-/server-renderer-3.5.13.tgz",
      "integrity": "sha512-wAi4IRJV/2SAW3htkTlB+dHeRmpTiVIK1OGLWV1yeStVSebSQQOwGwIq0D3ZIoBj2C2qpgz5+vX9iEBkTdk5YA==",
      "license": "MIT",
      "dependencies": {
        "@vue/compiler-ssr": "3.5.13",
        "@vue/shared": "3.5.13"
      },
      "peerDependencies": {
        "vue": "3.5.13"
      }
    },
    "node_modules/@vue/shared": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fshared/-/shared-3.5.13.tgz",
      "integrity": "sha512-/hnE/qP5ZoGpol0a5mDi45bOd7t3tjYJBjsgCsivow7D48cJeV5l05RD82lPqi7gRiphZM37rnhW1l6ZoCNNnQ==",
      "license": "MIT"
    },
    "node_modules/@vue/tsconfig": {
      "version": "0.7.0",
      "resolved": "http://npm.msxf.com/@vue%2ftsconfig/-/tsconfig-0.7.0.tgz",
      "integrity": "sha512-ku2uNz5MaZ9IerPPUyOHzyjhXoX2kVJaVf7hL315DC17vS6IiZRmmCPfggNbU16QTvM80+uYYy3eYJB59WCtvg==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "typescript": "5.x",
        "vue": "^3.4.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        },
        "vue": {
          "optional": true
        }
      }
    },
    "node_modules/@vueuse/core": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fcore/-/core-9.13.0.tgz",
      "integrity": "sha512-pujnclbeHWxxPRqXWmdkKV5OX4Wk4YeK7wusHqRwU0Q7EFusHoqNA/aPhB6KCh9hEqJkLAJo7bb0Lh9b+OIVzw==",
      "license": "MIT",
      "dependencies": {
        "@types/web-bluetooth": "^0.0.16",
        "@vueuse/metadata": "9.13.0",
        "@vueuse/shared": "9.13.0",
        "vue-demi": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/@vueuse/core/node_modules/vue-demi": {
      "version": "0.14.10",
      "resolved": "http://npm.msxf.com/vue-demi/-/vue-demi-0.14.10.tgz",
      "integrity": "sha512-nMZBOwuzabUO0nLgIcc6rycZEebF6eeUfaiQx9+WSk8e29IbLvPU9feI6tqW4kTo3hvoYAJkMh8n8D0fuISphg==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "vue-demi-fix": "bin/vue-demi-fix.js",
        "vue-demi-switch": "bin/vue-demi-switch.js"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      },
      "peerDependencies": {
        "@vue/composition-api": "^1.0.0-rc.1",
        "vue": "^3.0.0-0 || ^2.6.0"
      },
      "peerDependenciesMeta": {
        "@vue/composition-api": {
          "optional": true
        }
      }
    },
    "node_modules/@vueuse/metadata": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fmetadata/-/metadata-9.13.0.tgz",
      "integrity": "sha512-gdU7TKNAUVlXXLbaF+ZCfte8BjRJQWPCa2J55+7/h+yDtzw3vOoGQDRXzI6pyKyo6bXFT5/QoPE4hAknExjRLQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/@vueuse/shared": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fshared/-/shared-9.13.0.tgz",
      "integrity": "sha512-UrnhU+Cnufu4S6JLCPZnkWh0WwZGUp72ktOF2DFptMlOs3TOdVv8xJN53zhHGARmVOsz5KqOls09+J1NR6sBKw==",
      "license": "MIT",
      "dependencies": {
        "vue-demi": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/@vueuse/shared/node_modules/vue-demi": {
      "version": "0.14.10",
      "resolved": "http://npm.msxf.com/vue-demi/-/vue-demi-0.14.10.tgz",
      "integrity": "sha512-nMZBOwuzabUO0nLgIcc6rycZEebF6eeUfaiQx9+WSk8e29IbLvPU9feI6tqW4kTo3hvoYAJkMh8n8D0fuISphg==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "vue-demi-fix": "bin/vue-demi-fix.js",
        "vue-demi-switch": "bin/vue-demi-switch.js"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      },
      "peerDependencies": {
        "@vue/composition-api": "^1.0.0-rc.1",
        "vue": "^3.0.0-0 || ^2.6.0"
      },
      "peerDependenciesMeta": {
        "@vue/composition-api": {
          "optional": true
        }
      }
    },
    "node_modules/alien-signals": {
      "version": "1.0.13",
      "resolved": "http://npm.msxf.com/alien-signals/-/alien-signals-1.0.13.tgz",
      "integrity": "sha512-OGj9yyTnJEttvzhTUWuscOvtqxq5vrhF7vL9oS0xJ2mK0ItPYP1/y+vCFebfxoEyAz0++1AIwJ5CMr+Fk3nDmg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-validator": {
      "version": "4.2.5",
      "resolved": "http://npm.msxf.com/async-validator/-/async-validator-4.2.5.tgz",
      "integrity": "sha512-7HhHjtERjqlNbZtqNqy2rckN/SpOOlmDliet+lP7k+eKZEjPk3DgyeU9lIXLdeLz0uBbbVp+9Qdow9wJWgwwfg==",
      "license": "MIT"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "http://npm.msxf.com/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k=",
      "license": "MIT"
    },
    "node_modules/axios": {
      "version": "1.8.4",
      "resolved": "http://npm.msxf.com/axios/-/axios-1.8.4.tgz",
      "integrity": "sha512-eBSYY4Y68NNlHbHBMdeDmKNtDgXWhQsJcGqzO3iLUM0GraQFSS9cVgPX5I9b3lbdFKyYoAEGAZF1DwhTaljNAw==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.15.6",
        "form-data": "^4.0.0",
        "proxy-from-env": "^1.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha1-6D46fj8wCzTLnYf2FfoMvzV2kO4=",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/birpc": {
      "version": "0.2.19",
      "resolved": "http://npm.msxf.com/birpc/-/birpc-0.2.19.tgz",
      "integrity": "sha512-5WeXXAvTmitV1RqJFppT5QtUiz2p1mRSYU000Jkft5ZUCLJIk4uQriYNO50HknxKwM6jd8utNc66K1qGIwwWBQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/brace-expansion": {
      "version": "2.0.1",
      "resolved": "http://npm.msxf.com/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha1-HtxFng8MVISG7Pn8mfIiE2S5oK4=",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "http://npm.msxf.com/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/copy-anything": {
      "version": "3.0.5",
      "resolved": "http://npm.msxf.com/copy-anything/-/copy-anything-3.0.5.tgz",
      "integrity": "sha512-yCEafptTtb4bk7GLEQoM8KVJpxAfdBJYaXyzQEgQQQgYrZiDp8SJmGKlYza6CYjEDNstAdNdKA3UuoULlEbS6w==",
      "license": "MIT",
      "dependencies": {
        "is-what": "^4.1.8"
      },
      "engines": {
        "node": ">=12.13"
      },
      "funding": {
        "url": "https://github.com/sponsors/mesqueeb"
      }
    },
    "node_modules/csstype": {
      "version": "3.1.3",
      "resolved": "http://npm.msxf.com/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
      "license": "MIT"
    },
    "node_modules/dayjs": {
      "version": "1.11.13",
      "resolved": "http://npm.msxf.com/dayjs/-/dayjs-1.11.13.tgz",
      "integrity": "sha512-oaMBel6gjolK862uaPQOVTA7q3TZhuSvuMQAAglQDOWYO9A91IrAOUJEyKVlqJlHE0vq5p5UXxzdPfMH/x6xNg==",
      "license": "MIT"
    },
    "node_modules/de-indent": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/de-indent/-/de-indent-1.0.2.tgz",
      "integrity": "sha1-sgOOhG3DO6pXlhKNCAS0VbjB4h0=",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "http://npm.msxf.com/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk=",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/element-plus": {
      "version": "2.9.7",
      "resolved": "http://npm.msxf.com/element-plus/-/element-plus-2.9.7.tgz",
      "integrity": "sha512-6vjZh5SXBncLhUwJGTVKS5oDljfgGMh6J4zVTeAZK3YdMUN76FgpvHkwwFXocpJpMbii6rDYU3sgie64FyPerQ==",
      "license": "MIT",
      "dependencies": {
        "@ctrl/tinycolor": "^3.4.1",
        "@element-plus/icons-vue": "^2.3.1",
        "@floating-ui/dom": "^1.0.1",
        "@popperjs/core": "npm:@sxzz/popperjs-es@^2.11.7",
        "@types/lodash": "^4.14.182",
        "@types/lodash-es": "^4.17.6",
        "@vueuse/core": "^9.1.0",
        "async-validator": "^4.2.5",
        "dayjs": "^1.11.13",
        "escape-html": "^1.0.3",
        "lodash": "^4.17.21",
        "lodash-es": "^4.17.21",
        "lodash-unified": "^1.0.2",
        "memoize-one": "^6.0.0",
        "normalize-wheel-es": "^1.2.0"
      },
      "peerDependencies": {
        "vue": "^3.2.0"
      }
    },
    "node_modules/entities": {
      "version": "4.5.0",
      "resolved": "http://npm.msxf.com/entities/-/entities-4.5.0.tgz",
      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "http://npm.msxf.com/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "http://npm.msxf.com/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "http://npm.msxf.com/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.2",
      "resolved": "http://npm.msxf.com/esbuild/-/esbuild-0.25.2.tgz",
      "integrity": "sha512-16854zccKPnC+toMywC+uKNeYSv+/eXkevRAfwRD/G9Cleq66m8XFIrigkbvauLLlCfDL45Q2cWegSg53gGBnQ==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.2",
        "@esbuild/android-arm": "0.25.2",
        "@esbuild/android-arm64": "0.25.2",
        "@esbuild/android-x64": "0.25.2",
        "@esbuild/darwin-arm64": "0.25.2",
        "@esbuild/darwin-x64": "0.25.2",
        "@esbuild/freebsd-arm64": "0.25.2",
        "@esbuild/freebsd-x64": "0.25.2",
        "@esbuild/linux-arm": "0.25.2",
        "@esbuild/linux-arm64": "0.25.2",
        "@esbuild/linux-ia32": "0.25.2",
        "@esbuild/linux-loong64": "0.25.2",
        "@esbuild/linux-mips64el": "0.25.2",
        "@esbuild/linux-ppc64": "0.25.2",
        "@esbuild/linux-riscv64": "0.25.2",
        "@esbuild/linux-s390x": "0.25.2",
        "@esbuild/linux-x64": "0.25.2",
        "@esbuild/netbsd-arm64": "0.25.2",
        "@esbuild/netbsd-x64": "0.25.2",
        "@esbuild/openbsd-arm64": "0.25.2",
        "@esbuild/openbsd-x64": "0.25.2",
        "@esbuild/sunos-x64": "0.25.2",
        "@esbuild/win32-arm64": "0.25.2",
        "@esbuild/win32-ia32": "0.25.2",
        "@esbuild/win32-x64": "0.25.2"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "http://npm.msxf.com/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg=",
      "license": "MIT"
    },
    "node_modules/estree-walker": {
      "version": "2.0.2",
      "resolved": "http://npm.msxf.com/estree-walker/-/estree-walker-2.0.2.tgz",
      "integrity": "sha1-UvAQF4wqTBF6d1fP6UKtt9LaTKw=",
      "license": "MIT"
    },
    "node_modules/follow-redirects": {
      "version": "1.15.9",
      "resolved": "http://npm.msxf.com/follow-redirects/-/follow-redirects-1.15.9.tgz",
      "integrity": "sha512-gew4GsXizNgdoRyqmyfMHyAmXsZDk6mHkSxZFCzW9gwlbtOW44CDtYavM+y+72qD/Vq2l550kMF52DT8fOLJqQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/form-data": {
      "version": "4.0.2",
      "resolved": "http://npm.msxf.com/form-data/-/form-data-4.0.2.tgz",
      "integrity": "sha512-hGfm/slu0ZabnNt4oaRZ6uREyfCj6P4fT/n6A1rGV+Z0VdGXjfOhVUpkn6qVQONHGIFwmveGXyDs75+nr6FM8w==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "mime-types": "^2.1.12"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "http://npm.msxf.com/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "http://npm.msxf.com/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "http://npm.msxf.com/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/he": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/he/-/he-1.2.0.tgz",
      "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "he": "bin/he"
      }
    },
    "node_modules/hookable": {
      "version": "5.5.3",
      "resolved": "http://npm.msxf.com/hookable/-/hookable-5.5.3.tgz",
      "integrity": "sha512-Yc+BQe8SvoXH1643Qez1zqLRmbA5rCL+sSmk6TVos0LWVfNIB7PGncdlId77WzLGSIB5KaWgTaNTs2lNVEI6VQ==",
      "license": "MIT"
    },
    "node_modules/is-what": {
      "version": "4.1.16",
      "resolved": "http://npm.msxf.com/is-what/-/is-what-4.1.16.tgz",
      "integrity": "sha512-ZhMwEosbFJkA0YhFnNDgTM4ZxDRsS6HqTo7qsZM08fehyRYIYa0yHu5R6mgo1n/8MgaPBXiPimPD77baVFYg+A==",
      "license": "MIT",
      "engines": {
        "node": ">=12.13"
      },
      "funding": {
        "url": "https://github.com/sponsors/mesqueeb"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "http://npm.msxf.com/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha1-Z5WRxWTDv/quhFTPCz3zcMPWkRw=",
      "license": "MIT"
    },
    "node_modules/lodash-es": {
      "version": "4.17.21",
      "resolved": "http://npm.msxf.com/lodash-es/-/lodash-es-4.17.21.tgz",
      "integrity": "sha1-Q+YmxG5lkbd1C+srUBFzkMYJ4+4=",
      "license": "MIT"
    },
    "node_modules/lodash-unified": {
      "version": "1.0.3",
      "resolved": "http://npm.msxf.com/lodash-unified/-/lodash-unified-1.0.3.tgz",
      "integrity": "sha512-WK9qSozxXOD7ZJQlpSqOT+om2ZfcT4yO+03FuzAHD0wF6S0l0090LRPDx3vhTTLZ8cFKpBn+IOcVXK6qOcIlfQ==",
      "license": "MIT",
      "peerDependencies": {
        "@types/lodash-es": "*",
        "lodash": "*",
        "lodash-es": "*"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.17",
      "resolved": "http://npm.msxf.com/magic-string/-/magic-string-0.30.17.tgz",
      "integrity": "sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0"
      }
    },
    "node_modules/marked": {
      "version": "15.0.10",
      "resolved": "http://npm.msxf.com/marked/-/marked-15.0.10.tgz",
      "integrity": "sha512-BXzsfFiR2UqXFKRwpugWuCYi9mWd1aX/Yns/X52xWfvfen9lnGEDbJw9ZEjjvLZVqntqT2gX45eYvqb2dIokDw==",
      "license": "MIT",
      "bin": {
        "marked": "bin/marked.js"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/memoize-one": {
      "version": "6.0.0",
      "resolved": "http://npm.msxf.com/memoize-one/-/memoize-one-6.0.0.tgz",
      "integrity": "sha512-rkpe71W0N0c0Xz6QD0eJETuWAJGnJ9afsl1srmwPrI+yBCkge5EycXXbYRyvL29zZVUWQCY7InPRCv3GDXuZNw==",
      "license": "MIT"
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "http://npm.msxf.com/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "http://npm.msxf.com/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "http://npm.msxf.com/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/mitt": {
      "version": "3.0.1",
      "resolved": "http://npm.msxf.com/mitt/-/mitt-3.0.1.tgz",
      "integrity": "sha512-vKivATfr97l2/QBCYAkXYDbrIWPM2IIKEl7YPhjCvKlG3kE2gm+uBo6nEXK3M5/Ffh/FLpKExzOQ3JJoJGFKBw==",
      "license": "MIT"
    },
    "node_modules/muggle-string": {
      "version": "0.4.1",
      "resolved": "http://npm.msxf.com/muggle-string/-/muggle-string-0.4.1.tgz",
      "integrity": "sha512-VNTrAak/KhO2i8dqqnqnAHOa3cYBwXEZe9h+D5h/1ZqFSTEFHdM65lR7RoIqq3tBBYavsOXV84NoHXZ0AkPyqQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "http://npm.msxf.com/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/normalize-wheel-es": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/normalize-wheel-es/-/normalize-wheel-es-1.2.0.tgz",
      "integrity": "sha512-Wj7+EJQ8mSuXr2iWfnujrimU35R2W4FAErEyTmJoJ7ucwTn2hOUSsRehMb5RSYkxXGTM7Y9QpvPmp++w5ftoJw==",
      "license": "BSD-3-Clause"
    },
    "node_modules/path-browserify": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/path-browserify/-/path-browserify-1.0.1.tgz",
      "integrity": "sha1-2YRUqcN1PVeQhg8W9ohnueRr4f0=",
      "dev": true
    },
    "node_modules/perfect-debounce": {
      "version": "1.0.0",
      "resolved": "http://npm.msxf.com/perfect-debounce/-/perfect-debounce-1.0.0.tgz",
      "integrity": "sha512-xCy9V055GLEqoFaHoC1SoLIaLmWctgCUaBaWxDZ7/Zx4CTyX7cJQLJOok/orfjZAh9kEYpjJa4d0KcJmCbctZA==",
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "http://npm.msxf.com/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/pinia": {
      "version": "3.0.2",
      "resolved": "http://npm.msxf.com/pinia/-/pinia-3.0.2.tgz",
      "integrity": "sha512-sH2JK3wNY809JOeiiURUR0wehJ9/gd9qFN2Y828jCbxEzKEmEt0pzCXwqiSTfuRsK9vQsOflSdnbdBOGrhtn+g==",
      "license": "MIT",
      "dependencies": {
        "@vue/devtools-api": "^7.7.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/posva"
      },
      "peerDependencies": {
        "typescript": ">=4.4.4",
        "vue": "^2.7.0 || ^3.5.11"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/postcss": {
      "version": "8.5.3",
      "resolved": "http://npm.msxf.com/postcss/-/postcss-8.5.3.tgz",
      "integrity": "sha512-dle9A3yYxlBSrt8Fu+IpjGT8SY8hN0mlaA6GY8t0P5PjIOZemULz/E2Bnm/2dcUOena75OTNkHI76uZBNUUq3A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.8",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha1-4QLxbKNVQkhldV0sno6k8k1Yw+I="
    },
    "node_modules/rfdc": {
      "version": "1.4.1",
      "resolved": "http://npm.msxf.com/rfdc/-/rfdc-1.4.1.tgz",
      "integrity": "sha512-q1b3N5QkRUWUl7iyylaaj3kOpIT0N2i9MqIEQXP73GVsN9cw3fdx8X63cEmWhJGi2PPCF23Ijp7ktmd39rawIA==",
      "license": "MIT"
    },
    "node_modules/rollup": {
      "version": "4.39.0",
      "resolved": "http://npm.msxf.com/rollup/-/rollup-4.39.0.tgz",
      "integrity": "sha512-thI8kNc02yNvnmJp8dr3fNWJ9tCONDhp6TV35X6HkKGGs9E6q7YWCHbe5vKiTa7TAiNcFEmXKj3X/pG2b3ci0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.7"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.39.0",
        "@rollup/rollup-android-arm64": "4.39.0",
        "@rollup/rollup-darwin-arm64": "4.39.0",
        "@rollup/rollup-darwin-x64": "4.39.0",
        "@rollup/rollup-freebsd-arm64": "4.39.0",
        "@rollup/rollup-freebsd-x64": "4.39.0",
        "@rollup/rollup-linux-arm-gnueabihf": "4.39.0",
        "@rollup/rollup-linux-arm-musleabihf": "4.39.0",
        "@rollup/rollup-linux-arm64-gnu": "4.39.0",
        "@rollup/rollup-linux-arm64-musl": "4.39.0",
        "@rollup/rollup-linux-loongarch64-gnu": "4.39.0",
        "@rollup/rollup-linux-powerpc64le-gnu": "4.39.0",
        "@rollup/rollup-linux-riscv64-gnu": "4.39.0",
        "@rollup/rollup-linux-riscv64-musl": "4.39.0",
        "@rollup/rollup-linux-s390x-gnu": "4.39.0",
        "@rollup/rollup-linux-x64-gnu": "4.39.0",
        "@rollup/rollup-linux-x64-musl": "4.39.0",
        "@rollup/rollup-win32-arm64-msvc": "4.39.0",
        "@rollup/rollup-win32-ia32-msvc": "4.39.0",
        "@rollup/rollup-win32-x64-msvc": "4.39.0",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "http://npm.msxf.com/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/speakingurl": {
      "version": "14.0.1",
      "resolved": "http://npm.msxf.com/speakingurl/-/speakingurl-14.0.1.tgz",
      "integrity": "sha512-1POYv7uv2gXoyGFpBCmpDVSNV74IfsWlDW216UPjbWufNf+bSU6GdbDsxdcxtfwb4xlI3yxzOTKClUosxARYrQ==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/superjson": {
      "version": "2.2.2",
      "resolved": "http://npm.msxf.com/superjson/-/superjson-2.2.2.tgz",
      "integrity": "sha512-5JRxVqC8I8NuOUjzBbvVJAKNM8qoVuH0O77h4WInc/qC2q5IreqKxYwgkga3PfA22OayK2ikceb/B26dztPl+Q==",
      "license": "MIT",
      "dependencies": {
        "copy-anything": "^3.0.2"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/typescript": {
      "version": "5.7.3",
      "resolved": "http://npm.msxf.com/typescript/-/typescript-5.7.3.tgz",
      "integrity": "sha512-84MVSjMEHP+FQRPy3pX9sTVV/INIex71s9TL2Gm5FG/WG1SqXeKyZ0k7/blY/4FdOzI12CBy1vGc4og/eus0fw==",
      "devOptional": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "http://npm.msxf.com/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "6.2.5",
      "resolved": "http://npm.msxf.com/vite/-/vite-6.2.5.tgz",
      "integrity": "sha512-j023J/hCAa4pRIUH6J9HemwYfjB5llR2Ps0CWeikOtdR8+pAURAk0DoJC5/mm9kd+UgdnIy7d6HE4EAvlYhPhA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "postcss": "^8.5.3",
        "rollup": "^4.30.1"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vscode-uri": {
      "version": "3.1.0",
      "resolved": "http://npm.msxf.com/vscode-uri/-/vscode-uri-3.1.0.tgz",
      "integrity": "sha512-/BpdSx+yCQGnCvecbyXdxHDkuk55/G3xwnC0GqY4gmQ3j+A+g8kzzgB4Nk/SINjqn6+waqw3EgbVF2QKExkRxQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vue": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/vue/-/vue-3.5.13.tgz",
      "integrity": "sha512-wmeiSMxkZCSc+PM2w2VRsOYAZC8GdipNFRTsLSfodVqI9mbejKeXEGr8SckuLnrQPGe3oJN5c3K0vpoU9q/wCQ==",
      "license": "MIT",
      "dependencies": {
        "@vue/compiler-dom": "3.5.13",
        "@vue/compiler-sfc": "3.5.13",
        "@vue/runtime-dom": "3.5.13",
        "@vue/server-renderer": "3.5.13",
        "@vue/shared": "3.5.13"
      },
      "peerDependencies": {
        "typescript": "*"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/vue-router": {
      "version": "4.5.0",
      "resolved": "http://npm.msxf.com/vue-router/-/vue-router-4.5.0.tgz",
      "integrity": "sha512-HDuk+PuH5monfNuY+ct49mNmkCRK4xJAV9Ts4z9UFc4rzdDnxQLyCMGGc8pKhZhHTVzfanpNwB/lwqevcBwI4w==",
      "license": "MIT",
      "dependencies": {
        "@vue/devtools-api": "^6.6.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/posva"
      },
      "peerDependencies": {
        "vue": "^3.2.0"
      }
    },
    "node_modules/vue-router/node_modules/@vue/devtools-api": {
      "version": "6.6.4",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-api/-/devtools-api-6.6.4.tgz",
      "integrity": "sha512-sGhTPMuXqZ1rVOk32RylztWkfXTRhuS7vgAKv0zjqk8gbsHkJ7xfFf+jbySxt7tWObEJwyKaHMikV/WGDiQm8g==",
      "license": "MIT"
    },
    "node_modules/vue-tsc": {
      "version": "2.2.8",
      "resolved": "http://npm.msxf.com/vue-tsc/-/vue-tsc-2.2.8.tgz",
      "integrity": "sha512-jBYKBNFADTN+L+MdesNX/TB3XuDSyaWynKMDgR+yCSln0GQ9Tfb7JS2lr46s2LiFUT1WsmfWsSvIElyxzOPqcQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@volar/typescript": "~2.4.11",
        "@vue/language-core": "2.2.8"
      },
      "bin": {
        "vue-tsc": "bin/vue-tsc.js"
      },
      "peerDependencies": {
        "typescript": ">=5.0.0"
      }
    }
  },
  "dependencies": {
    "@babel/helper-string-parser": {
      "version": "7.25.9",
      "resolved": "http://npm.msxf.com/@babel%2fhelper-string-parser/-/helper-string-parser-7.25.9.tgz",
      "integrity": "sha512-4A/SCr/2KLd5jrtOMFzaKjVtAei3+2r/NChoBNoZ3EyP/+GlhoaEGoWOZUmFmoITP7zOJyHIMm+DYRd8o3PvHA=="
    },
    "@babel/helper-validator-identifier": {
      "version": "7.25.9",
      "resolved": "http://npm.msxf.com/@babel%2fhelper-validator-identifier/-/helper-validator-identifier-7.25.9.tgz",
      "integrity": "sha512-Ed61U6XJc3CVRfkERJWDz4dJwKe7iLmmJsbOGu9wSloNSFttHV0I8g6UAgb7qnK5ly5bGLPd4oXZlxCdANBOWQ=="
    },
    "@babel/parser": {
      "version": "7.27.0",
      "resolved": "http://npm.msxf.com/@babel%2fparser/-/parser-7.27.0.tgz",
      "integrity": "sha512-iaepho73/2Pz7w2eMS0Q5f83+0RKI7i4xmiYeBmDzfRVbQtTOG7Ts0S4HzJVsTMGI9keU8rNfuZr8DKfSt7Yyg==",
      "requires": {
        "@babel/types": "^7.27.0"
      }
    },
    "@babel/types": {
      "version": "7.27.0",
      "resolved": "http://npm.msxf.com/@babel%2ftypes/-/types-7.27.0.tgz",
      "integrity": "sha512-H45s8fVLYjbhFH62dIJ3WtmJ6RSPt/3DRO0ZcT2SUiYiQyz3BLVb9ADEnLl91m74aQPS3AzzeajZHYOalWe3bg==",
      "requires": {
        "@babel/helper-string-parser": "^7.25.9",
        "@babel/helper-validator-identifier": "^7.25.9"
      }
    },
    "@ctrl/tinycolor": {
      "version": "3.6.1",
      "resolved": "http://npm.msxf.com/@ctrl%2ftinycolor/-/tinycolor-3.6.1.tgz",
      "integrity": "sha512-SITSV6aIXsuVNV3f3O0f2n/cgyEDWoSqtZMYiAmcsYHydcKrOz3gUxB/iXd/Qf08+IZX4KpgNbvUdMBmWz+kcA=="
    },
    "@element-plus/icons-vue": {
      "version": "2.3.1",
      "resolved": "http://npm.msxf.com/@element-plus%2ficons-vue/-/icons-vue-2.3.1.tgz",
      "integrity": "sha512-XxVUZv48RZAd87ucGS48jPf6pKu0yV5UCg9f4FFwtrYxXOwWuVJo6wOvSLKEoMQKjv8GsX/mhP6UsC1lRwbUWg==",
      "requires": {}
    },
    "@esbuild/win32-x64": {
      "version": "0.25.2",
      "resolved": "http://npm.msxf.com/@esbuild%2fwin32-x64/-/win32-x64-0.25.2.tgz",
      "integrity": "sha512-kM3HKb16VIXZyIeVrM1ygYmZBKybX8N4p754bw390wGO3Tf2j4L2/WYL+4suWujpgf6GBYs3jv7TyUivdd05JA=="
    },
    "@floating-ui/core": {
      "version": "1.6.9",
      "resolved": "http://npm.msxf.com/@floating-ui%2fcore/-/core-1.6.9.tgz",
      "integrity": "sha512-uMXCuQ3BItDUbAMhIXw7UPXRfAlOAvZzdK9BWpE60MCn+Svt3aLn9jsPTi/WNGlRUu2uI0v5S7JiIUsbsvh3fw==",
      "requires": {
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "@floating-ui/dom": {
      "version": "1.6.13",
      "resolved": "http://npm.msxf.com/@floating-ui%2fdom/-/dom-1.6.13.tgz",
      "integrity": "sha512-umqzocjDgNRGTuO7Q8CU32dkHkECqI8ZdMZ5Swb6QAM0t5rnlrN3lGo1hdpscRd3WS8T6DKYK4ephgIH9iRh3w==",
      "requires": {
        "@floating-ui/core": "^1.6.0",
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "@floating-ui/utils": {
      "version": "0.2.9",
      "resolved": "http://npm.msxf.com/@floating-ui%2futils/-/utils-0.2.9.tgz",
      "integrity": "sha512-MDWhGtE+eHw5JW7lq4qhc5yRLS11ERl1c7Z6Xd0a58DozHES6EnNNwUWbMiG4J9Cgj053Bhk8zvlhFYKVhULwg=="
    },
    "@jridgewell/sourcemap-codec": {
      "version": "1.5.0",
      "resolved": "http://npm.msxf.com/@jridgewell%2fsourcemap-codec/-/sourcemap-codec-1.5.0.tgz",
      "integrity": "sha512-gv3ZRaISU3fjPAgNsriBRqGWQL6quFx04YMPW/zD8XMLsU32mhCCbfbO6KZFLjvYpCZ8zyDEgqsgf+PwPaM7GQ=="
    },
    "@popperjs/core": {
      "version": "npm:@sxzz/popperjs-es@2.11.7",
      "resolved": "http://npm.msxf.com/@sxzz%2fpopperjs-es/-/popperjs-es-2.11.7.tgz",
      "integrity": "sha512-Ccy0NlLkzr0Ex2FKvh2X+OyERHXJ88XJ1MXtsI9y9fGexlaXaVTPzBCRBwIxFkORuOb+uBqeu+RqnpgYTEZRUQ=="
    },
    "@rollup/rollup-win32-x64-msvc": {
      "version": "4.39.0",
      "resolved": "http://npm.msxf.com/@rollup%2frollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.39.0.tgz",
      "integrity": "sha512-yAkUOkIKZlK5dl7u6dg897doBgLXmUHhIINM2c+sND3DZwnrdQkkSiDh7N75Ll4mM4dxSkYfXqU9fW3lLkMFug==",
      "dev": true,
      "optional": true
    },
    "@types/estree": {
      "version": "1.0.7",
      "resolved": "http://npm.msxf.com/@types%2festree/-/estree-1.0.7.tgz",
      "integrity": "sha512-w28IoSUCJpidD/TGviZwwMJckNESJZXFu7NBZ5YJ4mEUnNraUn9Pm8HSZm/jDF1pDWYKspWE7oVphigUPRakIQ==",
      "dev": true
    },
    "@types/lodash": {
      "version": "4.17.16",
      "resolved": "http://npm.msxf.com/@types%2flodash/-/lodash-4.17.16.tgz",
      "integrity": "sha512-HX7Em5NYQAXKW+1T+FiuG27NGwzJfCX3s1GjOa7ujxZa52kjJLOr4FUxT+giF6Tgxv1e+/czV/iTtBw27WTU9g=="
    },
    "@types/lodash-es": {
      "version": "4.17.12",
      "resolved": "http://npm.msxf.com/@types%2flodash-es/-/lodash-es-4.17.12.tgz",
      "integrity": "sha512-0NgftHUcV4v34VhXm8QBSftKVXtbkBG3ViCjs6+eJ5a6y6Mi/jiFGPc1sC7QK+9BFhWrURE3EOggmWaSxL9OzQ==",
      "requires": {
        "@types/lodash": "*"
      }
    },
    "@types/node": {
      "version": "22.14.0",
      "resolved": "http://npm.msxf.com/@types%2fnode/-/node-22.14.0.tgz",
      "integrity": "sha512-Kmpl+z84ILoG+3T/zQFyAJsU6EPTmOCj8/2+83fSN6djd6I4o7uOuGIH6vq3PrjY5BGitSbFuMN18j3iknubbA==",
      "dev": true,
      "requires": {
        "undici-types": "~6.21.0"
      }
    },
    "@types/web-bluetooth": {
      "version": "0.0.16",
      "resolved": "http://npm.msxf.com/@types%2fweb-bluetooth/-/web-bluetooth-0.0.16.tgz",
      "integrity": "sha512-oh8q2Zc32S6gd/j50GowEjKLoOVOwHP/bWVjKJInBwQqdOYMdPrf1oVlelTlyfFK3CKxL1uahMDAr+vy8T7yMQ=="
    },
    "@vitejs/plugin-vue": {
      "version": "5.2.3",
      "resolved": "http://npm.msxf.com/@vitejs%2fplugin-vue/-/plugin-vue-5.2.3.tgz",
      "integrity": "sha512-IYSLEQj4LgZZuoVpdSUCw3dIynTWQgPlaRP6iAvMle4My0HdYwr5g5wQAfwOeHQBmYwEkqF70nRpSilr6PoUDg==",
      "dev": true,
      "requires": {}
    },
    "@volar/language-core": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2flanguage-core/-/language-core-2.4.12.tgz",
      "integrity": "sha512-RLrFdXEaQBWfSnYGVxvR2WrO6Bub0unkdHYIdC31HzIEqATIuuhRRzYu76iGPZ6OtA4Au1SnW0ZwIqPP217YhA==",
      "dev": true,
      "requires": {
        "@volar/source-map": "2.4.12"
      }
    },
    "@volar/source-map": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2fsource-map/-/source-map-2.4.12.tgz",
      "integrity": "sha512-bUFIKvn2U0AWojOaqf63ER0N/iHIBYZPpNGogfLPQ68F5Eet6FnLlyho7BS0y2HJ1jFhSif7AcuTx1TqsCzRzw==",
      "dev": true
    },
    "@volar/typescript": {
      "version": "2.4.12",
      "resolved": "http://npm.msxf.com/@volar%2ftypescript/-/typescript-2.4.12.tgz",
      "integrity": "sha512-HJB73OTJDgPc80K30wxi3if4fSsZZAOScbj2fcicMuOPoOkcf9NNAINb33o+DzhBdF9xTKC1gnPmIRDous5S0g==",
      "dev": true,
      "requires": {
        "@volar/language-core": "2.4.12",
        "path-browserify": "^1.0.1",
        "vscode-uri": "^3.0.8"
      }
    },
    "@vue/compiler-core": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-core/-/compiler-core-3.5.13.tgz",
      "integrity": "sha512-oOdAkwqUfW1WqpwSYJce06wvt6HljgY3fGeM9NcVA1HaYOij3mZG9Rkysn0OHuyUAGMbEbARIpsG+LPVlBJ5/Q==",
      "requires": {
        "@babel/parser": "^7.25.3",
        "@vue/shared": "3.5.13",
        "entities": "^4.5.0",
        "estree-walker": "^2.0.2",
        "source-map-js": "^1.2.0"
      }
    },
    "@vue/compiler-dom": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-dom/-/compiler-dom-3.5.13.tgz",
      "integrity": "sha512-ZOJ46sMOKUjO3e94wPdCzQ6P1Lx/vhp2RSvfaab88Ajexs0AHeV0uasYhi99WPaogmBlRHNRuly8xV75cNTMDA==",
      "requires": {
        "@vue/compiler-core": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "@vue/compiler-sfc": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-sfc/-/compiler-sfc-3.5.13.tgz",
      "integrity": "sha512-6VdaljMpD82w6c2749Zhf5T9u5uLBWKnVue6XWxprDobftnletJ8+oel7sexFfM3qIxNmVE7LSFGTpv6obNyaQ==",
      "requires": {
        "@babel/parser": "^7.25.3",
        "@vue/compiler-core": "3.5.13",
        "@vue/compiler-dom": "3.5.13",
        "@vue/compiler-ssr": "3.5.13",
        "@vue/shared": "3.5.13",
        "estree-walker": "^2.0.2",
        "magic-string": "^0.30.11",
        "postcss": "^8.4.48",
        "source-map-js": "^1.2.0"
      }
    },
    "@vue/compiler-ssr": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-ssr/-/compiler-ssr-3.5.13.tgz",
      "integrity": "sha512-wMH6vrYHxQl/IybKJagqbquvxpWCuVYpoUJfCqFZwa/JY1GdATAQ+TgVtgrwwMZ0D07QhA99rs/EAAWfvG6KpA==",
      "requires": {
        "@vue/compiler-dom": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "@vue/compiler-vue2": {
      "version": "2.7.16",
      "resolved": "http://npm.msxf.com/@vue%2fcompiler-vue2/-/compiler-vue2-2.7.16.tgz",
      "integrity": "sha512-qYC3Psj9S/mfu9uVi5WvNZIzq+xnXMhOwbTFKKDD7b1lhpnn71jXSFdTQ+WsIEk0ONCd7VV2IMm7ONl6tbQ86A==",
      "dev": true,
      "requires": {
        "de-indent": "^1.0.2",
        "he": "^1.2.0"
      }
    },
    "@vue/devtools-api": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-api/-/devtools-api-7.7.2.tgz",
      "integrity": "sha512-1syn558KhyN+chO5SjlZIwJ8bV/bQ1nOVTG66t2RbG66ZGekyiYNmRO7X9BJCXQqPsFHlnksqvPhce2qpzxFnA==",
      "requires": {
        "@vue/devtools-kit": "^7.7.2"
      }
    },
    "@vue/devtools-kit": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-kit/-/devtools-kit-7.7.2.tgz",
      "integrity": "sha512-CY0I1JH3Z8PECbn6k3TqM1Bk9ASWxeMtTCvZr7vb+CHi+X/QwQm5F1/fPagraamKMAHVfuuCbdcnNg1A4CYVWQ==",
      "requires": {
        "@vue/devtools-shared": "^7.7.2",
        "birpc": "^0.2.19",
        "hookable": "^5.5.3",
        "mitt": "^3.0.1",
        "perfect-debounce": "^1.0.0",
        "speakingurl": "^14.0.1",
        "superjson": "^2.2.1"
      }
    },
    "@vue/devtools-shared": {
      "version": "7.7.2",
      "resolved": "http://npm.msxf.com/@vue%2fdevtools-shared/-/devtools-shared-7.7.2.tgz",
      "integrity": "sha512-uBFxnp8gwW2vD6FrJB8JZLUzVb6PNRG0B0jBnHsOH8uKyva2qINY8PTF5Te4QlTbMDqU5K6qtJDr6cNsKWhbOA==",
      "requires": {
        "rfdc": "^1.4.1"
      }
    },
    "@vue/language-core": {
      "version": "2.2.8",
      "resolved": "http://npm.msxf.com/@vue%2flanguage-core/-/language-core-2.2.8.tgz",
      "integrity": "sha512-rrzB0wPGBvcwaSNRriVWdNAbHQWSf0NlGqgKHK5mEkXpefjUlVRP62u03KvwZpvKVjRnBIQ/Lwre+Mx9N6juUQ==",
      "dev": true,
      "requires": {
        "@volar/language-core": "~2.4.11",
        "@vue/compiler-dom": "^3.5.0",
        "@vue/compiler-vue2": "^2.7.16",
        "@vue/shared": "^3.5.0",
        "alien-signals": "^1.0.3",
        "minimatch": "^9.0.3",
        "muggle-string": "^0.4.1",
        "path-browserify": "^1.0.1"
      }
    },
    "@vue/reactivity": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2freactivity/-/reactivity-3.5.13.tgz",
      "integrity": "sha512-NaCwtw8o48B9I6L1zl2p41OHo/2Z4wqYGGIK1Khu5T7yxrn+ATOixn/Udn2m+6kZKB/J7cuT9DbWWhRxqixACg==",
      "requires": {
        "@vue/shared": "3.5.13"
      }
    },
    "@vue/runtime-core": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fruntime-core/-/runtime-core-3.5.13.tgz",
      "integrity": "sha512-Fj4YRQ3Az0WTZw1sFe+QDb0aXCerigEpw418pw1HBUKFtnQHWzwojaukAs2X/c9DQz4MQ4bsXTGlcpGxU/RCIw==",
      "requires": {
        "@vue/reactivity": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "@vue/runtime-dom": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fruntime-dom/-/runtime-dom-3.5.13.tgz",
      "integrity": "sha512-dLaj94s93NYLqjLiyFzVs9X6dWhTdAlEAciC3Moq7gzAc13VJUdCnjjRurNM6uTLFATRHexHCTu/Xp3eW6yoog==",
      "requires": {
        "@vue/reactivity": "3.5.13",
        "@vue/runtime-core": "3.5.13",
        "@vue/shared": "3.5.13",
        "csstype": "^3.1.3"
      }
    },
    "@vue/server-renderer": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fserver-renderer/-/server-renderer-3.5.13.tgz",
      "integrity": "sha512-wAi4IRJV/2SAW3htkTlB+dHeRmpTiVIK1OGLWV1yeStVSebSQQOwGwIq0D3ZIoBj2C2qpgz5+vX9iEBkTdk5YA==",
      "requires": {
        "@vue/compiler-ssr": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "@vue/shared": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/@vue%2fshared/-/shared-3.5.13.tgz",
      "integrity": "sha512-/hnE/qP5ZoGpol0a5mDi45bOd7t3tjYJBjsgCsivow7D48cJeV5l05RD82lPqi7gRiphZM37rnhW1l6ZoCNNnQ=="
    },
    "@vue/tsconfig": {
      "version": "0.7.0",
      "resolved": "http://npm.msxf.com/@vue%2ftsconfig/-/tsconfig-0.7.0.tgz",
      "integrity": "sha512-ku2uNz5MaZ9IerPPUyOHzyjhXoX2kVJaVf7hL315DC17vS6IiZRmmCPfggNbU16QTvM80+uYYy3eYJB59WCtvg==",
      "dev": true,
      "requires": {}
    },
    "@vueuse/core": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fcore/-/core-9.13.0.tgz",
      "integrity": "sha512-pujnclbeHWxxPRqXWmdkKV5OX4Wk4YeK7wusHqRwU0Q7EFusHoqNA/aPhB6KCh9hEqJkLAJo7bb0Lh9b+OIVzw==",
      "requires": {
        "@types/web-bluetooth": "^0.0.16",
        "@vueuse/metadata": "9.13.0",
        "@vueuse/shared": "9.13.0",
        "vue-demi": "*"
      },
      "dependencies": {
        "vue-demi": {
          "version": "0.14.10",
          "resolved": "http://npm.msxf.com/vue-demi/-/vue-demi-0.14.10.tgz",
          "integrity": "sha512-nMZBOwuzabUO0nLgIcc6rycZEebF6eeUfaiQx9+WSk8e29IbLvPU9feI6tqW4kTo3hvoYAJkMh8n8D0fuISphg==",
          "requires": {}
        }
      }
    },
    "@vueuse/metadata": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fmetadata/-/metadata-9.13.0.tgz",
      "integrity": "sha512-gdU7TKNAUVlXXLbaF+ZCfte8BjRJQWPCa2J55+7/h+yDtzw3vOoGQDRXzI6pyKyo6bXFT5/QoPE4hAknExjRLQ=="
    },
    "@vueuse/shared": {
      "version": "9.13.0",
      "resolved": "http://npm.msxf.com/@vueuse%2fshared/-/shared-9.13.0.tgz",
      "integrity": "sha512-UrnhU+Cnufu4S6JLCPZnkWh0WwZGUp72ktOF2DFptMlOs3TOdVv8xJN53zhHGARmVOsz5KqOls09+J1NR6sBKw==",
      "requires": {
        "vue-demi": "*"
      },
      "dependencies": {
        "vue-demi": {
          "version": "0.14.10",
          "resolved": "http://npm.msxf.com/vue-demi/-/vue-demi-0.14.10.tgz",
          "integrity": "sha512-nMZBOwuzabUO0nLgIcc6rycZEebF6eeUfaiQx9+WSk8e29IbLvPU9feI6tqW4kTo3hvoYAJkMh8n8D0fuISphg==",
          "requires": {}
        }
      }
    },
    "alien-signals": {
      "version": "1.0.13",
      "resolved": "http://npm.msxf.com/alien-signals/-/alien-signals-1.0.13.tgz",
      "integrity": "sha512-OGj9yyTnJEttvzhTUWuscOvtqxq5vrhF7vL9oS0xJ2mK0ItPYP1/y+vCFebfxoEyAz0++1AIwJ5CMr+Fk3nDmg==",
      "dev": true
    },
    "async-validator": {
      "version": "4.2.5",
      "resolved": "http://npm.msxf.com/async-validator/-/async-validator-4.2.5.tgz",
      "integrity": "sha512-7HhHjtERjqlNbZtqNqy2rckN/SpOOlmDliet+lP7k+eKZEjPk3DgyeU9lIXLdeLz0uBbbVp+9Qdow9wJWgwwfg=="
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "http://npm.msxf.com/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
    },
    "axios": {
      "version": "1.8.4",
      "resolved": "http://npm.msxf.com/axios/-/axios-1.8.4.tgz",
      "integrity": "sha512-eBSYY4Y68NNlHbHBMdeDmKNtDgXWhQsJcGqzO3iLUM0GraQFSS9cVgPX5I9b3lbdFKyYoAEGAZF1DwhTaljNAw==",
      "requires": {
        "follow-redirects": "^1.15.6",
        "form-data": "^4.0.0",
        "proxy-from-env": "^1.1.0"
      }
    },
    "balanced-match": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha1-6D46fj8wCzTLnYf2FfoMvzV2kO4=",
      "dev": true
    },
    "birpc": {
      "version": "0.2.19",
      "resolved": "http://npm.msxf.com/birpc/-/birpc-0.2.19.tgz",
      "integrity": "sha512-5WeXXAvTmitV1RqJFppT5QtUiz2p1mRSYU000Jkft5ZUCLJIk4uQriYNO50HknxKwM6jd8utNc66K1qGIwwWBQ=="
    },
    "brace-expansion": {
      "version": "2.0.1",
      "resolved": "http://npm.msxf.com/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha1-HtxFng8MVISG7Pn8mfIiE2S5oK4=",
      "dev": true,
      "requires": {
        "balanced-match": "^1.0.0"
      }
    },
    "call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "requires": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      }
    },
    "combined-stream": {
      "version": "1.0.8",
      "resolved": "http://npm.msxf.com/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "copy-anything": {
      "version": "3.0.5",
      "resolved": "http://npm.msxf.com/copy-anything/-/copy-anything-3.0.5.tgz",
      "integrity": "sha512-yCEafptTtb4bk7GLEQoM8KVJpxAfdBJYaXyzQEgQQQgYrZiDp8SJmGKlYza6CYjEDNstAdNdKA3UuoULlEbS6w==",
      "requires": {
        "is-what": "^4.1.8"
      }
    },
    "csstype": {
      "version": "3.1.3",
      "resolved": "http://npm.msxf.com/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw=="
    },
    "dayjs": {
      "version": "1.11.13",
      "resolved": "http://npm.msxf.com/dayjs/-/dayjs-1.11.13.tgz",
      "integrity": "sha512-oaMBel6gjolK862uaPQOVTA7q3TZhuSvuMQAAglQDOWYO9A91IrAOUJEyKVlqJlHE0vq5p5UXxzdPfMH/x6xNg=="
    },
    "de-indent": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/de-indent/-/de-indent-1.0.2.tgz",
      "integrity": "sha1-sgOOhG3DO6pXlhKNCAS0VbjB4h0=",
      "dev": true
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "http://npm.msxf.com/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
    },
    "dunder-proto": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "requires": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      }
    },
    "element-plus": {
      "version": "2.9.7",
      "resolved": "http://npm.msxf.com/element-plus/-/element-plus-2.9.7.tgz",
      "integrity": "sha512-6vjZh5SXBncLhUwJGTVKS5oDljfgGMh6J4zVTeAZK3YdMUN76FgpvHkwwFXocpJpMbii6rDYU3sgie64FyPerQ==",
      "requires": {
        "@ctrl/tinycolor": "^3.4.1",
        "@element-plus/icons-vue": "^2.3.1",
        "@floating-ui/dom": "^1.0.1",
        "@popperjs/core": "npm:@sxzz/popperjs-es@^2.11.7",
        "@types/lodash": "^4.14.182",
        "@types/lodash-es": "^4.17.6",
        "@vueuse/core": "^9.1.0",
        "async-validator": "^4.2.5",
        "dayjs": "^1.11.13",
        "escape-html": "^1.0.3",
        "lodash": "^4.17.21",
        "lodash-es": "^4.17.21",
        "lodash-unified": "^1.0.2",
        "memoize-one": "^6.0.0",
        "normalize-wheel-es": "^1.2.0"
      }
    },
    "entities": {
      "version": "4.5.0",
      "resolved": "http://npm.msxf.com/entities/-/entities-4.5.0.tgz",
      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw=="
    },
    "es-define-property": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g=="
    },
    "es-errors": {
      "version": "1.3.0",
      "resolved": "http://npm.msxf.com/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw=="
    },
    "es-object-atoms": {
      "version": "1.1.1",
      "resolved": "http://npm.msxf.com/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "requires": {
        "es-errors": "^1.3.0"
      }
    },
    "es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "http://npm.msxf.com/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "requires": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      }
    },
    "esbuild": {
      "version": "0.25.2",
      "resolved": "http://npm.msxf.com/esbuild/-/esbuild-0.25.2.tgz",
      "integrity": "sha512-16854zccKPnC+toMywC+uKNeYSv+/eXkevRAfwRD/G9Cleq66m8XFIrigkbvauLLlCfDL45Q2cWegSg53gGBnQ==",
      "dev": true,
      "requires": {
        "@esbuild/aix-ppc64": "0.25.2",
        "@esbuild/android-arm": "0.25.2",
        "@esbuild/android-arm64": "0.25.2",
        "@esbuild/android-x64": "0.25.2",
        "@esbuild/darwin-arm64": "0.25.2",
        "@esbuild/darwin-x64": "0.25.2",
        "@esbuild/freebsd-arm64": "0.25.2",
        "@esbuild/freebsd-x64": "0.25.2",
        "@esbuild/linux-arm": "0.25.2",
        "@esbuild/linux-arm64": "0.25.2",
        "@esbuild/linux-ia32": "0.25.2",
        "@esbuild/linux-loong64": "0.25.2",
        "@esbuild/linux-mips64el": "0.25.2",
        "@esbuild/linux-ppc64": "0.25.2",
        "@esbuild/linux-riscv64": "0.25.2",
        "@esbuild/linux-s390x": "0.25.2",
        "@esbuild/linux-x64": "0.25.2",
        "@esbuild/netbsd-arm64": "0.25.2",
        "@esbuild/netbsd-x64": "0.25.2",
        "@esbuild/openbsd-arm64": "0.25.2",
        "@esbuild/openbsd-x64": "0.25.2",
        "@esbuild/sunos-x64": "0.25.2",
        "@esbuild/win32-arm64": "0.25.2",
        "@esbuild/win32-ia32": "0.25.2",
        "@esbuild/win32-x64": "0.25.2"
      }
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "http://npm.msxf.com/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg="
    },
    "estree-walker": {
      "version": "2.0.2",
      "resolved": "http://npm.msxf.com/estree-walker/-/estree-walker-2.0.2.tgz",
      "integrity": "sha1-UvAQF4wqTBF6d1fP6UKtt9LaTKw="
    },
    "follow-redirects": {
      "version": "1.15.9",
      "resolved": "http://npm.msxf.com/follow-redirects/-/follow-redirects-1.15.9.tgz",
      "integrity": "sha512-gew4GsXizNgdoRyqmyfMHyAmXsZDk6mHkSxZFCzW9gwlbtOW44CDtYavM+y+72qD/Vq2l550kMF52DT8fOLJqQ=="
    },
    "form-data": {
      "version": "4.0.2",
      "resolved": "http://npm.msxf.com/form-data/-/form-data-4.0.2.tgz",
      "integrity": "sha512-hGfm/slu0ZabnNt4oaRZ6uREyfCj6P4fT/n6A1rGV+Z0VdGXjfOhVUpkn6qVQONHGIFwmveGXyDs75+nr6FM8w==",
      "requires": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "mime-types": "^2.1.12"
      }
    },
    "function-bind": {
      "version": "1.1.2",
      "resolved": "http://npm.msxf.com/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA=="
    },
    "get-intrinsic": {
      "version": "1.3.0",
      "resolved": "http://npm.msxf.com/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "requires": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      }
    },
    "get-proto": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "requires": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      }
    },
    "gopd": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg=="
    },
    "has-symbols": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ=="
    },
    "has-tostringtag": {
      "version": "1.0.2",
      "resolved": "http://npm.msxf.com/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "requires": {
        "has-symbols": "^1.0.3"
      }
    },
    "hasown": {
      "version": "2.0.2",
      "resolved": "http://npm.msxf.com/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "requires": {
        "function-bind": "^1.1.2"
      }
    },
    "he": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/he/-/he-1.2.0.tgz",
      "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
      "dev": true
    },
    "hookable": {
      "version": "5.5.3",
      "resolved": "http://npm.msxf.com/hookable/-/hookable-5.5.3.tgz",
      "integrity": "sha512-Yc+BQe8SvoXH1643Qez1zqLRmbA5rCL+sSmk6TVos0LWVfNIB7PGncdlId77WzLGSIB5KaWgTaNTs2lNVEI6VQ=="
    },
    "is-what": {
      "version": "4.1.16",
      "resolved": "http://npm.msxf.com/is-what/-/is-what-4.1.16.tgz",
      "integrity": "sha512-ZhMwEosbFJkA0YhFnNDgTM4ZxDRsS6HqTo7qsZM08fehyRYIYa0yHu5R6mgo1n/8MgaPBXiPimPD77baVFYg+A=="
    },
    "lodash": {
      "version": "4.17.21",
      "resolved": "http://npm.msxf.com/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha1-Z5WRxWTDv/quhFTPCz3zcMPWkRw="
    },
    "lodash-es": {
      "version": "4.17.21",
      "resolved": "http://npm.msxf.com/lodash-es/-/lodash-es-4.17.21.tgz",
      "integrity": "sha1-Q+YmxG5lkbd1C+srUBFzkMYJ4+4="
    },
    "lodash-unified": {
      "version": "1.0.3",
      "resolved": "http://npm.msxf.com/lodash-unified/-/lodash-unified-1.0.3.tgz",
      "integrity": "sha512-WK9qSozxXOD7ZJQlpSqOT+om2ZfcT4yO+03FuzAHD0wF6S0l0090LRPDx3vhTTLZ8cFKpBn+IOcVXK6qOcIlfQ==",
      "requires": {}
    },
    "magic-string": {
      "version": "0.30.17",
      "resolved": "http://npm.msxf.com/magic-string/-/magic-string-0.30.17.tgz",
      "integrity": "sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==",
      "requires": {
        "@jridgewell/sourcemap-codec": "^1.5.0"
      }
    },
    "marked": {
      "version": "15.0.10",
      "resolved": "http://npm.msxf.com/marked/-/marked-15.0.10.tgz",
      "integrity": "sha512-BXzsfFiR2UqXFKRwpugWuCYi9mWd1aX/Yns/X52xWfvfen9lnGEDbJw9ZEjjvLZVqntqT2gX45eYvqb2dIokDw=="
    },
    "math-intrinsics": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g=="
    },
    "memoize-one": {
      "version": "6.0.0",
      "resolved": "http://npm.msxf.com/memoize-one/-/memoize-one-6.0.0.tgz",
      "integrity": "sha512-rkpe71W0N0c0Xz6QD0eJETuWAJGnJ9afsl1srmwPrI+yBCkge5EycXXbYRyvL29zZVUWQCY7InPRCv3GDXuZNw=="
    },
    "mime-db": {
      "version": "1.52.0",
      "resolved": "http://npm.msxf.com/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg=="
    },
    "mime-types": {
      "version": "2.1.35",
      "resolved": "http://npm.msxf.com/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "requires": {
        "mime-db": "1.52.0"
      }
    },
    "minimatch": {
      "version": "9.0.5",
      "resolved": "http://npm.msxf.com/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "requires": {
        "brace-expansion": "^2.0.1"
      }
    },
    "mitt": {
      "version": "3.0.1",
      "resolved": "http://npm.msxf.com/mitt/-/mitt-3.0.1.tgz",
      "integrity": "sha512-vKivATfr97l2/QBCYAkXYDbrIWPM2IIKEl7YPhjCvKlG3kE2gm+uBo6nEXK3M5/Ffh/FLpKExzOQ3JJoJGFKBw=="
    },
    "muggle-string": {
      "version": "0.4.1",
      "resolved": "http://npm.msxf.com/muggle-string/-/muggle-string-0.4.1.tgz",
      "integrity": "sha512-VNTrAak/KhO2i8dqqnqnAHOa3cYBwXEZe9h+D5h/1ZqFSTEFHdM65lR7RoIqq3tBBYavsOXV84NoHXZ0AkPyqQ==",
      "dev": true
    },
    "nanoid": {
      "version": "3.3.11",
      "resolved": "http://npm.msxf.com/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w=="
    },
    "normalize-wheel-es": {
      "version": "1.2.0",
      "resolved": "http://npm.msxf.com/normalize-wheel-es/-/normalize-wheel-es-1.2.0.tgz",
      "integrity": "sha512-Wj7+EJQ8mSuXr2iWfnujrimU35R2W4FAErEyTmJoJ7ucwTn2hOUSsRehMb5RSYkxXGTM7Y9QpvPmp++w5ftoJw=="
    },
    "path-browserify": {
      "version": "1.0.1",
      "resolved": "http://npm.msxf.com/path-browserify/-/path-browserify-1.0.1.tgz",
      "integrity": "sha1-2YRUqcN1PVeQhg8W9ohnueRr4f0=",
      "dev": true
    },
    "perfect-debounce": {
      "version": "1.0.0",
      "resolved": "http://npm.msxf.com/perfect-debounce/-/perfect-debounce-1.0.0.tgz",
      "integrity": "sha512-xCy9V055GLEqoFaHoC1SoLIaLmWctgCUaBaWxDZ7/Zx4CTyX7cJQLJOok/orfjZAh9kEYpjJa4d0KcJmCbctZA=="
    },
    "picocolors": {
      "version": "1.1.1",
      "resolved": "http://npm.msxf.com/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA=="
    },
    "pinia": {
      "version": "3.0.2",
      "resolved": "http://npm.msxf.com/pinia/-/pinia-3.0.2.tgz",
      "integrity": "sha512-sH2JK3wNY809JOeiiURUR0wehJ9/gd9qFN2Y828jCbxEzKEmEt0pzCXwqiSTfuRsK9vQsOflSdnbdBOGrhtn+g==",
      "requires": {
        "@vue/devtools-api": "^7.7.2"
      }
    },
    "postcss": {
      "version": "8.5.3",
      "resolved": "http://npm.msxf.com/postcss/-/postcss-8.5.3.tgz",
      "integrity": "sha512-dle9A3yYxlBSrt8Fu+IpjGT8SY8hN0mlaA6GY8t0P5PjIOZemULz/E2Bnm/2dcUOena75OTNkHI76uZBNUUq3A==",
      "requires": {
        "nanoid": "^3.3.8",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      }
    },
    "proxy-from-env": {
      "version": "1.1.0",
      "resolved": "http://npm.msxf.com/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha1-4QLxbKNVQkhldV0sno6k8k1Yw+I="
    },
    "rfdc": {
      "version": "1.4.1",
      "resolved": "http://npm.msxf.com/rfdc/-/rfdc-1.4.1.tgz",
      "integrity": "sha512-q1b3N5QkRUWUl7iyylaaj3kOpIT0N2i9MqIEQXP73GVsN9cw3fdx8X63cEmWhJGi2PPCF23Ijp7ktmd39rawIA=="
    },
    "rollup": {
      "version": "4.39.0",
      "resolved": "http://npm.msxf.com/rollup/-/rollup-4.39.0.tgz",
      "integrity": "sha512-thI8kNc02yNvnmJp8dr3fNWJ9tCONDhp6TV35X6HkKGGs9E6q7YWCHbe5vKiTa7TAiNcFEmXKj3X/pG2b3ci0g==",
      "dev": true,
      "requires": {
        "@rollup/rollup-android-arm-eabi": "4.39.0",
        "@rollup/rollup-android-arm64": "4.39.0",
        "@rollup/rollup-darwin-arm64": "4.39.0",
        "@rollup/rollup-darwin-x64": "4.39.0",
        "@rollup/rollup-freebsd-arm64": "4.39.0",
        "@rollup/rollup-freebsd-x64": "4.39.0",
        "@rollup/rollup-linux-arm-gnueabihf": "4.39.0",
        "@rollup/rollup-linux-arm-musleabihf": "4.39.0",
        "@rollup/rollup-linux-arm64-gnu": "4.39.0",
        "@rollup/rollup-linux-arm64-musl": "4.39.0",
        "@rollup/rollup-linux-loongarch64-gnu": "4.39.0",
        "@rollup/rollup-linux-powerpc64le-gnu": "4.39.0",
        "@rollup/rollup-linux-riscv64-gnu": "4.39.0",
        "@rollup/rollup-linux-riscv64-musl": "4.39.0",
        "@rollup/rollup-linux-s390x-gnu": "4.39.0",
        "@rollup/rollup-linux-x64-gnu": "4.39.0",
        "@rollup/rollup-linux-x64-musl": "4.39.0",
        "@rollup/rollup-win32-arm64-msvc": "4.39.0",
        "@rollup/rollup-win32-ia32-msvc": "4.39.0",
        "@rollup/rollup-win32-x64-msvc": "4.39.0",
        "@types/estree": "1.0.7",
        "fsevents": "~2.3.2"
      }
    },
    "source-map-js": {
      "version": "1.2.1",
      "resolved": "http://npm.msxf.com/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA=="
    },
    "speakingurl": {
      "version": "14.0.1",
      "resolved": "http://npm.msxf.com/speakingurl/-/speakingurl-14.0.1.tgz",
      "integrity": "sha512-1POYv7uv2gXoyGFpBCmpDVSNV74IfsWlDW216UPjbWufNf+bSU6GdbDsxdcxtfwb4xlI3yxzOTKClUosxARYrQ=="
    },
    "superjson": {
      "version": "2.2.2",
      "resolved": "http://npm.msxf.com/superjson/-/superjson-2.2.2.tgz",
      "integrity": "sha512-5JRxVqC8I8NuOUjzBbvVJAKNM8qoVuH0O77h4WInc/qC2q5IreqKxYwgkga3PfA22OayK2ikceb/B26dztPl+Q==",
      "requires": {
        "copy-anything": "^3.0.2"
      }
    },
    "typescript": {
      "version": "5.7.3",
      "resolved": "http://npm.msxf.com/typescript/-/typescript-5.7.3.tgz",
      "integrity": "sha512-84MVSjMEHP+FQRPy3pX9sTVV/INIex71s9TL2Gm5FG/WG1SqXeKyZ0k7/blY/4FdOzI12CBy1vGc4og/eus0fw==",
      "devOptional": true
    },
    "undici-types": {
      "version": "6.21.0",
      "resolved": "http://npm.msxf.com/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true
    },
    "vite": {
      "version": "6.2.5",
      "resolved": "http://npm.msxf.com/vite/-/vite-6.2.5.tgz",
      "integrity": "sha512-j023J/hCAa4pRIUH6J9HemwYfjB5llR2Ps0CWeikOtdR8+pAURAk0DoJC5/mm9kd+UgdnIy7d6HE4EAvlYhPhA==",
      "dev": true,
      "requires": {
        "esbuild": "^0.25.0",
        "fsevents": "~2.3.3",
        "postcss": "^8.5.3",
        "rollup": "^4.30.1"
      }
    },
    "vscode-uri": {
      "version": "3.1.0",
      "resolved": "http://npm.msxf.com/vscode-uri/-/vscode-uri-3.1.0.tgz",
      "integrity": "sha512-/BpdSx+yCQGnCvecbyXdxHDkuk55/G3xwnC0GqY4gmQ3j+A+g8kzzgB4Nk/SINjqn6+waqw3EgbVF2QKExkRxQ==",
      "dev": true
    },
    "vue": {
      "version": "3.5.13",
      "resolved": "http://npm.msxf.com/vue/-/vue-3.5.13.tgz",
      "integrity": "sha512-wmeiSMxkZCSc+PM2w2VRsOYAZC8GdipNFRTsLSfodVqI9mbejKeXEGr8SckuLnrQPGe3oJN5c3K0vpoU9q/wCQ==",
      "requires": {
        "@vue/compiler-dom": "3.5.13",
        "@vue/compiler-sfc": "3.5.13",
        "@vue/runtime-dom": "3.5.13",
        "@vue/server-renderer": "3.5.13",
        "@vue/shared": "3.5.13"
      }
    },
    "vue-router": {
      "version": "4.5.0",
      "resolved": "http://npm.msxf.com/vue-router/-/vue-router-4.5.0.tgz",
      "integrity": "sha512-HDuk+PuH5monfNuY+ct49mNmkCRK4xJAV9Ts4z9UFc4rzdDnxQLyCMGGc8pKhZhHTVzfanpNwB/lwqevcBwI4w==",
      "requires": {
        "@vue/devtools-api": "^6.6.4"
      },
      "dependencies": {
        "@vue/devtools-api": {
          "version": "6.6.4",
          "resolved": "http://npm.msxf.com/@vue%2fdevtools-api/-/devtools-api-6.6.4.tgz",
          "integrity": "sha512-sGhTPMuXqZ1rVOk32RylztWkfXTRhuS7vgAKv0zjqk8gbsHkJ7xfFf+jbySxt7tWObEJwyKaHMikV/WGDiQm8g=="
        }
      }
    },
    "vue-tsc": {
      "version": "2.2.8",
      "resolved": "http://npm.msxf.com/vue-tsc/-/vue-tsc-2.2.8.tgz",
      "integrity": "sha512-jBYKBNFADTN+L+MdesNX/TB3XuDSyaWynKMDgR+yCSln0GQ9Tfb7JS2lr46s2LiFUT1WsmfWsSvIElyxzOPqcQ==",
      "dev": true,
      "requires": {
        "@volar/typescript": "~2.4.11",
        "@vue/language-core": "2.2.8"
      }
    }
  }
}
```

```
// package.json
{
  "name": "my-vue-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --mode development",
    "build": "vue-tsc -b && vite build --mode production",
    "preview": "vite preview"
  },
  "dependencies": {
    "@esbuild/win32-x64": "^0.25.2",
    "axios": "^1.8.4",
    "element-plus": "^2.9.7",
    "marked": "^15.0.10",
    "pinia": "^3.0.2",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/tsconfig": "^0.7.0",
    "typescript": "~5.7.2",
    "vite": "^6.2.0",
    "vue-tsc": "^2.2.4"
  }
}
```

```
// about.vue文件

<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 10:55:09
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-11 17:52:04
 * @FilePath: \my-vue-app\src\views\about.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h1>这是关于页！</h1>
    <button @click="to">前往</button>
  </div>
</template>
<script setup lang="ts">
import { router } from "@/router";

function to() {
  router.push("/");
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
```

```
// index.vue文件
<template>
  <div>
    <h1>这是主页！</h1>
    <el-button @click="to">前往</el-button>
    <el-button @click="getArticleList">获取</el-button>
    <el-button @click="get">测试pinia</el-button>

    <button @click="fetchSSE">发送</button>
    <button @click="pause" style="color: red; margin-left: 30px">停止</button>
    <div class="markdown-container" v-html="renderedContent"></div>
  </div>
</template>
<script setup lang="ts">
import { getArticleApi } from "@/api/test/test";
import { HotArticleQuery, HotArticleVo } from "@/api/test/types";
import { Page } from "@/api/page";
import { router } from "@/router";
import { useUsersStore } from "@/store/user";
import { reactive, ref } from "vue";
import { marked } from "marked";

console.log(import.meta.env.VITE_BASE_URL);

const query = reactive<HotArticleQuery>({
  pageIndex: 1,
  pageSize: 10,
  searchKey: "",
});

const articleData = ref<Page<HotArticleVo>>();

// 获取接口数据
function getArticleList() {
  getArticleApi(query).then((res) => {
    articleData.value = res.data;
    console.log(articleData.value.records);
    console.log(articleData.value.total);
  });
}

// 跳转
function to() {
  router.push("/about");
}

function get() {
  const store = useUsersStore();
  console.log(1, store);
  // 或者
  const { uid, username, exp } = useUsersStore();
  console.log(2, uid);
  console.log(3, username);
  console.log(4, exp);
  console.log(5, store.addExp);
  console.log(6, store.addExpCustom(180));
  store.showParam("test");

  // 修改
  store.exp = 200;
  // 重置
  store.$reset();
  console.log(store);
}

// 监听SSE消息
// let count = ref("");
// const sse = new EventSource("http://localhost:8081/sse");
// sse.addEventListener("message", (e) => {
//   console.log("---数据", e.data);
//   count.value += e.data + " ";
//   //页面渲染
// });

const rawContent = ref("");
const renderedContent: any = ref("");
const controller = new AbortController();
// 配置Markdown解析

// 解析Markdown内容
const parseMarkdown = (raw: any) => {
  return marked.parse(raw);
};

async function fetchSSE() {
  //请求地址
  let url = "http://localhost:8081/sse";
  let data = { userId: 123, content: "介绍一下vue3", date: "XXXXX" };
  const response: any = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(data),
    signal: controller.signal,
  }).catch((err) => {
    console.log("err报错了", err);
  });
  // 获取 ReadableStream 并创建读取器
  const reader = response.body.getReader();
  //创建解码器
  const decoder = new TextDecoder();
  // 持续读取流数据
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    } // 流结束
    const chunk = decoder.decode(value);
    const events = chunk.split("\n\n"); // SSE 事件以双换行分隔
    for (const event of events) {
      if (event.trim() === "") continue;
      parseSSEEvent(event);
    }
  }
}

function pause() {
  controller.abort();
}

// 解析单个 SSE 事件
function parseSSEEvent(event: any) {
  const lines = event;
  let dataObj = JSON.parse(lines.split(": ")[1]);
  //dtaObj里面为信息对象{text:XXX}
  rawContent.value += dataObj.text;
  //解析语法
  renderedContent.value = parseMarkdown(rawContent.value);
}
</script>

<style scoped>
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}
</style>

```

```
// .env.development
# VITE_USER_NODE_ENV=dev
NODE_ENV=development
VITE_PARAM=development
VITE_BASE_URL="http://localhost:8081/v1/api"

// .env.production
###
 # @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 # @Date: 2025-04-14 10:21:00
 # @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 # @LastEditTime: 2025-04-15 10:56:10
 # @FilePath: \my-vue-app\.vscode\.env.production
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
VITE_USER_NODE_ENV=production
VITE_PARAM=production
VITE_BASE_URL='https://api.example.com/v1/api'
```

```
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-09 16:03:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-10 18:10:19
 * @FilePath: \my-vue-app\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // 基本路径
  base: '/',
  plugins: [
    vue()
  ],
  resolve: {
    // src 别名配置
    alias: {
      "@": resolve(__dirname, 'src'),
    },
    // 使用路径别名时想要省略的后缀名，可以自己增减
    extensions: ['.js', '.json', '.ts'] 
  },
  server: {
    // 端口号
    port: 8080,
    // 监听所有地址
    host: '0.0.0.0',
    // 服务启动时是否自动打开浏览器
    open: true,
    // 允许跨域
    cors: true,
    // 自定义代理规则
    proxy: {},
  },
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
  },
})
```

server-express

```
// test
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8081;
const cors = require("cors");

// 允许跨域
app.use(cors());
// 发送文件内容的分块逻辑
function sendFileChunks(res, fileContent) {
  let index = 0;
  const sendChunk = () => {
    if (index >= fileContent.length) {
      //  res.write('event: end\ndata: \n\n'); // 发送结束事件
      res.end();
      return;
    }
    // 随机生成 3-5 的块大小
    const chunkSize = 3 + Math.floor(Math.random() * 3);
    const chunk = fileContent.slice(index, index + chunkSize);
    // SSE 格式要求
    res.write(`data: ${JSON.stringify({ text: chunk })}\n`);
    index += chunkSize;
    // 随机间隔发送（模拟实时效果）
    setTimeout(sendChunk, 50 + Math.random() * 50);
  };

  sendChunk();
}

app.post("/sse", (req, res) => {
  try {
    //SSE需要
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    //读取同同级下的b.txt（里面存放着markdown格式的文档）
    const fileContent = fs.readFileSync("./b.txt", "utf-8");
    //分块发送
    sendFileChunks(res, fileContent);
    // 处理连接关闭
    req.on("close", () => {
      console.log("Client disconnected");
      res.end();
    });
  } catch (error) {
    console.log("event: error\ndata: File not found\n\n");
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
