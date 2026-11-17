# Maintaining this repository

Notes for Sciospec maintainers. Customers do not need this file.

## Structure

```
index.html        overview page with the list of devices
assets/           shared styles of the overview page
<device>/         one folder per device, entry page <device>/index.html
.nojekyll         GitHub Pages serves the files unchanged
```

GitHub Pages publishes the `main` branch (root folder) to https://sciospec.github.io/cominterface/.

## Versions

The published pages always show the current ComInterface version of each device.
Each version is kept as a Git tag `<device>-v<version>` (e.g. `device-name-v1.0`).

## Adding or updating a device

1. Generate the HTML from the internal documentation.
2. Copy the output into the device folder (lower case, no spaces, e.g. `device-name/`).
   The entry page must be `index.html`; all links must be relative.
3. For a new device, add an entry to the list in the root `index.html`:
   `<li><a href="device-name/">Device Name</a></li>`
4. Open `index.html` locally in a browser and check the links.
5. Commit, tag the new ComInterface version (`git tag <device>-v<version>`), push with tags.
