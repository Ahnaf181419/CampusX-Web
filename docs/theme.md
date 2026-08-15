# CampusX Design Theme

Single source of truth for the web UI design tokens. Ported from the CampusX mobile app
(`campus_x/lib/core/theme/`) so both versions stay visually consistent.

**Theme in one line:** clean, utilitarian, light theme anchored by a deep navy-black —
flat surfaces, high contrast, semantic red/amber accents for priority states.

> **Baseline:** light mode only (matches mobile). Dark mode is a future improvement,
> not part of the current scope.

---

## 1. Color Tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-primary` | `#162032` | Brand color — buttons, selected chips, headers, key text |
| `--color-background` | `#FAFBFC` | Page / scaffold background |
| `--color-text-secondary` | `#6B7B8D` | Secondary text, icons, placeholders |
| `--color-text-muted` | `#CED5DC` | Borders, dividers, disabled states |
| `--color-surface` | `#F0F3F6` | Cards, panels, section surfaces |
| `--color-surface-alt` | `#E4E9EE` | Status badge background, inactive buttons |
| `--color-priority-high` | `#D64045` | High-priority notices, urgent/error states |
| `--color-priority-mid` | `#CF8B2D` | Medium-priority notices, warning states |
| `--color-shadow` | `rgba(22, 32, 50, 0.09)` | Subtle card shadow (`#162032` at 9% opacity) |

### Semantic color rules

- **Red (`#D64045`)** = high priority / urgent / destructive. Never decorative.
- **Amber (`#CF8B2D`)** = medium priority / warning.
- **Low priority** uses default surfaces (`#FAFBFC` / `#E4E9EE`) — no extra color.

---

## 2. CSS Custom Properties

Ready to paste into the client's global stylesheet (e.g. `client/src/index.css`):

```css
:root {
  /* Core identity */
  --color-primary: #162032;
  --color-background: #fafbfc;

  /* Text */
  --color-text-primary: #162032;
  --color-text-secondary: #6b7b8d;
  --color-text-muted: #ced5dc;
  --color-text-inverse: #fafbfc;

  /* Surfaces */
  --color-surface: #f0f3f6;
  --color-surface-alt: #e4e9ee;

  /* Semantic */
  --color-priority-high: #d64045;
  --color-priority-mid: #cf8b2d;

  /* Effects */
  --color-shadow: rgba(22, 32, 50, 0.09);
  --shadow-card: 0 2px 8px var(--color-shadow);
  --radius-card: 12px;
  --radius-chip: 999px;
  --radius-button: 8px;
}
```

---

## 3. Typography

Font family: **Roboto** (system fallback: `system-ui, -apple-system, sans-serif`).

| Style | Size | Weight | Usage |
| --- | --- | --- | --- |
| `header-large` | 48px (3rem) | 700 | Hero / page titles |
| `header-medium` | 24px (1.5rem) | 700 | Section headers, card titles |
| `header-small` | 18px (1.125rem) | 700 | Sub-headers, list group titles |
| `body-large` | 16px (1rem) | 400 | Primary body text |
| `body-medium` | 14px (0.875rem) | 400 | Secondary body, metadata |
| `body-small` | 12px (0.75rem) | 400 | Timestamps, badges, hints |
| `button` | 16px (1rem) | 600 | Buttons (white text on primary bg) |

```css
:root {
  --font-family: "Roboto", system-ui, -apple-system, sans-serif;

  --text-header-large: 3rem;
  --text-header-medium: 1.5rem;
  --text-header-small: 1.125rem;
  --text-body-large: 1rem;
  --text-body-medium: 0.875rem;
  --text-body-small: 0.75rem;
}
```

> The mobile app bundles a monospace accent font (ShareTechMono) but never uses it.
> Web skips it — Roboto only.

---

## 4. UI Conventions

- **Flat design** — no gradients, no heavy shadows. At most one subtle card shadow
  (`--shadow-card`).
- **Filter chips** — pill-shaped (`border-radius: 999px`). Idle: `--color-surface-alt`
  with `--color-text-secondary`. Selected: `--color-primary` background with
  `--color-text-inverse` text.
- **Buttons** — primary buttons are solid `--color-primary` with white text;
  inactive buttons use `--color-surface-alt` with `--color-text-muted` text.
- **Status badges** — small pills on `--color-surface-alt`, `--text-body-small` size.
  Priority overrides the background with `--color-priority-high` / `--color-priority-mid`.
- **Cards** — `--color-surface` or white background, `--radius-card` corners,
  `--shadow-card` shadow, 1px `--color-text-muted` border where separation is needed.

---

## 5. Reference

- Source of truth (mobile): `flutter_projects/campus_x/lib/core/theme/app_colors.dart`,
  `app_text_styles.dart`, `app_theme.dart`
- Proposal context: `docs/idea.md` § 5 (Technology Stack)
