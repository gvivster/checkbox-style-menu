# Checkbox Style Menu - Configuration Guide

This guide explains how to customize the Checkbox Style Menu plugin beyond the basic settings available in the Obsidian interface.

## Configuration Overview

The plugin supports two levels of customization:

1. **Basic Settings** (via Obsidian Settings UI)
   - Enable/disable individual checkbox styles
   - Adjust timing and behavior settings

2. **Advanced Configuration** (via JSON files)
   - Completely customize available checkbox styles
   - Add new symbols and descriptions
   - Remove default styles

## Basic Settings

Access these through **Settings → Community Plugins → Checkbox Style Menu**:

- **Long Press Duration**: How long to hold checkboxes (100-1000ms)
- **Mobile Long Press Duration**: Separate timing for touch devices
- **Haptic Feedback**: Enable vibration on mobile devices
- **Style Selection**: Toggle individual checkbox styles on/off

## Advanced Configuration

### File Location

Create a configuration file at:
```
.vault/.obsidian/plugins/checkbox-style-menu/config.json
```

### Configuration Format

```json
{
  "checkboxStyles": [
    {
      "symbol": "✓",
      "description": "Completed"
    },
    {
      "symbol": "○",
      "description": "Todo"
    },
    {
      "symbol": "●",
      "description": "In Progress"
    }
  ]
}
```

### Field Descriptions

- **`checkboxStyles`** (required): Array of checkbox style objects
- **`symbol`** (required): Single character to use as checkbox marker
- **`description`** (required): Text shown in the selection menu

### Requirements

- **Symbol**: Must be exactly 1 character long
- **Description**: Non-empty string describing the style
- **Uniqueness**: Each symbol must be unique within the configuration
- **JSON Validity**: File must be valid JSON

### Applying Changes

1. Save the configuration file
2. Restart Obsidian or reload plugins
3. The new styles will be available in the checkbox menu

### Fallback Behavior

If the configuration file is:
- Missing → Uses default styles
- Invalid JSON → Uses default styles
- Contains invalid styles → Skips invalid entries, uses valid ones

## Examples

### Minimal Workflow

```json
{
  "checkboxStyles": [
    { "symbol": " ", "description": "Empty" },
    { "symbol": "✓", "description": "Done" },
    { "symbol": "○", "description": "Todo" },
    { "symbol": "●", "description": "In Progress" },
    { "symbol": "✗", "description": "Cancelled" }
  ]
}
```

### Project Management

```json
{
  "checkboxStyles": [
    { "symbol": "📋", "description": "Backlog" },
    { "symbol": "⏳", "description": "In Progress" },
    { "symbol": "✅", "description": "Completed" },
    { "symbol": "🚫", "description": "Blocked" },
    { "symbol": "🎯", "description": "Ready" }
  ]
}
```

### Priority System

```json
{
  "checkboxStyles": [
    { "symbol": "🔴", "description": "Critical" },
    { "symbol": "🟠", "description": "High" },
    { "symbol": "🟡", "description": "Medium" },
    { "symbol": "🟢", "description": "Low" },
    { "symbol": "⚪", "description": "No Priority" }
  ]
}
```

## Tips

### Choosing Symbols

- Use Unicode characters for visual appeal
- Keep symbols distinct and recognizable
- Consider keyboard accessibility
- Test in your theme for visibility

### Organization

- Group related styles together
- Use consistent naming conventions
- Start with the most frequently used styles

### Maintenance

- Backup your configuration files
- Test configurations in a separate vault first
- Keep descriptions clear and concise

## Troubleshooting

### Styles Not Appearing

1. Check JSON syntax validity
2. Verify file location
3. Restart Obsidian
4. Check console for error messages

### Invalid Symbols

- Ensure each symbol is exactly 1 character
- Use valid Unicode characters
- Avoid control characters

### Performance Issues

- Limit to 20-30 styles for best performance
- Use simple Unicode symbols over complex emoji
- Test on mobile devices

## Advanced Usage

### Integration with Themes

Some themes support additional checkbox styles. Create configurations that complement your theme:

```json
{
  "checkboxStyles": [
    { "symbol": "☐", "description": "Empty (Theme)" },
    { "symbol": "☑", "description": "Checked (Theme)" },
    { "symbol": "❓", "description": "Question (Theme)" }
  ]
}
```

### Workflow-Specific Styles

Create different configurations for different types of notes:

```json
{
  "checkboxStyles": [
    { "symbol": "📝", "description": "Note" },
    { "symbol": "🔍", "description": "Research" },
    { "symbol": "💡", "description": "Idea" },
    { "symbol": "✅", "description": "Complete" }
  ]
}
```

## Migration

### From Default Styles

1. Copy `config/default-checkbox-styles.json` as a starting point
2. Modify symbols and descriptions as needed
3. Save as `config.json` in plugin directory

### Preserving Settings

Your enabled/disabled style preferences are preserved when changing the configuration. Only the available styles change.