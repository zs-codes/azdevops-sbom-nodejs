# Node.js SBOM Application

A Node.js application demonstrating automated Software Bill of Materials (SBOM) generation and integration with Dependency Track for vulnerability management and supply chain security.

## Overview

This project showcases best practices for generating and managing SBOMs in a CI/CD pipeline using Azure DevOps. The application automatically generates CycloneDX-format SBOMs and uploads them to a self-hosted Dependency Track instance for continuous monitoring of dependencies and vulnerabilities.

## Features

- ✅ Automated SBOM generation using CycloneDX
- ✅ Integration with Dependency Track for vulnerability tracking
- ✅ Azure Pipelines CI/CD automation
- ✅ Comprehensive dependency management
- ✅ Pipeline artifacts for SBOM versioning

## Prerequisites

- **Node.js** 18.x or higher
- **npm** (comes with Node.js)
- **Azure DevOps** account with self-hosted Windows agent
- **Dependency Track** instance (self-hosted or cloud)
- **package-lock.json** committed in the repository (required for reproducible builds)

## Getting Started

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Node.js-sbom-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   **Note:** For local development, use `npm install`. The CI/CD pipeline uses `npm ci` for faster, reproducible builds.

3. **Run the application**
   ```bash
   npm start
   ```

### Generate SBOM Locally

Generate a CycloneDX SBOM:

```bash
npm run sbom:cyclonedx
```

Generate an SPDX SBOM:

```bash
npm run sbom:spdx
```

The SBOM file will be created as `sbom.json` in the project root.

## Azure Pipeline Configuration

The project includes an Azure Pipeline (`build-pipeline.yml`) that:

1. **Builds** the Node.js application
2. **Runs tests** (if available)
3. **Generates SBOM** in CycloneDX format
4. **Uploads SBOM** to Dependency Track
5. **Publishes SBOM** as a pipeline artifact

### Pipeline Variables

The pipeline uses the following variables:

**Defined in `build-pipeline.yml`:**

- `NODE_VERSION`: Node.js version (default: 18.x)
- `DT_PROJ_NAME`: Dependency Track project name (default: Node.Js-sbom-app)
- `DT_PROJ_VERSION`: Project version for SBOM (default: 1.0)
- `DT_URI`: Dependency Track server URL (default: http://localhost:8080/)

**Must be defined as secrets in Azure DevOps:**

1. Go to **Pipelines** → **Edit** → **Variables**
2. Add the following secret variables:
   - `DT_API_KEY`: Your Dependency Track API key (mark as secret)
   - `DT_PROJ_ID`: Your Dependency Track project UUID (mark as secret)

**To get your Dependency Track values:**

- API Key: In Dependency Track, go to Administration → Access Management → Teams → Create API Key
- Project UUID: In Dependency Track, go to Projects → Select your project → Copy the UUID from the URL or project details

**Security Note:** Never commit API keys or project IDs directly in the YAML file. Always use Azure DevOps secret variables.

## Project Structure

```
Node.js-sbom-app/
├── src/
│   ├── app.js              # Main application
│   ├── routes/
│   │   └── users.js        # User routes
│   └── utils/
│       └── helpers.js      # Helper functions
├── index.js                 # Entry point
├── package.json             # Dependencies and scripts
├── build-pipeline.yml       # Azure Pipeline configuration
└── README.md                # This file
```

## Dependencies

This project includes various popular Node.js packages for demonstration:

- **Web Framework**: Express.js
- **Security**: Helmet, CORS, bcrypt
- **Utilities**: Lodash, dayjs, uuid
- **Logging**: Winston, Morgan
- **Database**: Mongoose (MongoDB)
- **Authentication**: JWT
- **Validation**: Joi

See `package.json` for the complete list.

## SBOM Management

### What is an SBOM?

A Software Bill of Materials (SBOM) is a comprehensive inventory of all components, libraries, and dependencies used in an application. It's essential for:

- **Vulnerability Management**: Quickly identify affected components when security issues are disclosed
- **License Compliance**: Track open-source licenses and ensure compliance
- **Supply Chain Security**: Understand your software supply chain
- **Risk Assessment**: Evaluate the risk profile of your dependencies

### Why Dependency Track?

Dependency Track is an intelligent Component Analysis platform that:

- Monitors dependencies for known vulnerabilities (CVEs)
- Provides risk scoring and metrics
- Tracks vulnerabilities across multiple projects
- Integrates with CI/CD pipelines
- Offers API access for automation

## Troubleshooting

### SBOM Upload Fails

**Issue**: SBOM upload to Dependency Track fails with connection error

**Solution**: Ensure the Dependency Track URI is accessible from the Azure agent machine. Change `http://localhost:8080/` to the actual server address.

### Package Name Validation Error

**Issue**: npm complains about package name format

**Solution**: Package names must be lowercase. Update `"Node.js-sbom-app"` to `"nodejs-sbom-app"` in `package.json`.

### Missing or Outdated package-lock.json

**Issue**: `npm ci` fails because package-lock.json doesn't exist or is out of sync with package.json

**Solution**:

1. Run `npm install` locally to generate/update package-lock.json
2. Commit the file: `git add package-lock.json && git commit -m "Update package-lock.json"`
3. Push to repository

**Why npm ci?** The pipeline uses `npm ci` instead of `npm install` for:

- Faster installation in CI/CD environments
- Guaranteed reproducible builds (exact dependency versions)
- Fails if lock file is out of sync (prevents dependency drift)
- Cleaner installs (removes existing node_modules first)

## CI/CD Workflow

```
┌─────────────┐
│   Commit    │
│  & Push     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Pipeline   │
│  Triggered  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  1. Install Dependencies    │
│  2. Run Tests               │
│  3. Generate SBOM           │
│  4. Upload to Dep Track     │
│  5. Save as Artifact        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────┐
│ Dependency  │
│   Track     │
│  Analysis   │
└─────────────┘
```

## Best Practices

1. **Regular Updates**: Keep dependencies updated to patch vulnerabilities
2. **SBOM Versioning**: Generate SBOMs for each release
3. **Secure Credentials**: Use Azure Key Vault or variable groups for API keys
4. **Monitor Alerts**: Regularly check Dependency Track for new vulnerabilities
5. **Automate**: Integrate SBOM generation into every build

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is provided as-is for demonstration purposes.

## Resources

- [CycloneDX Specification](https://cyclonedx.org/)
- [Dependency Track Documentation](https://docs.dependencytrack.org/)
- [Azure Pipelines Documentation](https://docs.microsoft.com/azure/devops/pipelines/)
- [SBOM Best Practices](https://www.cisa.gov/sbom)

## Support

For issues or questions:

- Create an issue in the repository
- Check existing documentation
- Review Azure Pipeline logs for detailed error messages
