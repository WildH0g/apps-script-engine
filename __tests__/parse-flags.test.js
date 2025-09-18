import { describe, it, expect } from 'vitest';
import { parseFlags } from '../handlers/parse-flags.js';

describe('parseFlags', () => {
  // Happy Paths
  describe('Happy Paths', () => {
    it('should parse a directory argument correctly', () => {
      const input = [null, null, '.'];
      const expectedOutput = { dir: '.', flags: [] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse a boolean flag (--ts) correctly', () => {
      const input = [null, null, '.', '--ts'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse a boolean flag before the directory argument', () => {
      const input = [null, null, '--ts', '.'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse a flag with an explicit true value (--ts=true)', () => {
      const input = [null, null, '.', '--ts=true'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse a flag with an explicit false value (--ts=false)', () => {
      const input = [null, null, '.', '--ts=false'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: false }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse multiple boolean flags', () => {
      const input = [null, null, '.', '--ts', '--verbose'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: true }, { name: 'verbose', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse multiple flags with mixed values (boolean and string)', () => {
      const input = [null, null, '.', '--ts=true', '--verbose=false', '--name=my-app'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: true }, { name: 'verbose', value: false }, { name: 'name', value: 'my-app' }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should parse flags interspersed with the directory argument', () => {
      const input = [null, null, '--ts', 'my-project-dir', '--verbose'];
      const expectedOutput = { dir: 'my-project-dir', flags: [{ name: 'ts', value: true }, { name: 'verbose', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });
  });

  // Unhappy Paths and Edge Cases
  describe('Unhappy Paths and Edge Cases', () => {
    it('should return default directory and no flags when no arguments are provided', () => {
      const input = [null, null];
      const expectedOutput = { dir: 'apps-script-project', flags: [] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should return default directory when only flags are provided', () => {
      const input = [null, null, '--ts'];
      const expectedOutput = { dir: 'apps-script-project', flags: [{ name: 'ts', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should handle invalid flag format (single dash) by ignoring it', () => {
      const input = [null, null, '.', '-ts'];
      const expectedOutput = { dir: '.', flags: [] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should handle invalid flag format (empty flag name) by ignoring it', () => {
      const input = [null, null, '.', '--=value'];
      const expectedOutput = { dir: '.', flags: [] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should handle empty flag value as an empty string', () => {
      const input = [null, null, '.', '--flag='];
      const expectedOutput = { dir: '.', flags: [{ name: 'flag', value: '' }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should handle duplicate flags, with the last one taking precedence', () => {
      const input = [null, null, '.', '--ts=true', '--ts=false'];
      const expectedOutput = { dir: '.', flags: [{ name: 'ts', value: false }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });

    it('should treat an argument starting with -- as a flag, and use the default directory if no non-flag argument is provided', () => {
      const input = [null, null, '--my-project-name', '--ts'];
      const expectedOutput = { dir: 'apps-script-project', flags: [{ name: 'my-project-name', value: true }, { name: 'ts', value: true }] };
      expect(parseFlags(input)).toEqual(expectedOutput);
    });
  });
});
