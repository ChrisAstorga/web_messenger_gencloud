# Epiroc Genesys Cloud Web Messenger site

A responsive static landing page for the Epiroc virtual assistant, ready for GitHub Pages.

## Files

- `index.html`: page structure and Genesys Cloud deployment bootstrap
- `styles.css`: responsive visual design
- `app.js`: chat launch button behavior and current year
- `assets/`: supplied Epiroc brand images

## Test locally

Because the page is static, you can open `index.html` directly. For a more realistic local test, run a small local web server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Open the repository's **Settings**.
4. Select **Pages** under **Code and automation**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder, then save.
7. GitHub will display the public Pages URL after deployment.

## Important Genesys Cloud checks

The page currently uses:

- Region/environment: `prod-euc1`
- Deployment ID: `5c1259bf-f83f-48c9-bcd2-876dff539b76`
- Bootstrap: `https://apps.mypurecloud.de/genesys-bootstrap/genesys.min.js`

Before testing on GitHub Pages, add the GitHub Pages domain to the Genesys Cloud Messenger deployment's allowed domains. Depending on your configuration, examples may include:

- `https://YOUR-USERNAME.github.io`
- `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

Use the exact domain or origin format required by the deployment configuration. Do not add an unrestricted wildcard unless your security policy explicitly permits it.

## Customization

Update the page copy in `index.html` and visual tokens at the top of `styles.css`. If the Genesys deployment changes, replace the `environment` and `deploymentId` values in `index.html`.

## Custom chat launcher

The page includes its own fixed lower-right chat button. It subscribes to `Messenger.ready` and becomes active after the Genesys Messenger UI has initialized. This works even when the native launcher visibility is disabled in the Messenger configuration.
