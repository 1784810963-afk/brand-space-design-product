# Complete i18n Solution with Bilingual Data Structure

**Date:** 2026-04-03
**Status:** Approved for Implementation
**Approach:** Bilingual data structure with selective field translation

## Problem Statement

The current English version of the website still displays Chinese content in project details pages. While UI elements (buttons, navigation) are properly translated, project-specific content (titles, descriptions, details, categories, tags, highlights) remains in Chinese.

**Current Issues:**
- Project titles, descriptions, and details display in Chinese on English pages
- Categories and tags are not fully translated
- The existing `translations.ts` mapping approach is incomplete and hard to maintain
- Project location, area, buildingTime are hardcoded in Chinese

## Design Goals

1. **Complete Translation Coverage:** All user-visible project content should be translatable
2. **Maintainability:** Translations stored with data, not in separate mapping files
3. **Performance:** No runtime translation overhead, pre-translated data
4. **Type Safety:** Full TypeScript support with compile-time checks
5. **Backward Compatibility:** Gradual migration without breaking existing code

## Architecture Overview

### Core Approach: Selective Bilingual Data Structure

We will transform the data structure to store Chinese and English versions together for fields that need translation, while keeping non-translatable fields (like specific addresses) as single-language strings.

### Type System

```typescript
// lib/i18n.ts

export type LocalizedString = {
  zh: string;
  en: string;
};

export function isLocalizedString(value: any): value is LocalizedString {
  return (
    typeof value === 'object' &&
    value !== null &&
    'zh' in value &&
    'en' in value &&
    typeof value.zh === 'string' &&
    typeof value.en === 'string'
  );
}

export function getLocalizedValue<T = string>(
  value: T | LocalizedString,
  locale: Locale
): T {
  if (isLocalizedString(value)) {
    return value[locale] as T;
  }
  // Backward compatibility: if plain string, return as-is
  return value as T;
}

export function getLocalizedArray(
  values: LocalizedString[],
  locale: Locale
): string[] {
  return values.map(v => getLocalizedValue(v, locale));
}
```

### Data Structure

```typescript
// data/projects.ts

export interface Project {
  id: string;

  // Bilingual fields (user-visible content that needs translation)
  title: LocalizedString;
  description: LocalizedString;
  details: LocalizedString;
  category: LocalizedString;
  tags: LocalizedString[];
  highlights: LocalizedString[];

  // Single-language fields (no translation needed)
  location?: string;        // Specific address, keep in Chinese
  area?: string;            // e.g., "777㎡"
  buildingTime?: string;    // e.g., "2024/01/27"
  image: string;
  images?: string[];
  isRepresentative?: boolean;
}
```

**Example Data:**

```typescript
{
  id: 'project-0',
  title: {
    zh: '北京华贸零售中心',
    en: 'Beijing Huamao Retail Center'
  },
  description: {
    zh: '面积777㎡的高级店设计,展现品牌旗舰形象',
    en: '777㎡ premium store design, showcasing the brand flagship image'
  },
  details: {
    zh: '北京华贸零售中心作为高级店的典范,占地777㎡,位于北京核心商圈。通过精心的空间设计和品牌标准的应用,为客户打造了极致的购物体验。设计充分展现了品牌的高端定位和创新理念。',
    en: 'Beijing Huamao Retail Center, as a model of premium stores, occupies 777㎡ in the core business district of Beijing. Through meticulous spatial design and application of brand standards, it creates an ultimate shopping experience for customers. The design fully demonstrates the brand\'s high-end positioning and innovative concepts.'
  },
  category: {
    zh: '零售空间',
    en: 'Retail Space'
  },
  tags: [
    { zh: '高级店', en: 'Premium Store' },
    { zh: '北京', en: 'Beijing' },
    { zh: '华贸', en: 'Huamao' }
  ],
  highlights: [
    { zh: '旗舰店设计', en: 'Flagship store design' },
    { zh: '核心商圈', en: 'Core business district' },
    { zh: '极致体验', en: 'Ultimate experience' },
    { zh: '高端定位', en: 'Premium positioning' }
  ],
  location: '北京市朝阳区建国路89号院华贸商业街11号楼L03号',
  area: '777㎡',
  buildingTime: '2024/01/27',
  // ...
}
```

## Implementation Plan

### Phase 1: Type Definitions and Utilities (5 min)

**Files to create/modify:**
- `lib/i18n.ts` - Add `LocalizedString` type and utility functions
- `data/projects.ts` - Update `Project` interface

**Deliverables:**
- Type-safe `LocalizedString` definition
- `getLocalizedValue()` function with backward compatibility
- `getLocalizedArray()` helper for arrays
- Type guard `isLocalizedString()`

### Phase 2: Data Migration (15-20 min)

**Translation Strategy:**
Use AI to translate all project content fields:
- title
- description
- details
- category
- tags
- highlights

**Process:**
1. Extract all Chinese content from `rawProjects` array
2. Generate English translations using AI
3. Transform data structure to bilingual format
4. Update `rawProjects` in `data/projects.ts`

**Quality Assurance:**
- Human review of critical translations (titles, descriptions)
- Verify consistency in terminology (e.g., "Premium Store" for "高级店")
- Check character limits don't break UI layouts

### Phase 3: Component Updates (10-15 min)

**Files to modify:**

1. **AppleStyleProjectDetail.tsx**
   - Replace `import { translateText }` with `import { getLocalizedValue }`
   - Update all project field accesses:
     - Line 117: `{getLocalizedValue(project.title, locale)}`
     - Line 121: `{getLocalizedValue(project.description, locale)}`
     - Lines 225-228: `{getLocalizedValue(project.details, locale)}`
     - Tags/highlights loops: use `getLocalizedValue()` or `getLocalizedArray()`

2. **ProjectCard.tsx**
   - Replace `translateText` import
   - Line 60: `{getLocalizedValue(project.category, locale)}`
   - Line 70: `{getLocalizedValue(project.title, locale)}`
   - Lines 75-82: `{getLocalizedValue(tag, locale)}`

3. **ProjectsListClient.tsx**
   - Replace `translateText` import
   - Line 60: `{getLocalizedValue(category, locale)}`

4. **Hero.tsx** (if applicable)
   - Update any project data display

**Files to delete:**
- `lib/translations.ts` - No longer needed

### Phase 4: Testing and Verification (5-10 min)

**Test Cases:**

1. **Language Switching**
   - Navigate to project detail page in Chinese
   - Switch to English using LanguageSwitcher
   - Verify all content changes to English
   - Switch back to Chinese, verify content reverts

2. **Project List Page**
   - View category filters in both languages
   - Verify project cards display correct titles/tags/categories

3. **Home Page**
   - Check representative projects display correctly
   - Verify project descriptions are translated

4. **Edge Cases**
   - Long English translations don't break layouts
   - Special characters render correctly
   - Image alt texts are translated

## Component Integration

### Before (Old Approach)

```typescript
// Old: translations.ts lookup
import { translateText } from '@/lib/translations';

<h1>{translateText(project.title, locale)}</h1>
```

**Problems:**
- Incomplete translation coverage
- Separate mapping file to maintain
- Easy to miss new content

### After (New Approach)

```typescript
// New: direct data access
import { getLocalizedValue } from '@/lib/i18n';

<h1>{getLocalizedValue(project.title, locale)}</h1>
```

**Benefits:**
- Translations stored with data
- Type-safe access
- Complete coverage guaranteed by type system
- No separate mapping files

## Data Flow

```
User selects language (zh/en)
         ↓
Locale stored in URL path (/{locale}/...)
         ↓
Components receive locale prop
         ↓
getLocalizedValue(data, locale) extracts correct language
         ↓
Render translated content
```

## Type Safety Guarantees

TypeScript will enforce:
- All new projects must have bilingual fields
- Components using project data must handle LocalizedString
- Compile errors if translation missing

**Example Compile Error:**

```typescript
// This will error:
const project: Project = {
  title: '北京华贸零售中心', // Error: Type 'string' not assignable to LocalizedString
  ...
}

// Correct:
const project: Project = {
  title: { zh: '北京华贸零售中心', en: 'Beijing Huamao Retail Center' },
  ...
}
```

## Migration Safety

**Backward Compatibility:**

The `getLocalizedValue()` function includes fallback logic:

```typescript
export function getLocalizedValue<T = string>(
  value: T | LocalizedString,
  locale: Locale
): T {
  if (isLocalizedString(value)) {
    return value[locale] as T;
  }
  // If still plain string, return as-is (backward compatible)
  return value as T;
}
```

This allows:
- Gradual migration of data
- No runtime errors if some fields aren't migrated yet
- Smooth rollout

## Performance Considerations

**No Runtime Overhead:**
- Translations are pre-computed and stored
- `getLocalizedValue()` is a simple object property access
- No HTTP requests or async operations
- Negligible memory increase (~2x for translated strings)

**Bundle Size:**
- Additional ~50-100KB for English translations
- All data in single file, tree-shakable if needed
- No external translation libraries

## Future Extensibility

**Adding More Languages:**

If supporting more languages in the future:

```typescript
export type LocalizedString = {
  zh: string;
  en: string;
  ja?: string;  // Optional Japanese
  ko?: string;  // Optional Korean
};

export function getLocalizedValue<T = string>(
  value: T | LocalizedString,
  locale: Locale
): T {
  if (isLocalizedString(value)) {
    // Fallback chain: requested locale → English → Chinese
    return (value[locale] || value.en || value.zh) as T;
  }
  return value as T;
}
```

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI translation quality issues | Medium | Human review of critical content; iterative improvements |
| Missing component updates | High | Use global search for `translateText` to find all usages |
| TypeScript compilation errors | Low | Run `npm run build` before committing |
| Layout breaks with longer English text | Medium | Test all pages with English locale; adjust CSS if needed |
| Forgot to delete old translation file | Low | Explicit task to delete `lib/translations.ts` |

## Success Criteria

- [ ] All project content displays in English when locale is 'en'
- [ ] All project content displays in Chinese when locale is 'zh'
- [ ] Language switching works seamlessly on all pages
- [ ] TypeScript compilation passes with no errors
- [ ] No console errors in browser
- [ ] UI layouts remain intact with English translations
- [ ] Old `translations.ts` file is removed

## Timeline Estimate

| Phase | Estimated Time |
|-------|---------------|
| Type definitions and utilities | 5 min |
| Data migration (AI translation) | 15-20 min |
| Component updates | 10-15 min |
| Testing and verification | 5-10 min |
| **Total** | **35-50 min** |

## Appendix: Complete File Changes

### Files to Create
- None (all modifications to existing files)

### Files to Modify
- `lib/i18n.ts`
- `data/projects.ts`
- `components/AppleStyleProjectDetail.tsx`
- `components/ProjectCard.tsx`
- `components/ProjectsListClient.tsx`
- `components/Hero.tsx` (if applicable)

### Files to Delete
- `lib/translations.ts`

### Import Changes

**Remove everywhere:**
```typescript
import { translateText } from '@/lib/translations';
```

**Add everywhere:**
```typescript
import { getLocalizedValue, getLocalizedArray } from '@/lib/i18n';
import type { LocalizedString } from '@/lib/i18n';
```
