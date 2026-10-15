#!/usr/bin/env bash
# Stop hook: runs when Claude finishes a turn.
# Typechecks the whole project. On errors, exits 2 so Claude can't stop until it fixes them.
# If Claude already had one attempt to fix them (stop_hook_active), it stops and the user is told instead,
# so a stubborn error can't cause an endless loop.

already_retried=$(jq -r '.stop_hook_active // false')

cd "$CLAUDE_PROJECT_DIR" || exit 0

if output=$(npm run --silent typecheck 2>&1); then
  exit 0
fi

if [ "$already_retried" = "true" ]; then
  jq -n --arg msg "Typecheck still failing after one fix attempt. Run: npm run typecheck" \
    '{systemMessage: $msg}'
  exit 0
fi

echo "TypeScript errors. Fix them before finishing:" >&2
echo "$output" >&2
exit 2
