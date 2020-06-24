# Electronic Plex ![Build Release Assets](https://github.com/tabjy/electronic-plex/workflows/Build%20Release%20Assets/badge.svg)

an electron wrapper turning your Plex media player into a desktop application

## Overview

The main purpose of this project is to get Plex working with [MPRIS D-Bus Interface](https://specifications.freedesktop.org/mpris-spec/2.2/), along with other useful desktop environment integrations.

## Getting Started

You can obtain a build by downloading a prebuilt release or building from source.

### [Option 1] Using a Prebuilt Releases

Download a prebuilt release from the [release page](https://github.com/tabjy/electronic-plex/releases).

### [Option 2] Building from Source

- Clone this repository to local.
  ```sh
  $ git clone https://github.com/tabjy/electronic-plex.git
  ```
- Install dependencies.
  ```sh
  $ cd prometheus-jfr-exporter
  $ npm install
  ```
- Build a release targeted to your current platform with [electron-packager](https://github.com/electron/electron-packager)
  ```sh
  $ npm run build
  ```
- (Optionally) copy `dist/electronic-plex-<platform>-<arch>` to your local installation, and set up `$PATH` to include `electronic-plex` executable.

## License

This project is licensed under the [MIT License](./LICENSE).
