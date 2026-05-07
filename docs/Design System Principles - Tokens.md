
## 1. Token Architecture — 3-Tier Model

All tokens must belong to exactly one of three tiers. No exceptions.

```
Tier 1  →  Primitive tokens    (raw values)
Tier 2  →  Semantic tokens     (purpose/role mapping)
Tier 3  →  Component tokens    (scoped overrides — restricted use)
```

### Tier 1: Primitive Tokens

- Define the finite palette of raw values: colors, spacing scale, type scale, radii, border widths
- Color names ARE allowed at this tier — they describe what the value _is_
- Must NOT be consumed directly by components or styles; always referenced via Tier 2
- Examples:
    
    ```
    color.blue.500 = #3B82F6color.red.600  = #DC2626spacing.4      = 16pxradius.md      = 8px
    ```
    

### Tier 2: Semantic Tokens ✦ Core tier

- Map Tier 1 values to purpose/role/context
- Color names MUST NOT appear in token names at this tier
- Theme swapping happens exclusively at this tier
- Examples:
    
    ```
    color.action.primary          = {color.blue.500}color.action.primary.hover    = {color.blue.600}color.feedback.error          = {color.red.600}color.text.default            = {color.neutral.900}color.background.surface      = {color.neutral.0}
    ```
    

### Tier 3: Component Tokens

- Scope: single component or tightly related component group only
- Use only when Tier 2 cannot cover the requirement
- Must reference Tier 2 tokens, not Tier 1 directly
- Approval required before creation (see §3 Governance)
- Examples:
    
    ```
    button.background.default     = {color.action.primary}button.background.hover       = {color.action.primary.hover}
    ```
    

---

## 2. Naming Convention

### Structure

```
[category].[property].[variant].[state]
```

### Rules

- All names: lowercase, dot-separated (maps to kebab-case in CSS: `--color-action-primary`)
- Names must express **purpose or role**, never raw appearance
- Never encode color names in Tier 2+ token names
- Never encode component-specific details in Tier 1 or Tier 2 names

### Category vocabulary (fixed list — do not extend without approval)

```
color       spacing     typography    radius
border      shadow      motion        opacity
z-index
```

### Property vocabulary (examples)

```
background  text        border        icon
action      feedback    surface       overlay
```

### Variant vocabulary (examples)

```
primary     secondary   tertiary
default     subtle      inverse
success     warning     error     info
```

### State vocabulary (examples)

```
default     hover       active
disabled    focus       selected    visited
```

### Anti-patterns — FORBIDDEN

|Pattern|Example|Reason|
|---|---|---|
|Color name in Tier 2+|`color.blue.button`|Breaks theme swappability|
|Appearance-based name|`color.dark-shadow-heavy`|Not purpose-based|
|Component name in global token|`color.navbar.background`|Wrong tier|
|Single-use descriptors|`spacing.modal-padding-top`|Not reusable|
|Abbreviations without definition|`clr-bg-prim`|Ambiguous|

---

## 3. Token Governance

### Core constraint: Token set is finite and bounded

- The complete token set at each tier must be explicitly enumerated in this document
- Unbounded growth of the token set is a system failure, not a feature

### Decision flow for any new style requirement

```
New style requirement
        ↓
Does an existing token fit?
  YES → Use it. Done.
  NO  ↓
Can a Tier 2 token cover it with a new variant/state?
  YES → Propose addition → Approval required → Add to §4
  NO  ↓
Is this component-specific?
  YES → Tier 3 component token → Approval required
  NO  ↓
Is a new Tier 1 primitive needed?
        → Approval required → Add to §4
```

### Approval criteria for new tokens

A new token is approved only if ALL of the following are true:

- [ ] No existing token can serve the purpose
- [ ] The new token will be reused in ≥ 2 components or contexts
- [ ] The name follows the convention in §2 strictly
- [ ] The tier assignment is correct

### Health check

- A token whose usage drops to 1 reference is a candidate for removal
- Tokens unused across the entire codebase must be removed
- Token audit: run at every significant component addition

---

## 4. Token Set Mgmt.

> This section is the **single source of truth** for all approved tokens.  
> Do not create tokens outside this list without completing the approval flow in §3.

### 4-1. Tier 1 — Primitive Tokens

_(Populate with project-specific palette)_

```json
{
  "color": {
    "blue":    { "400": "", "500": "", "600": "" },
    "red":     { "500": "", "600": "" },
    "green":   { "500": "", "600": "" },
    "yellow":  { "400": "", "500": "" },
    "neutral": { "0": "", "100": "", "200": "", "700": "", "900": "" }
  },
  "spacing": {
    "1": "4px",  "2": "8px",  "3": "12px", "4": "16px",
    "5": "20px", "6": "24px", "8": "32px", "10": "40px",
    "12": "48px","16": "64px"
  },
  "radius": {
    "sm": "4px", "md": "8px", "lg": "12px", "xl": "16px", "full": "9999px"
  },
  "border-width": {
    "default": "1px", "md": "2px"
  }
}
```

### 4-2. Tier 2 — Semantic Tokens

_(Populate with project-specific mappings)_

```
color.action.primary
color.action.primary.hover
color.action.secondary
color.feedback.error
color.feedback.success
color.feedback.warning
color.feedback.info
color.text.default
color.text.subtle
color.text.disabled
color.text.inverse
color.text.on-action
color.background.surface
color.background.overlay
color.background.subtle
color.border.default
color.border.subtle
color.border.action
```

### 4-3. Tier 3 — Component Tokens

_(Add only after approval; document consuming component)_

|Token|References|Used in|
|---|---|---|
|_(none yet)_|||

---
## References

- **Spec**: W3C DTCG Design Tokens Specification 2025.10 — `designtokens.org`
- **Tooling**: Style Dictionary (amzn/style-dictionary) — CTI convention
- **Naming theory**: Nathan Curtis, "Naming Tokens in Design Systems" (EightShapes)
- **Implementation refs**: Material Design 3, IBM Carbon, Salesforce Lightning, Atlassian Design System
