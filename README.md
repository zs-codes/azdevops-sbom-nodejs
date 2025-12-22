# Dependency-Track .NET Example

This repository demonstrates how to generate Software Bill of Materials (SBOM) files for .NET applications and integrate them with Dependency-Track using Azure DevOps.

> **Note**: This is part of a series of language-specific examples for SBOM generation with Dependency-Track, covering .NET, JavaScript (React/Node.js), Java, Python, and PHP.

## Overview

- **Sample .NET Application**: Simple console app for demonstration purposes
- **Azure DevOps Pipeline**: Automated SBOM generation and Dependency-Track integration
- **SBOM Generation**: Creates dependency manifests for security scanning

## Key Files

- `dotnet/azure-pipelines.yml` - Azure DevOps pipeline configuration
- `dotnet/TestApp/` - Sample .NET application

## Purpose

This example shows how to:

1. Build a .NET application in Azure DevOps
2. Generate SBOM files from the application dependencies
3. Submit the SBOM to Dependency-Track for vulnerability analysis

The focus is on the CI/CD pipeline and SBOM generation process, not the .NET application complexity.
