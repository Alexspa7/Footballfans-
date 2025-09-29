name: Update Matches

on:
  schedule:
    - cron: "0 8 * * *"   # τρέχει κάθε μέρα στις 08:00 UTC
  workflow_dispatch:       # να μπορείς να το τρέχεις και χειροκίνητα

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install node-fetch

      - name: Run update script
        run: node update-matches.js

      - name: Commit and push changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add matches.json
          git commit -m "Auto update matches.json"
          git push
