# Convenience targets for local workflows. Set `PKG=npm` if you prefer npm.
PKG ?= bun
DB_URL ?= postgresql://user:password@localhost:5432/user
EFFECTIVE_DB_URL := $(if $(DATABASE_URL),$(DATABASE_URL),$(DB_URL))

.PHONY: before-commit fmt lint textlint test install db-up db-migrate

install:
	$(PKG) install

fmt:
	$(PKG) run format:check

lint:
	$(PKG) run lint

textlint:
	$(PKG) run textlint

db-up:
ifeq ($(strip $(DATABASE_URL)),)
	@if command -v docker >/dev/null 2>&1; then \
		docker compose up -d db; \
	else \
		echo "DATABASE_URL is not set and Docker is unavailable. Start PostgreSQL manually and set DATABASE_URL."; \
		exit 1; \
	fi
else
	@echo "DATABASE_URL provided; skipping docker compose up."
endif

db-migrate: db-up
	@if [ -z "$(DATABASE_URL)" ]; then \
		echo "Waiting for database to be ready..."; \
		until docker compose exec -T db pg_isready -U user -d user >/dev/null 2>&1; do sleep 1; done; \
	fi
	DATABASE_URL=$(EFFECTIVE_DB_URL) npx prisma migrate deploy --schema ./src/app/prisma/schema.prisma

test: db-migrate
	DATABASE_URL=$(EFFECTIVE_DB_URL) $(PKG) run test

# Run the same checks you should pass before committing.
before-commit: fmt lint textlint test
