# Mootable Design System

## 🎯 Design Philosophy

**"Where Ideas Take Flight"** - Mootable, fikirlerin özgürce tartışıldığı, sofistike ve entelektüel bir platform. 
Tasarım dili: **Minimal Brutalizm + Editorial Design** karışımı.

### İlham Kaynakları
- **Stripe** - Clean typography, generous whitespace
- **Linear** - Smooth animations, dark mode excellence
- **Notion** - Functional elegance
- **Awwwards** kazanan siteler - Typographic hierarchy, micro-interactions

---

## 🎨 Color Palette

### Primary: Honey Gold (Bal Sarısı)
Sıcak, davetkar, entelektüel tartışmayı simgeler.

```
--honey-50:  #FFFBEB   (Background tint)
--honey-100: #FEF3C7   (Subtle backgrounds)
--honey-200: #FDE68A   (Borders, dividers)
--honey-300: #FCD34D   (Hover states)
--honey-400: #FBBF24   (Primary accent)
--honey-500: #F59E0B   (Main brand color) ← PRIMARY
--honey-600: #D97706   (Pressed states)
--honey-700: #B45309   (Dark accent)
--honey-800: #92400E   (Text on light)
--honey-900: #78350F   (Darkest)
```

### Neutrals: Warm Charcoal
Saf siyah yerine, sıcak gri tonları.

```
--ink-50:  #FAFAF9    (Light background)
--ink-100: #F5F5F4    (Cards on light)
--ink-200: #E7E5E4    (Borders)
--ink-300: #D6D3D1    (Disabled)
--ink-400: #A8A29E    (Placeholder)
--ink-500: #78716C    (Secondary text)
--ink-600: #57534E    (Body text)
--ink-700: #44403C    (Headings)
--ink-800: #292524    (Dark surface)
--ink-900: #1C1917    (Darkest background) ← DARK MODE BG
--ink-950: #0C0A09    (Pure dark)
```

### Semantic Colors
```
--success: #059669   (Emerald)
--warning: #D97706   (Amber - matches honey)
--error:   #DC2626   (Red)
--info:    #0284C7   (Sky blue)
```

### Dark Mode (Default)
```
Background:      --ink-950 (#0C0A09)
Surface:         --ink-900 (#1C1917)
Surface Elevated: --ink-800 (#292524)
Border:          --ink-700 (#44403C)
Text Primary:    --ink-50 (#FAFAF9)
Text Secondary:  --ink-400 (#A8A29E)
Accent:          --honey-500 (#F59E0B)
Accent Hover:    --honey-400 (#FBBF24)
```

---

## 📝 Typography

### Font Stack
```css
--font-display: 'Playfair Display', Georgia, serif;  /* Headings - Editorial feel */
--font-body: 'Inter', -apple-system, sans-serif;     /* Body - Clean & readable */
--font-mono: 'JetBrains Mono', monospace;            /* Code */
```

### Type Scale (Desktop)
```
Display:    72px / 1.0  / -0.02em / Playfair Display Bold
H1:         48px / 1.1  / -0.02em / Playfair Display Bold
H2:         36px / 1.2  / -0.01em / Playfair Display SemiBold
H3:         28px / 1.3  / -0.01em / Inter SemiBold
H4:         22px / 1.4  / 0       / Inter SemiBold
H5:         18px / 1.4  / 0       / Inter Medium
Body Large: 18px / 1.6  / 0       / Inter Regular
Body:       16px / 1.6  / 0       / Inter Regular
Body Small: 14px / 1.5  / 0       / Inter Regular
Caption:    12px / 1.4  / 0.01em  / Inter Medium
Overline:   11px / 1.4  / 0.1em   / Inter SemiBold UPPERCASE
```

---

## 🪑 Logo Concept

### Mootable Logo
Yuvarlak bir masa etrafında eşit mesafede üç sandalye - toplantı, tartışma, eşitlik sembolü.

```
Structure:
- Outer circle: Table edge (stroke)
- Inner circle: Table surface (filled subtle)
- 3 chairs: 120° apart, minimalist chair silhouettes
- Optional: Subtle glow/shadow under chairs
```

### Logo Variants
1. **Full Logo**: Icon + "mootable" wordmark
2. **Icon Only**: For favicon, small spaces
3. **Horizontal**: Icon left, text right
4. **Stacked**: Icon top, text bottom

### Logo Colors
- Dark mode: Honey gold icon, white text
- Light mode: Honey gold icon, ink-900 text
- Monochrome: Single color for special uses

---

## 🧩 Component Patterns

### Buttons
```
Primary:    bg-honey-500, text-ink-950, hover:bg-honey-400
Secondary:  bg-transparent, border-ink-700, text-ink-50, hover:border-honey-500
Ghost:      bg-transparent, text-ink-400, hover:text-honey-500
Danger:     bg-error, text-white

Border Radius: 8px (rounded-lg)
Padding: 12px 24px (default)
Font: Inter Medium, 14px
Transition: all 200ms ease
```

### Cards
```
Background: ink-900/50 with backdrop-blur
Border: 1px solid ink-800
Border Radius: 16px
Padding: 24px
Shadow: 0 4px 24px rgba(0,0,0,0.2)
Hover: border-ink-700, subtle translateY(-2px)
```

### Inputs
```
Background: ink-900
Border: 1px solid ink-700
Border Radius: 8px
Padding: 12px 16px
Focus: border-honey-500, ring-2 ring-honey-500/20
Placeholder: ink-500
```

### Social Login Buttons
```
Style: Full-width, 48px height, icon left aligned
Google: White bg, dark text, Google colors icon
Microsoft: White bg, dark text, MS logo
```

---

## ✨ Micro-interactions

### Hover Effects
- Links: Underline animation (left to right)
- Buttons: Subtle scale(1.02) + glow
- Cards: Lift effect (translateY -4px) + border glow

### Transitions
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

### Loading States
- Skeleton: Shimmer animation with honey gradient
- Spinner: Rotating honey-colored arc
- Progress: Honey fill with subtle glow

---

## 📐 Layout Principles

### Spacing Scale
```
4px  (1)   - Tight elements
8px  (2)   - Related elements
12px (3)   - Form gaps
16px (4)   - Section padding
24px (6)   - Card padding
32px (8)   - Section gaps
48px (12)  - Major sections
64px (16)  - Page sections
96px (24)  - Hero spacing
```

### Grid System
- Max width: 1280px (7xl)
- Columns: 12
- Gutter: 24px
- Margins: 16px (mobile), 32px (tablet), 64px (desktop)

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 📄 Page-Specific Design

### Landing Page Sections
1. **Hero**: Full viewport, animated logo, tagline, dual CTA
2. **Value Props**: 3-column grid, icons, short descriptions
3. **How It Works**: Numbered steps with illustrations
4. **Testimonials/Social Proof**: Carousel or grid
5. **Features Deep Dive**: Alternating layout with visuals
6. **CTA Section**: Final conversion push
7. **Footer**: Links, social, newsletter

### Auth Pages (Login/Register)
- Split layout: Left side form, right side branding/illustration
- Clean, centered form on mobile
- Social login buttons prominent
- Subtle background pattern/texture
- Password strength indicator (register)
- "Remember me" checkbox
- Clear error states

---

## 🎭 Visual Elements

### Background Patterns
- Subtle dot grid (ink-800 dots on ink-950)
- Noise texture overlay (very subtle, 2-3% opacity)
- Gradient meshes for hero sections

### Illustrations Style
- Line art with honey accent
- Geometric, abstract
- Consistent 2px stroke weight

### Icons
- Lucide icons (current)
- 24px default size
- 1.5px stroke weight
- Honey color for interactive, ink-400 for decorative

---

## 🚀 Implementation Priority

1. **Phase 1**: Colors, Typography, Base components
2. **Phase 2**: Logo, Landing page
3. **Phase 3**: Auth pages (Login/Register)
4. **Phase 4**: Dashboard shell, navigation
5. **Phase 5**: Feature pages, polishing

