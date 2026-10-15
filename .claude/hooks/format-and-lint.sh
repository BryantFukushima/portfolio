#!/usr/bin/env bash
# PostToolUse hook: runs after Claude edits or writes a file.
# 1. Formats the file with Prettier.
# 2. Lints it with ESLint. On lint errors, exits 2 so the errors are sent back to Claude to fix.

file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0

# Only touch files inside this project.
case "$file" in
  "$CLAUDE_PROJECT_DIR"/*) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

npx prettier --write --ignore-unknown "$file" >/dev/null 2>&1

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs)
    if ! output=$(npx eslint "$file" 2>&1); then
      echo "ESLint errors in $file:" >&2
      echo "$output" >&2
      exit 2
    fi
    ;;
esac

exit 0
