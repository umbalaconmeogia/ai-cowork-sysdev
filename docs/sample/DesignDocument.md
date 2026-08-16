# Design Document Best Practices

This document outlines the best practices for creating, structuring, and maintaining design documents using Markdown. The goal is to create a modular, maintainable, and scalable documentation system that is easy for both humans and AI to work with.

## 1. Modular Structure

Instead of maintaining a single, monolithic design document, we should break it down into smaller, topic-focused files.

- **Directory per Document**: Each major design document (e.g., System Requirement Specification, Basic Design Document) should reside in its own dedicated directory.
  ```
  docs/
  └── SystemDesign/
      ├── SRS/
      │   ├── README.md
      │   ├── 01-FunctionalRequirements.md
      │   └── ...
      └── BDD/
          ├── README.md
          └── ...
  ```

- **One Topic per File**: Each file should cover a single, specific topic (e.g., `Functional Requirements`, `Database Design`). This makes information easier to find, read, and maintain.

## 2. Entry Point and Table of Contents

- **`README.md` as the Entry Point**: Every document directory must contain a `README.md` file.
- **Content**: This file serves two main purposes:
    1.  **Overview**: It should contain the general introduction, scope, and definitions for the document.
    2.  **Table of Contents (ToC)**: It must include a clear Table of Contents with relative links to all other files within that directory. This provides a central navigation point for the entire document.

## 3. Naming and Ordering Conventions

- **Numbered Prefixes**: To maintain a clear and logical reading order, prefix each file (except `README.md`) with a number (e.g., `01-`, `02-`).
- **Descriptive Names**: The filename should clearly describe the content of the file.

  **Example:**
  - `01-FunctionalRequirements.md`
  - `02-Non-FunctionalRequirements.md`

## 4. Markdown Formatting Rules

- **Use Level 1 Heading (`#`)**: Every individual Markdown file should be self-contained and start with a Level 1 Heading (`#`). This ensures semantic correctness, improves readability when viewing the file in isolation, and is crucial for automated document processing.
- **Hierarchical Headings**: Use headings (`##`, `###`, etc.) hierarchically and consistently within each file.

## 5. Generating Deliverables

- **Source of Truth**: The collection of Markdown files is the single source of truth.
- **Use Tooling for Conversion**: When a consolidated document (e.g., PDF, DOCX) is required for delivery, use a dedicated tool like **Pandoc** to compile the individual files. This separates the content from the presentation layer.

  **Example Pandoc Command:**
  ```bash
  pandoc \
    SRS/README.md \
    SRS/01-FunctionalRequirements.md \
    SRS/02-Non-FunctionalRequirements.md \
    -o SystemRequirements.pdf \
    --table-of-contents \
    --number-sections
  ```
This approach avoids manual adjustments to heading levels and ensures a consistent, professional output every time.
