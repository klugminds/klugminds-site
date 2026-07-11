Run the full **coding standards + security** validation for `klugminds-site`.

Follow every step in @.cursor/prompts/validate-changes.md.

**Deploy URL:** use any text I typed after `/validate`, or default to `https://www.klugminds.ai`.

1. Run `npm run validate`
2. Complete the repository checks and live header/path probes from the prompt
3. Report the PASS/FAIL summary table
4. Fix reasonable failures in-repo and list anything that needs manual action (Vercel, DNS, handbook ADR)
