/**
 * Configuration Types
 *
 * TypeScript interfaces for the external configuration system.
 * These types match the JSON schema defined in config/config-schema.json.
 */

/** Represents a single checkbox style */
export interface CheckboxStyle {
	/** The checkbox symbol (single character) */
	symbol: string;
	/** Human-readable description */
	description: string;
}

/** Settings related to plugin compatibility */
export interface CompatibilitySettings {
	/** Whether to enable Tasks plugin integration */
	enableTasksCompatibility: boolean;
	/** Whether the Tasks plugin notice has been shown to the user */
	hasShownTasksNotice: boolean;
}

/** Complete configuration object */
export interface PluginConfig {
	/** Array of available checkbox styles */
	checkboxStyles: CheckboxStyle[];
	/** Plugin compatibility settings */
	compatibilitySettings: CompatibilitySettings;
}

/** User configuration (subset that can be customized) */
export interface UserConfig {
	/** Custom checkbox styles (optional override) */
	checkboxStyles?: CheckboxStyle[];
	/** User compatibility settings (optional override) */
	compatibilitySettings?: Partial<CompatibilitySettings>;
}