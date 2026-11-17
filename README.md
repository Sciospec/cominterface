# Sciospec ComInterface Documentation

Documentation of the ComInterface of Sciospec devices.

**Read online:** https://sciospec.github.io/cominterface/

## Structure

```
index.html        overview page with the list of devices
assets/           shared styles of the overview page
<device>/         one folder per device, entry page <device>/index.html
.nojekyll         GitHub Pages serves the files unchanged
```

## Versions

The published pages always show the current ComInterface version of each device.
Earlier versions are kept as Git tags (`<device>-v<version>`, e.g. `device-name-v1.0`)
and can be downloaded as ZIP from the tag or release page.

## Adding or updating a device (maintainers)

1. Generate the HTML from the internal documentation.
2. Copy the output into the device folder (lower case, no spaces, e.g. `device-name/`).
   The entry page must be `index.html`; all links must be relative.
3. For a new device, add an entry to the list in the root `index.html`.
4. Open `index.html` locally in a browser and check the links.
5. Commit, tag the new ComInterface version (`git tag <device>-v<version>`), push with tags.
