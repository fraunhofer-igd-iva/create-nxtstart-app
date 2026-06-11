#!/usr/bin/env python3
"""
Update frozen versions from a package.json file.

Usage:
    python sync_frozen_versions.py path/to/package.json src/packageInstallationUtils.js --in-place

Or without overwriting:
    python sync_frozen_versions.py path/to/package.json src/packageInstallationUtils.js

This script:
- reads dependencies + devDependencies from package.json
- strips leading ^ or ~ from versions
- updates every 'package@version' string in the target JS/TS file
- preserves quote style and file formatting as much as possible
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, Tuple


# Optional: keep some intentionally pinned packages unchanged.
# Example:
# SKIP_PACKAGES = {"better-auth"}
SKIP_PACKAGES = set()


STRING_LITERAL_RE = re.compile(r"""(['"])([^'"]+)\1""")


def normalize_version(version: str) -> str:
    """
    Convert versions like '^9.1.1' or '~3.8.4' to '9.1.1' / '3.8.4'.
    """
    return version.lstrip("^~")


def load_package_versions(package_json_path: Path) -> Dict[str, str]:
    """
    Load package versions from package.json dependencies + devDependencies.
    Returns a map: package_name -> normalized_version
    """
    with package_json_path.open("r", encoding="utf-8") as f:
        package_data = json.load(f)

    version_map: Dict[str, str] = {}

    for section in ("dependencies", "devDependencies"):
        deps = package_data.get(section, {})
        for pkg_name, version in deps.items():
            version_map[pkg_name] = normalize_version(version)

    return version_map


def split_package_entry(entry: str) -> Tuple[str, str] | None:
    """
    Split a string like:
        '@mui/material@9.0.1' -> ('@mui/material', '9.0.1')
        'prettier@3.8.3'      -> ('prettier', '3.8.3')

    Uses rsplit('@', 1) so scoped packages work correctly.
    """
    if "@" not in entry:
        return None

    try:
        pkg_name, pkg_version = entry.rsplit("@", 1)
    except ValueError:
        return None

    # guard against malformed strings like '@scope'
    if not pkg_name or not pkg_version:
        return None

    return pkg_name, pkg_version


def update_frozen_versions_text(text: str, version_map: Dict[str, str]) -> Tuple[str, list[str]]:
    """
    Update all string literals that look like package@version
    based on version_map.
    Returns:
        updated_text, list_of_changes
    """
    changes: list[str] = []

    def replace_match(match: re.Match) -> str:
        quote = match.group(1)
        content = match.group(2)

        parsed = split_package_entry(content)
        if not parsed:
            return match.group(0)

        pkg_name, old_version = parsed

        if pkg_name in SKIP_PACKAGES:
            return match.group(0)

        new_version = version_map.get(pkg_name)
        if not new_version:
            return match.group(0)

        if new_version == old_version:
            return match.group(0)

        changes.append(f"{pkg_name}: {old_version} -> {new_version}")
        return f"{quote}{pkg_name}@{new_version}{quote}"

    updated_text = STRING_LITERAL_RE.sub(replace_match, text)
    return updated_text, changes


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Update frozen package bundle versions from package.json"
    )
    parser.add_argument("package_json", type=Path, help="Path to package.json")
    parser.add_argument(
        "bundle_file",
        type=Path,
        help="Path to JS/TS file containing frozenVersionsPackageBundles",
    )
    parser.add_argument(
        "--in-place",
        action="store_true",
        help="Overwrite the bundle file in place",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Optional output file path (ignored if --in-place is used)",
    )

    args = parser.parse_args()

    if not args.package_json.exists():
        print(f"ERROR: package.json not found: {args.package_json}", file=sys.stderr)
        return 1

    if not args.bundle_file.exists():
        print(f"ERROR: bundle file not found: {args.bundle_file}", file=sys.stderr)
        return 1

    version_map = load_package_versions(args.package_json)

    original_text = args.bundle_file.read_text(encoding="utf-8")
    updated_text, changes = update_frozen_versions_text(original_text, version_map)

    if not changes:
        print("No version changes found.")
        return 0

    if args.in_place:
        output_path = args.bundle_file
    elif args.output is not None:
        output_path = args.output
    else:
        output_path = args.bundle_file.with_name(
            f"{args.bundle_file.stem}.updated{args.bundle_file.suffix}"
        )

    output_path.write_text(updated_text, encoding="utf-8")

    print(f"Updated {len(changes)} package entr{'y' if len(changes) == 1 else 'ies'}.")
    print(f"Written to: {output_path}")
    print("\nChanges:")
    for change in changes:
        print(f"  - {change}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
