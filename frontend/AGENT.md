# Codex Agent

This repository uses the **Codex agent** for automated code updates and pull request generation. The agent reads instructions from this file to understand how it should behave when running inside the project.

## Purpose

- Keep the codebase consistent and formatted
- Run linting and build checks before creating pull requests
- Apply small fixes or documentation updates automatically

## Usage

Whenever the agent is triggered, it will:

1. Install dependencies if required
2. Run `npm run lint` and `npm run build`
3. Create a pull request summarising the changes

## Configuration

You can customise the agent by editing this `AGENT.md` file. Document any special setup steps or commands that must be executed after modifications.

