# ⚡ Cypress Cloud Parallel Testing Project

**Project Overview:**  
This project demonstrates **cross-browser automation** using **Cypress 15.3.0** with **Cypress Cloud**. Tests are executed in **Chrome, Firefox, and Edge** simultaneously using **parallel jobs**, and results are combined into a **single report** for easy viewing.  

---

## 🧩 Why This Project?

- 🌐 **Cross-browser testing:** Run the same tests on Chrome, Firefox, and Edge.  
- ⚡ **Parallel execution:** Run multiple jobs simultaneously for faster results.  
- 📊 **Mochawesome reports:** JSON and HTML reports merged from all browsers.  

---

## 🗂️ Project Structure
## 🌐 Cross-Browser Testing

- Each browser runs in its **own job** in GitHub Actions.  
- Cypress Cloud handles **parallel execution**.  
- Using `--group "<browser>"` ensures each browser has a **separate parallelization pool**.  
- Dashboard records **results per browser**.  

---

## ⚡ Parallel Testing

- Multiple jobs run **at the same time**.  
- Example: Chrome, Firefox, and Edge run **simultaneously**, not sequentially.  
- Reduces total test execution time.  

---

## 🛠️ Workflow Steps

1. ✅ Checkout repository  
2. ✅ Setup Node.js  
3. ✅ Install dependencies (`npm ci`)  
4. ✅ Run Cypress tests for each browser  
5. ✅ Upload reports as **artifacts**  
6. ✅ Merge reports into `cypress/reports/mochawesome-merged/report.json`  
7. ✅ Generate final HTML report  

---

## 📝 Commands (Optional Local Run)

```bash
# Run tests locally
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```
**Note:** Parallel execution works fully only in Cypress Cloud with `--record --key <PROJECT_KEY>`.

## 📊 Reports
Individual browser JSON reports:

```swift
cypress/reports/mochawesome/<browser>/
```
Merged HTML report:

```bash
cypress/reports/mochawesome-merged/index.html
```
Open `index.html` in a browser to see combined results.

## 🎯 Key Features
- 🌐 Cross-browser: Chrome, Firefox, Edge
- ⚡ Parallel execution in Cypress Cloud
- 📊 Centralized reporting with Mochawesome
- 🤖 Automated via GitHub Actions
- 🛠️ Easy to extend with more specs/browsers

---

## 📋 Prerequisites

### Cypress Cloud Project

1.  Go to [Cypress Dashboard](https://cloud.cypress.io/) and create a new project.
2.  Note down the **Cypress Record Key** from project settings (we’ll use it for CI/CD).

### Cypress Project

1.  Make sure you have a Cypress project set up locally.
2.  Ensure tests are running successfully locally with:
    ```bash
    npx cypress open
    ```
3.  **Optional:** Install Mochawesome for reports:
    ```bash
    npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
    ```

### Git Repository

1.  Initialize Git in your project:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your_repo_url>
    git push -u origin main
    ```

### GitHub Actions Secrets

1.  Go to your GitHub repository → **Settings** → **Secrets and Variables** → **Actions** → **New Repository Secret**.
2.  Add a secret:
    -   **Name:** `CYPRESS_RECORD_KEY`
    -   **Value:** `<your Cypress Cloud project record key>`

---

## 🤖 GitHub Actions Workflow

Create a workflow file at `.github/workflows/cypress.yml`:

```yaml
name: Cypress CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox, edge]  # Cross-browser testing

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Run Cypress Tests
        run: |
          npx cypress run --browser ${{ matrix.browser }} --record --key ${{ secrets.CYPRESS_RECORD_KEY }} --reporter mochawesome --reporter-options reportDir=cypress/reports/${{ matrix.browser }},overwrite=false,html=true,json=true

      - name: Merge Mochawesome Reports
        run: |
          npx mochawesome-merge cypress/reports/*/*.json > cypress/reports/mochawesome.json
          npx marge cypress/reports/mochawesome.json -f report -o cypress/reports/html
```

### Workflow Steps Explanation

-   **Checkout Repository:** Pulls the project code from GitHub.
-   **Setup Node.js:** Ensures the correct Node.js version is used.
-   **Install Dependencies:** Installs Cypress and Mochawesome using `npm ci` for faster, reliable installs.
-   **Run Cypress Tests:** Executes tests in parallel for Chrome, Firefox, and Edge. It records the results in Cypress Cloud and generates Mochawesome reports for each browser.
-   **Merge Reports:** Combines all browser-specific JSON reports into a single consolidated HTML report.

---

## 🚀 Execution Flow

1.  Push code to your GitHub repository's `main` branch or open a pull request.
2.  Navigate to the **Actions** tab in your repository. You will see the workflow start automatically.
3.  Cypress tests will execute in parallel across the specified browsers.
4.  Test results will be available in two places:
    -   **Cypress Dashboard:** For detailed, recorded test analytics.
    -   **GitHub Artifacts:** The merged Mochawesome HTML report can be downloaded from the workflow run's summary page if you add an upload artifact step.
