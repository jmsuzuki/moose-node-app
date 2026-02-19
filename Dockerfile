
FROM node:20-bookworm-slim

# This is to remove the notice to update NPM that will break the output from STDOUT
RUN npm config set update-notifier false

# Install alternative package managers globally
RUN npm install -g pnpm@latest

ARG DEBIAN_FRONTEND=noninteractive

# Update the package lists for upgrades for security purposes
RUN apt-get update && apt-get upgrade -y

# Install ca-certificates, tail and locales package
RUN apt-get install -y ca-certificates locales coreutils curl && update-ca-certificates

# moose depends on libc 2.40+, not available in stable
# This uses unstable, but unpinned because they delete older versions
RUN echo "deb http://deb.debian.org/debian/ unstable main" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y libc6 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Generate locale files
RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8
ENV TZ=UTC
ENV DOCKER_IMAGE=true

# Install Moose
ARG FRAMEWORK_VERSION="0.0.0"
ARG DOWNLOAD_URL
RUN echo "DOWNLOAD_URL: ${DOWNLOAD_URL}"
RUN ldd --version
RUN curl -Lo /usr/local/bin/moose ${DOWNLOAD_URL}
RUN chmod +x /usr/local/bin/moose

RUN moose --version

# Setup healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:4000/health || exit 1

# Sets up non-root user using 1001 because node creates a user with 1000
RUN groupadd --gid 1001 moose \
  && useradd --uid 1001 --gid moose --shell /bin/bash --create-home moose

# Set the working directory inside the container
WORKDIR /application

# Ensure application directory is owned by moose user
RUN chown -R moose:moose /application

# Placeholder for the language specific copy package file copy

                    COPY --chown=moose:moose ./package.json ./package.json
                    COPY --chown=moose:moose ./tsconfig.json ./tsconfig.json
                    COPY --chown=moose:moose ./app ./app
                    COPY --chown=moose:moose ./package-lock.json ./package-lock.json

# https://stackoverflow.com/questions/70096208/dockerfile-copy-folder-if-it-exists-conditional-copy/70096420#70096420
COPY --chown=moose:moose ./project.tom[l] ./project.toml
COPY --chown=moose:moose ./moose.config.tom[l] ./moose.config.toml
COPY --chown=moose:moose ./versions .moose/versions


# Placeholder for the language specific install command
RUN npm ci

# Placeholder for TypeScript pre-compilation step (empty for Python)
# Run TypeScript type checking
# Run typecheck before we compile since we skip typecheck there
RUN npx moose check

# Pre-compile TypeScript with moose plugins (typia, compilerPlugin)
# This eliminates ts-node overhead at runtime for faster worker startup
RUN MOOSE_SOURCE_DIR='app' npx moose-tspc .moose/compiled

# Set environment variable to use pre-compiled JavaScript at runtime
ENV MOOSE_USE_COMPILED=true

# all commands from here on will be run as the moose user
USER moose:moose

# Checks that the project is valid
RUN which moose
RUN moose check --write-infra-map || (echo "Error running moose check" && exit 1)

# Expose the ports on which the application will listen
EXPOSE 4000

# Set the command to run the application
CMD ["moose", "prod"]
