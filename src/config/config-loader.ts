/**
 * Configuration Loader
 *
 * Handles loading, validating, and merging configuration files.
 * Provides fallback to defaults and error handling.
 */

import { PluginConfig, UserConfig, CheckboxStyle, CompatibilitySettings } from './config-types';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/** Default checkbox styles loaded from config file */
const DEFAULT_CHECKBOX_STYLES: CheckboxStyle[] = JSON.parse(
	readFileSync(join(__dirname, '../../config/default-checkbox-styles.json'), 'utf-8')
);

/** Default compatibility settings loaded from config file */
const DEFAULT_COMPATIBILITY_SETTINGS: CompatibilitySettings = JSON.parse(
	readFileSync(join(__dirname, '../../config/default-compatibility-settings.json'), 'utf-8')
);

/** Default complete configuration */
const DEFAULT_CONFIG: PluginConfig = {
	checkboxStyles: DEFAULT_CHECKBOX_STYLES,
	compatibilitySettings: DEFAULT_COMPATIBILITY_SETTINGS
};

/**
 * Load configuration from a JSON file
 *
 * @param filePath - Path to the JSON configuration file
 * @returns Parsed configuration object or null if file doesn't exist or is invalid
 */
function loadConfigFile<T>(filePath: string): T | null {
	try {
		if (!existsSync(filePath)) {
			return null;
		}
		const content = readFileSync(filePath, 'utf-8');
		return JSON.parse(content) as T;
	} catch (error) {
		console.warn(`Failed to load config file ${filePath}:`, error);
		return null;
	}
}

/**
 * Validate checkbox styles array
 *
 * @param styles - Array of checkbox styles to validate
 * @returns true if valid, false otherwise
 */
function validateCheckboxStyles(styles: any[]): styles is CheckboxStyle[] {
	if (!Array.isArray(styles)) return false;

	return styles.every(style =>
		typeof style === 'object' &&
		typeof style.symbol === 'string' &&
		style.symbol.length === 1 &&
		typeof style.description === 'string'
	);
}

/**
 * Validate compatibility settings object
 *
 * @param settings - Compatibility settings object to validate
 * @returns true if valid, false otherwise
 */
function validateCompatibilitySettings(settings: any): settings is CompatibilitySettings {
	return (
		typeof settings === 'object' &&
		typeof settings.enableTasksCompatibility === 'boolean' &&
		typeof settings.hasShownTasksNotice === 'boolean'
	);
}

/**
 * Load and merge user configuration with defaults
 *
 * @param vaultPath - Path to the Obsidian vault (.obsidian/plugins/plugin-id/)
 * @returns Complete plugin configuration
 */
export function loadPluginConfig(vaultPath?: string): PluginConfig {
	let userConfig: UserConfig | null = null;

	// Try to load user config from vault if path provided
	if (vaultPath) {
		const userConfigPath = join(vaultPath, 'config.json');
		userConfig = loadConfigFile<UserConfig>(userConfigPath);
	}

	// Merge user config with defaults
	const config: PluginConfig = { ...DEFAULT_CONFIG };

	if (userConfig) {
		// Merge checkbox styles
		if (userConfig.checkboxStyles && validateCheckboxStyles(userConfig.checkboxStyles)) {
			config.checkboxStyles = userConfig.checkboxStyles;
		}

		// Merge compatibility settings
		if (userConfig.compatibilitySettings) {
			const userCompat = userConfig.compatibilitySettings;
			if (validateCompatibilitySettings({ ...DEFAULT_COMPATIBILITY_SETTINGS, ...userCompat })) {
				config.compatibilitySettings = { ...DEFAULT_COMPATIBILITY_SETTINGS, ...userCompat };
			}
		}
	}

	return config;
}

/**
 * Save user configuration to vault
 *
 * @param config - User configuration to save
 * @param vaultPath - Path to the Obsidian vault (.obsidian/plugins/plugin-id/)
 */
export function saveUserConfig(config: UserConfig, vaultPath: string): void {
	try {
		const configPath = join(vaultPath, 'config.json');
		// Note: In a real implementation, you'd want to use Obsidian's filesystem APIs
		// For now, this is a placeholder for the save functionality
		console.log('Would save config to:', configPath, config);
	} catch (error) {
		console.error('Failed to save user config:', error);
	}
}

/**
 * Get the default checkbox styles
 *
 * @returns Array of default checkbox styles
 */
export function getDefaultCheckboxStyles(): CheckboxStyle[] {
	return [...DEFAULT_CHECKBOX_STYLES];
}

/**
 * Get the default compatibility settings
 *
 * @returns Default compatibility settings object
 */
export function getDefaultCompatibilitySettings(): CompatibilitySettings {
	return { ...DEFAULT_COMPATIBILITY_SETTINGS };
}