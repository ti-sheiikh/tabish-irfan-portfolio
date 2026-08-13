# Revorix Engineering — GitHub Pages Deployment Guide

This package is intentionally **plain HTML/CSS/JavaScript**. There is no npm build step, no framework runtime, and no database. GitHub Pages can serve the files directly.

## Recommended path: keep the existing GitHub Pages repository

Your existing repository is:

`https://github.com/ti-sheiikh/tabish-irfan-portfolio`

Your existing custom domain is:

`obsoletepcb.solutions`

The included `CNAME` file already contains that domain.

### 1. Make a backup of the current website

Open CMD in a convenient folder:

```cmd
git clone https://github.com/ti-sheiikh/tabish-irfan-portfolio.git
cd tabish-irfan-portfolio
git checkout -b backup-before-revorix
git push -u origin backup-before-revorix
git checkout main
```

If the repository is already cloned on your PC, use that existing folder and run `git pull` first instead of cloning again.

### 2. Copy the new website into the repository

Extract this ZIP somewhere. Copy **all files and folders inside `revorix-engineering-website`** into the root of `tabish-irfan-portfolio`. Allow Windows to replace files with the same name.

For the first launch, it is safe to leave old unused folders such as `src`, `scripts`, old `css`, old `js`, `package.json`, and `package-lock.json`. The new site does not reference them. Once the new site is verified online, you may remove those unused legacy files in a later cleanup commit.

### 3. Test locally before publishing

From inside the repository folder:

```cmd
python -m http.server 8080
```

Open:

`http://localhost:8080`

Check Home, Services, Portfolio, Reviews, About, Contact, and the four service pages.

Stop the preview with `Ctrl+C`.

### 4. Commit and push

```cmd
git status
git add -A
git commit -m "Launch Revorix Engineering multi-page website"
git push origin main
```

You can also run `publish.cmd` **after** the files are inside the existing Git repository.

### 5. Verify GitHub Pages settings

On GitHub:

1. Open `ti-sheiikh/tabish-irfan-portfolio`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Save.
6. Under **Custom domain**, keep `obsoletepcb.solutions`.
7. Enable **Enforce HTTPS** when available.

Because the current website already works on the same domain, **do not change GoDaddy DNS unless GitHub reports a DNS check problem**.

### 6. If DNS ever needs to be rebuilt

For the apex/root domain `obsoletepcb.solutions`, GitHub Pages currently documents these A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www`, use a CNAME pointing to:

```text
ti-sheiikh.github.io
```

Do not include the repository name in that CNAME target.

### 7. Verify after deployment

Open:

- https://revorixengineering.com
- https://revorixengineering.com/services.html
- https://revorixengineering.com/portfolio.html

In CMD you can also use:

```cmd
nslookup obsoletepcb.solutions
curl -I https://revorixengineering.com
```

## Should we leave GitHub Pages?

Not for this version. A static engineering portfolio is an excellent fit for branch-based GitHub Pages: it is fast, cacheable, has no runtime dependencies, and your domain is already connected. Moving to Cloudflare Pages, Netlify, or another static host is optional later if you want deployment previews, server-side forms, analytics, or more advanced edge features. The same static site can be moved with very little code change.
