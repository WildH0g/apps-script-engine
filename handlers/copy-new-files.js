import fs from 'fs';
import path from 'path';

/**
 * Recursively copies new files from a source directory to a destination directory,
 * ensuring that existing files in the destination are not overwritten.
 * New directories are created if they don't exist.
 *
 * @param {string} srcDir - The absolute path to the source directory.
 * @param {string} destDir - The absolute path to the destination directory.
 */
export function copyNewFiles(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  fs.mkdirSync(destDir, { recursive: true }); // Ensure destination directory exists

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyNewFiles(srcPath, destPath); // Recursively call for subdirectories
    } else {
      // It's a file, copy only if it doesn't exist at the destination
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
