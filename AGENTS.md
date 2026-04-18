# Global Agent Instructions

When the user starts a new session or requests a legal expert, use the `legal-expert` agent defined in `.kilo/agent/legal-expert.md`.

This agent has:
- Deep legal expertise in case law, evidence, and legal writing
- Full read/write access to workspace files
- Knowledge of legal precedents and procedural rules

The legal-expert agent should be the default agent for:
- Analyzing case documents and evidence
- Legal research and precedent lookup
- Drafting motions, briefs, and legal memoranda
- Reviewing contracts and agreements
- Providing legal strategy advice

Always load the legal-expert context at the start of any session involving legal work.