# 🎨 Visual Style Guide

## Color Palette

### Primary Colors
```
Purple Gradient: #667eea → #764ba2
Usage: Headers, buttons, primary elements
```

### Secondary Colors
```
Pink Gradient: #f093fb → #f5576c
Usage: Statistics cards, accents
```

### Accent Colors
```
Blue Gradient: #4facfe → #00f2fe
Usage: Links, highlights, info elements
```

### Neutral Colors

#### Light Mode
```
Background: #f5f7fa → #c3cfe2
Cards: rgba(255, 255, 255, 0.95)
Text: #333333
Secondary Text: #666666
Borders: #e0e0e0
```

#### Dark Mode
```
Background: #1e1e2e → #2d2d44
Cards: rgba(45, 45, 68, 0.95)
Text: #e0e0e0
Secondary Text: #b8b8d1
Borders: #4a4a6a
```

---

## Typography

### Font Family
```css
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
Monospace: 'Fira Code', source-code-pro, Menlo, Monaco, Consolas
```

### Font Sizes
```css
Hero Heading: 2.5rem (40px)
Page Heading: 2rem (32px)
Section Heading: 1.8rem (29px)
Subsection Heading: 1.3rem (21px)
Body Text: 1rem (16px)
Small Text: 0.9rem (14px)
Tiny Text: 0.85rem (13px)
```

### Font Weights
```css
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

---

## Spacing System

### Margins & Padding
```css
xs: 5px
sm: 10px
md: 20px
lg: 30px
xl: 40px
xxl: 50px
```

### Grid Gaps
```css
Card Grid: 25px
Chart Grid: 30px
Table Cells: 15px
```

---

## Border Radius

```css
Small: 8px (badges, buttons)
Medium: 12px (inputs, small cards)
Large: 20px (main cards, containers)
Circle: 50% (icons, avatars)
```

---

## Shadows

### Light Mode
```css
Small: 0 2px 10px rgba(0, 0, 0, 0.05)
Medium: 0 10px 40px rgba(0, 0, 0, 0.1)
Large: 0 15px 50px rgba(0, 0, 0, 0.15)
```

### Dark Mode
```css
Small: 0 2px 10px rgba(0, 0, 0, 0.2)
Medium: 0 10px 40px rgba(0, 0, 0, 0.3)
Large: 0 15px 50px rgba(0, 0, 0, 0.4)
```

---

## Animations

### Duration
```css
Fast: 0.2s (micro-interactions)
Normal: 0.3s (standard transitions)
Slow: 0.6s (entrance animations)
Ambient: 2s-20s (background animations)
```

### Timing Functions
```css
Standard: ease
In: ease-in
Out: ease-out
In-Out: ease-in-out
Linear: linear (spinners, continuous)
```

### Common Animations
```css
fadeIn: opacity 0 → 1
fadeInUp: opacity + translateY
slideDown: translateY(-30px) → 0
bounce: translateY with spring
pulse: scale with repeat
spin: rotate 360deg infinite
float: multi-directional movement
```

---

## Components

### Buttons

#### Primary Button
```css
Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Padding: 10px 24px
Border-radius: 10px
Font-weight: 600
Box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3)

Hover:
  transform: translateY(-2px)
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4)
```

#### Disabled Button
```css
Background: linear-gradient(135deg, #cccccc 0%, #999999 100%)
Opacity: 0.6
Cursor: not-allowed
```

### Cards

#### Statistics Card
```css
Background: rgba(255, 255, 255, 0.95)
Backdrop-filter: blur(10px)
Border-radius: 20px
Padding: 30px
Box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1)
Border-top: 4px gradient

Hover:
  transform: translateY(-8px)
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15)
```

### Tables

#### Header Row
```css
Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Color: white
Padding: 18px 15px
Font-weight: 600
Text-transform: uppercase
```

#### Body Row
```css
Background: white
Border-bottom: 1px solid #f0f0f0

Hover:
  background: #f8f9ff
  transform: scale(1.01)
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1)
```

### Badges

#### Sold Badge
```css
Background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)
Color: #006644
Padding: 4px 12px
Border-radius: 20px
Font-weight: 600
```

#### Available Badge
```css
Background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)
Color: #883000
```

---

## Icons & Emojis

### Icon Usage
```
📊 - Dashboard/Overview
💰 - Money/Sales
✅ - Success/Sold
📦 - Inventory/Stock
📋 - Transactions/List
📈 - Charts/Growth
🥧 - Pie Chart
📅 - Calendar/Date
🔍 - Search
🌙 - Dark Mode
☀️ - Light Mode
```

### Icon Sizes
```css
Small: 1.2rem
Medium: 1.5rem
Large: 2rem
Extra Large: 2.5rem
```

---

## Responsive Breakpoints

```css
/* Small Mobile */
@media (max-width: 480px) {
  Container padding: 15px 10px
  Font sizes: -10%
  Card padding: 20px
}

/* Mobile */
@media (max-width: 768px) {
  Stack layouts
  Full-width elements
  Larger touch targets (44px minimum)
}

/* Tablet */
@media (max-width: 1024px) {
  Adjust grid columns
  Flexible layouts
  Moderate spacing
}

/* Desktop */
@media (min-width: 1024px) {
  Multi-column layouts
  Side-by-side elements
  Optimal spacing
}
```

---

## Accessibility

### Color Contrast Ratios
```
Normal Text: Minimum 4.5:1
Large Text: Minimum 3:1
Interactive Elements: Minimum 3:1
```

### Focus States
```css
Outline: 2px solid #667eea
Outline-offset: 2px
Box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)
```

### Interactive Sizes
```
Minimum touch target: 44px × 44px
Recommended: 48px × 48px
```

---

## Loading States

### Spinner
```css
Size: 50px
Border: 4px
Border-color: rgba(255, 255, 255, 0.3)
Border-top-color: #ffffff
Animation: spin 1s linear infinite
```

### Skeleton
```css
Background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)
Height: 20px
Margin: 10px 0
Border-radius: 4px
Animation: skeleton-loading 1.5s ease-in-out infinite
```

---

## Chart Styling

### Bar Chart
```css
Bar Color: rgba(102, 126, 234, 0.8)
Border: 2px solid rgba(102, 126, 234, 1)
Border-radius: 8px
Height: 350px
```

### Pie Chart
```css
Height: 400px
Legend: bottom
Colors: Gradient-based palette (8 colors)
Border-width: 2px
Hover-offset: 15px
```

### Tooltips
```css
Background: rgba(0, 0, 0, 0.8)
Padding: 12px
Border-radius: 8px
Color: white
Font-size: 13px
```

---

## Best Practices

### DO's ✅
- Use consistent spacing multiples (5px, 10px, 20px, 30px)
- Apply gradients consistently
- Maintain color contrast ratios
- Use smooth transitions (0.3s ease)
- Add hover states to interactive elements
- Include loading states for async operations
- Test on multiple screen sizes
- Use semantic HTML

### DON'Ts ❌
- Mix gradient directions inconsistently
- Use too many different font sizes
- Forget dark mode styling
- Skip responsive breakpoints
- Ignore accessibility standards
- Overuse animations
- Use inline styles excessively
- Neglect keyboard navigation

---

## Quick Reference

### Most Used Colors
```css
--primary: #667eea
--secondary: #764ba2
--accent: #f093fb
--success: #28a745
--danger: #dc3545
--text-light: #666666
--text-dark: #333333
```

### Most Used Spacing
```css
--spacing-xs: 10px
--spacing-sm: 20px
--spacing-md: 30px
--spacing-lg: 40px
```

### Most Used Transitions
```css
transition: all 0.3s ease
transition: transform 0.3s ease
transition: box-shadow 0.3s ease
transition: background 0.3s ease
```

---

This style guide ensures consistency across the entire dashboard and provides a reference for future development and customization.
