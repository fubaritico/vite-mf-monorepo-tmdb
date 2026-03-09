#!/bin/bash

# Set default version type to patch if not provided
VERSION_TYPE="${1:-patch}"

# Validate version type argument
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "\033[0;31mError: Invalid version type. Must be one of: patch, minor, major\033[0m"
    exit 1
fi

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${2:-$GREEN}$1${NC}"
}

check_status() {
    if [ $? -eq 0 ]; then
        log "✓ $1 completed successfully"
    else
        log "✗ $1 failed" "$RED"
        exit 1
    fi
}

log "Checking if Verdaccio is running..." "$YELLOW"
curl -s http://localhost:4873 > /dev/null
if [ $? -ne 0 ]; then
    log "Verdaccio is not running on localhost:4873" "$RED"
    exit 1
fi
check_status "Verdaccio connection"

# Go to package directory first
cd "$(dirname "$0")" || exit 1

# Load token from .env
if [ -f ../../.env ]; then
    export $(cat ../../.env | grep -v '^#' | xargs)
else
     log ".env has not been found"
fi

if [ -z "$VERDACCIO_TOKEN" ]; then
    log "VERDACCIO_TOKEN not set in .env" "$RED"
    exit 1
fi

# Create .npmrc with token
log "Configuring npm authentication..." "$YELLOW"
cat > .npmrc << EOL
//localhost:4873/:_authToken="$VERDACCIO_TOKEN"
registry=http://localhost:4873/
EOL
check_status "NPM authentication"

log "Building package..." "$YELLOW"
pnpm build
check_status "Build"

#log "Creating new version..." "$YELLOW"
#pnpm version "$VERSION_TYPE"
#check_status "Version bump"

log "Publishing to Verdaccio..." "$YELLOW"
npm publish --userconfig .npmrc
check_status "Publish"

CURRENT_VERSION=$(node -p "require('./package.json').version")

log "Creating git tag..." "$YELLOW"
git tag -a "http-client-v${CURRENT_VERSION}" -m "http-client Version ${CURRENT_VERSION}" || true
check_status "Tag creation"

#log "Creating git tag..." "$YELLOW"
#git tag -a "http-client-v${CURRENT_VERSION}" -m "http-client Version ${CURRENT_VERSION}" || true
#check_status "Tag creation"

log "🎉 Package published! Version: ${CURRENT_VERSION}" "$GREEN"

# Cleanup
rm -f .npmrc
