# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Naptrix Sleep Tracker project.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)
- **Triggers**: Push to main/develop branches, Pull Requests
- **Features**:
  - Multi-version Node.js testing (18.x, 20.x)
  - ESLint code quality checks
  - TypeScript type checking
  - Application build verification
  - Security audit
  - Automatic deployment to Vercel

### 2. Code Quality (`code-quality.yml`)
- **Triggers**: Push to main/develop branches, Pull Requests
- **Features**:
  - Prettier formatting checks
  - ESLint linting
  - TypeScript type checking
  - Unused dependency detection
  - Bundle size analysis

### 3. Dependency Updates (`dependency-update.yml`)
- **Triggers**: Weekly (Mondays), Manual
- **Features**:
  - Automatic dependency updates
  - Security vulnerability fixes
  - Pull Request creation for updates

### 4. Release (`release.yml`)
- **Triggers**: Git tags (v*)
- **Features**:
  - Automatic release creation
  - Build verification
  - Release notes generation

## Required Secrets

To use these workflows, you need to set up the following secrets in your repository:

### Repository Secrets
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `DATABASE_URL` - PostgreSQL database URL
- `NEXT_PUBLIC_APP_URL` - Application URL
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Setting up Secrets
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with its corresponding value

## Workflow Status

You can view the status of all workflows in the "Actions" tab of your repository.

## Contributing

When contributing to this project:
1. Create a feature branch
2. Make your changes
3. Ensure all workflows pass
4. Create a pull request
5. Wait for CI checks to pass
6. Merge after review

## Troubleshooting

### Common Issues
- **Build failures**: Check environment variables and dependencies
- **Deployment issues**: Verify Vercel configuration and secrets
- **Linting errors**: Run `npm run lint:fix` locally
- **Type errors**: Run `npm run type-check` locally

### Local Development
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check types
npm run type-check

# Format code
npm run format

# Run security audit
npm run audit
```
