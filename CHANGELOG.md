# Change Log

## v0.3.0 / 2026-11-17
### Added
- Support for byte `Array`, `Uint8Array`, `ArrayBuffer` and other `ArrayBuffer` views (e.g. `DataView`) input.
- `create` and `update` methods for hashing data incrementally.
- `hex`, `array`, `digest` and `arrayBuffer` output methods.
- ESM builds and package `exports`.
- TypeScript interfaces.
- Support for web worker.

### Fixed
- Infinite loop when a string ends with an unpaired UTF-16 surrogate.
- Infinite loop for non-string input.
- Incorrect hash for strings with unpaired UTF-16 surrogates; they are now encoded as U+FFFD, the same as `TextEncoder`.
- Detect browsers with a `process` polyfill (e.g. BrowserFS) and Electron renderers as non-Node.js environments.

### Changed
- Throw an error for invalid input types and for `update` after finalize.
- Replace Travis CI with GitHub Actions.
- Update dev dependencies and fix security issues.

## v0.2.2 / 2017-02-08
### Fixed
- `root` is undefined in some special environment.

## v0.2.1 / 2015-04-03
### Added
- support AMD.

## v0.2.0 / 2015-02-28
### Added
- test cases.

### Removed
- ascii parameter.

### Improved
- performance.

## v0.1.2 / 2015-01-07
### Added
-  bower package.
- travis.
- coveralls.

### Fixed
- JSHint warnings.

## v0.1.1 / 2014-07-27
### Fixed
- accents bug

## v0.1.0 / 2014-01-05
### Added
- initial release.
