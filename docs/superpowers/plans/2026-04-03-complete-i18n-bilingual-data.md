# Complete i18n Bilingual Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace incomplete translation mapping with bilingual data structure to fully support English content display

**Architecture:** Transform Project data from single-language to bilingual structure (LocalizedString type), update all components to use locale-aware getters instead of translation lookups, use AI to generate English translations for all project content

**Tech Stack:** TypeScript, Next.js, React, Framer Motion

---

## File Structure Overview

**Files to Modify:**
- `brand-space-web/lib/i18n.ts` - Add LocalizedString type and utility functions
- `brand-space-web/data/projects.ts` - Update Project interface and transform all data to bilingual
- `brand-space-web/components/AppleStyleProjectDetail.tsx` - Replace translateText with getLocalizedValue
- `brand-space-web/components/ProjectCard.tsx` - Replace translateText with getLocalizedValue
- `brand-space-web/components/ProjectsListClient.tsx` - Replace translateText with getLocalizedValue

**Files to Delete:**
- `brand-space-web/lib/translations.ts` - No longer needed

---

## Task 1: Add LocalizedString Type and Utilities

**Files:**
- Modify: `brand-space-web/lib/i18n.ts`

- [ ] **Step 1: Add LocalizedString type definition**

Add to `brand-space-web/lib/i18n.ts` after the existing Locale type:

```typescript
export type LocalizedString = {
  zh: string;
  en: string;
};
```

- [ ] **Step 2: Add type guard function**

Add after LocalizedString type:

```typescript
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
```

- [ ] **Step 3: Add getLocalizedValue utility function**

Add after isLocalizedString:

```typescript
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
```

- [ ] **Step 4: Add getLocalizedArray utility function**

Add after getLocalizedValue:

```typescript
export function getLocalizedArray(
  values: LocalizedString[],
  locale: Locale
): string[] {
  return values.map(v => getLocalizedValue(v, locale));
}
```

- [ ] **Step 5: Verify TypeScript compilation**

Run: `cd brand-space-web && npm run build`
Expected: No errors in lib/i18n.ts

- [ ] **Step 6: Commit type definitions**

```bash
git add brand-space-web/lib/i18n.ts
git commit -m "feat(i18n): add LocalizedString type and utility functions

Add type definitions and helper functions for bilingual content:
- LocalizedString type for {zh, en} objects
- isLocalizedString type guard
- getLocalizedValue to extract locale-specific value
- getLocalizedArray for array handling

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Update Project Interface Definition

**Files:**
- Modify: `brand-space-web/data/projects.ts:1-16`

- [ ] **Step 1: Add LocalizedString import**

Add at the top of `brand-space-web/data/projects.ts` after existing imports:

```typescript
import type { LocalizedString } from '@/lib/i18n';
```

- [ ] **Step 2: Update Project interface**

Replace the existing Project interface (lines 2-16) with:

```typescript
export interface Project {
  id: string;

  // Bilingual fields (user-visible content)
  title: LocalizedString;
  description: LocalizedString;
  details: LocalizedString;
  category: LocalizedString;
  tags: LocalizedString[];
  highlights: LocalizedString[];

  // Single-language fields (no translation needed)
  location?: string;
  area?: string;
  buildingTime?: string;
  image: string;
  images?: string[];
  isRepresentative?: boolean;
}
```

- [ ] **Step 3: Verify TypeScript compilation shows errors**

Run: `cd brand-space-web && npm run build`
Expected: Multiple type errors in rawProjects array (this is expected - we'll fix in next task)

- [ ] **Step 4: Commit interface update**

```bash
git add brand-space-web/data/projects.ts
git commit -m "feat(types): update Project interface for bilingual data

Change fields to LocalizedString type:
- title, description, details, category
- tags, highlights (arrays)

Keep single-language: location, area, buildingTime

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Generate English Translations with AI

**Files:**
- Read: `brand-space-web/data/projects.ts` (lines 198-462 - rawProjects array)
- Create: `brand-space-web/translations-temp.json` (temporary file for translations)

- [ ] **Step 1: Extract all Chinese content needing translation**

Create a temporary file `brand-space-web/translations-temp.json` with this structure (I'll fill in all projects):

```json
{
  "projects": [
    {
      "id": "project-0",
      "title_zh": "北京华贸零售中心",
      "description_zh": "面积777㎡的高级店设计,展现品牌旗舰形象",
      "details_zh": "北京华贸零售中心作为高级店的典范,占地777㎡,位于北京核心商圈。通过精心的空间设计和品牌标准的应用,为客户打造了极致的购物体验。设计充分展现了品牌的高端定位和创新理念。",
      "category_zh": "零售空间",
      "tags_zh": ["高级店", "北京", "华贸"],
      "highlights_zh": ["旗舰店设计", "核心商圈", "极致体验", "高端定位"]
    }
  ]
}
```

- [ ] **Step 2: Use AI to translate all content to English**

For each project, translate:
- title_zh → title_en
- description_zh → description_en
- details_zh → details_en
- category_zh → category_en
- tags_zh → tags_en (array)
- highlights_zh → highlights_en (array)

Use the chat API route to translate, or manually translate with AI assistance.

Translation guidelines:
- Keep terminology consistent ("高级店" → "Premium Store", "零售空间" → "Retail Space")
- Maintain professional tone
- Preserve brand positioning language
- Keep technical terms (like "777㎡") unchanged

- [ ] **Step 3: Create complete translations file**

Update `brand-space-web/translations-temp.json` with all English translations:

```json
{
  "projects": [
    {
      "id": "project-0",
      "title": {"zh": "北京华贸零售中心", "en": "Beijing Huamao Retail Center"},
      "description": {"zh": "面积777㎡的高级店设计,展现品牌旗舰形象", "en": "777㎡ premium store design, showcasing the brand flagship image"},
      "details": {"zh": "北京华贸零售中心作为高级店的典范,占地777㎡,位于北京核心商圈。通过精心的空间设计和品牌标准的应用,为客户打造了极致的购物体验。设计充分展现了品牌的高端定位和创新理念。", "en": "Beijing Huamao Retail Center, as a model of premium stores, occupies 777㎡ in Beijing's core business district. Through meticulous spatial design and application of brand standards, it creates an ultimate shopping experience for customers. The design fully demonstrates the brand's premium positioning and innovative concepts."},
      "category": {"zh": "零售空间", "en": "Retail Space"},
      "tags": [
        {"zh": "高级店", "en": "Premium Store"},
        {"zh": "北京", "en": "Beijing"},
        {"zh": "华贸", "en": "Huamao"}
      ],
      "highlights": [
        {"zh": "旗舰店设计", "en": "Flagship store design"},
        {"zh": "核心商圈", "en": "Core business district"},
        {"zh": "极致体验", "en": "Ultimate experience"},
        {"zh": "高端定位", "en": "Premium positioning"}
      ]
    }
    // ... repeat for all 15+ projects
  ]
}
```

**NOTE:** This step will take 15-20 minutes as it involves translating content for 15+ projects with multiple fields each.

- [ ] **Step 4: Review translations for quality**

Check:
- Consistent terminology across projects
- Natural English phrasing
- No missing translations
- Proper formatting preserved

- [ ] **Step 5: Commit translations file**

```bash
git add brand-space-web/translations-temp.json
git commit -m "chore: add temporary translations file for data migration

Contains bilingual content for all projects generated by AI

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Transform Project Data to Bilingual Structure

**Files:**
- Modify: `brand-space-web/data/projects.ts:198-462` (rawProjects array)
- Read: `brand-space-web/translations-temp.json`

- [ ] **Step 1: Transform first project (project-0) to bilingual format**

Replace project-0 in rawProjects array (lines 199-227) with:

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
    en: 'Beijing Huamao Retail Center, as a model of premium stores, occupies 777㎡ in Beijing\'s core business district. Through meticulous spatial design and application of brand standards, it creates an ultimate shopping experience for customers. The design fully demonstrates the brand\'s premium positioning and innovative concepts.'
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
  isRepresentative: true,
  image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1c97804b-80ab-4caa-9b5c-51569324b6ec.jpg',
  images: [
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1c97804b-80ab-4caa-9b5c-51569324b6ec.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/75dd37d5-fd63-4b6b-af5c-892c025fd8f5.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2b2ede06-f13f-40ce-943e-48fded3d96fc.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/a24af2b2-8652-4f09-a092-6bc91d805f34.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/5610d9f8-ecfe-444b-a5fd-8c8dbebade95.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/741643f8-1c38-4c07-9543-6cd6f54ca43f.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/6bd2cd03-59cf-484f-ba2b-cf899cfc9e3e.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1503d422-275c-4ed9-afc0-1a977c112532.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2587143b-289e-4539-ab91-cc213378b794.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/9c915bea-757d-4cb1-bc2e-915277a354c3.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/9afb26b5-9f48-4275-b7c6-53060bd15c46.jpg',
    'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/a83eb34a-dbc7-42d9-b51f-e991a7456656.jpg'
  ]
},
```

- [ ] **Step 2: Verify TypeScript accepts transformed data**

Run: `cd brand-space-web && npm run build`
Expected: No type errors for project-0, errors remain for other projects

- [ ] **Step 3: Transform all remaining projects**

Apply the same transformation pattern to all 15 projects in rawProjects array. Use translations from `translations-temp.json`.

For each project:
1. Convert title to LocalizedString object
2. Convert description to LocalizedString object
3. Convert details to LocalizedString object
4. Convert category to LocalizedString object
5. Convert each tag to LocalizedString object in array
6. Convert each highlight to LocalizedString object in array
7. Keep location, area, buildingTime, image, images, isRepresentative unchanged

**NOTE:** This is a large mechanical transformation. Consider using a script or careful manual editing.

- [ ] **Step 4: Verify all TypeScript compilation passes**

Run: `cd brand-space-web && npm run build`
Expected: No type errors in data/projects.ts

- [ ] **Step 5: Commit transformed data**

```bash
git add brand-space-web/data/projects.ts
git commit -m "feat(data): transform all projects to bilingual structure

Convert all rawProjects entries to use LocalizedString:
- 15+ projects updated with zh/en content
- Maintain all existing metadata (location, area, etc.)
- All translations from AI-generated content

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Update AppleStyleProjectDetail Component

**Files:**
- Modify: `brand-space-web/components/AppleStyleProjectDetail.tsx`

- [ ] **Step 1: Update imports**

Replace line 11:
```typescript
// OLD:
import { translateText } from '@/lib/translations';

// NEW:
import { getLocalizedValue } from '@/lib/i18n';
```

- [ ] **Step 2: Update title rendering (line 117)**

Replace:
```typescript
// OLD:
{translateText(project.title, locale)}

// NEW:
{getLocalizedValue(project.title, locale)}
```

- [ ] **Step 3: Update description rendering (line 121)**

Replace:
```typescript
// OLD:
{translateText(project.description, locale)}

// NEW:
{getLocalizedValue(project.description, locale)}
```

- [ ] **Step 4: Update details rendering (lines 225-228)**

Replace the paragraph rendering:
```typescript
// OLD:
{project.details.split('\n\n').map((paragraph, index) => (
  <p key={index} className="text-lg text-slate-600 leading-relaxed">
    {paragraph}
  </p>
))}

// NEW:
{getLocalizedValue(project.details, locale).split('\n\n').map((paragraph, index) => (
  <p key={index} className="text-lg text-slate-600 leading-relaxed">
    {paragraph}
  </p>
))}
```

- [ ] **Step 5: Update lightbox alt text (line 353)**

Replace:
```typescript
// OLD:
alt={`${translateText(project.title, locale)} - ${dict.image} ${lightboxIndex + 1}`}

// NEW:
alt={`${getLocalizedValue(project.title, locale)} - ${dict.image} ${lightboxIndex + 1}`}
```

- [ ] **Step 6: Verify TypeScript compilation**

Run: `cd brand-space-web && npm run build`
Expected: No errors in AppleStyleProjectDetail.tsx

- [ ] **Step 7: Test component renders correctly**

Run: `cd brand-space-web && npm run dev`
Navigate to: `http://localhost:3000/en/projects/project-0`
Expected: Project detail page displays in English

Switch to: `http://localhost:3000/zh/projects/project-0`
Expected: Same page displays in Chinese

- [ ] **Step 8: Commit component update**

```bash
git add brand-space-web/components/AppleStyleProjectDetail.tsx
git commit -m "refactor(component): update AppleStyleProjectDetail for bilingual data

Replace translateText with getLocalizedValue:
- Project title, description, details
- Image alt texts

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Update ProjectCard Component

**Files:**
- Modify: `brand-space-web/components/ProjectCard.tsx`

- [ ] **Step 1: Update imports**

Replace line 8:
```typescript
// OLD:
import { translateText } from '@/lib/translations';

// NEW:
import { getLocalizedValue } from '@/lib/i18n';
```

- [ ] **Step 2: Update category rendering (line 60)**

Replace:
```typescript
// OLD:
{translateText(project.category, locale)}

// NEW:
{getLocalizedValue(project.category, locale)}
```

- [ ] **Step 3: Update title rendering (line 70)**

Replace:
```typescript
// OLD:
{translateText(project.title, locale)}

// NEW:
{getLocalizedValue(project.title, locale)}
```

- [ ] **Step 4: Update tags rendering (lines 75-82)**

Replace:
```typescript
// OLD:
{project.tags.slice(0, featured ? 3 : 2).map((tag) => (
  <span
    key={tag}
    className="px-2 py-1 bg-white/20 text-white rounded text-xs backdrop-blur-sm"
  >
    {translateText(tag, locale)}
  </span>
))}

// NEW:
{project.tags.slice(0, featured ? 3 : 2).map((tag, tagIndex) => (
  <span
    key={tagIndex}
    className="px-2 py-1 bg-white/20 text-white rounded text-xs backdrop-blur-sm"
  >
    {getLocalizedValue(tag, locale)}
  </span>
))}
```

Note: Changed `key={tag}` to `key={tagIndex}` since tag is now an object.

- [ ] **Step 5: Update image alt text (line 42)**

Replace:
```typescript
// OLD:
alt={project.title}

// NEW:
alt={getLocalizedValue(project.title, locale)}
```

- [ ] **Step 6: Verify TypeScript compilation**

Run: `cd brand-space-web && npm run build`
Expected: No errors in ProjectCard.tsx

- [ ] **Step 7: Test component renders correctly**

Run: `cd brand-space-web && npm run dev`
Navigate to: `http://localhost:3000/en/projects`
Expected: Project cards display titles, categories, and tags in English

Switch to: `http://localhost:3000/zh/projects`
Expected: Same cards display in Chinese

- [ ] **Step 8: Commit component update**

```bash
git add brand-space-web/components/ProjectCard.tsx
git commit -m "refactor(component): update ProjectCard for bilingual data

Replace translateText with getLocalizedValue:
- Category, title, tags
- Fix key prop to use index for object tags

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: Update ProjectsListClient Component

**Files:**
- Modify: `brand-space-web/components/ProjectsListClient.tsx`

- [ ] **Step 1: Update imports**

Replace line 8:
```typescript
// OLD:
import { translateText } from '@/lib/translations';

// NEW:
import { getLocalizedValue } from '@/lib/i18n';
```

- [ ] **Step 2: Update category button rendering (line 60)**

Replace:
```typescript
// OLD:
{translateText(category, locale)}

// NEW:
{getLocalizedValue(category, locale)}
```

- [ ] **Step 3: Update category filter logic (line 27)**

The filter logic needs to compare LocalizedString objects. Update:

```typescript
// OLD:
const filteredProjects = selectedCategory
  ? projects.filter(p => p.category === selectedCategory)
  : projects;

// NEW:
const filteredProjects = selectedCategory
  ? projects.filter(p =>
      p.category.zh === selectedCategory.zh &&
      p.category.en === selectedCategory.en
    )
  : projects;
```

- [ ] **Step 4: Update useState type (line 20)**

Replace:
```typescript
// OLD:
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

// NEW:
import type { LocalizedString } from '@/lib/i18n';
const [selectedCategory, setSelectedCategory] = useState<LocalizedString | null>(null);
```

- [ ] **Step 5: Verify TypeScript compilation**

Run: `cd brand-space-web && npm run build`
Expected: No errors in ProjectsListClient.tsx

- [ ] **Step 6: Test component functionality**

Run: `cd brand-space-web && npm run dev`
Navigate to: `http://localhost:3000/en/projects`
Expected:
- Category filter buttons display in English
- Clicking a category filters projects correctly
- Selected category button is highlighted

Switch to: `http://localhost:3000/zh/projects`
Expected: Same functionality with Chinese labels

- [ ] **Step 7: Commit component update**

```bash
git add brand-space-web/components/ProjectsListClient.tsx
git commit -m "refactor(component): update ProjectsListClient for bilingual data

Replace translateText with getLocalizedValue:
- Category filter buttons
- Update filter comparison for LocalizedString objects
- Update useState type for selectedCategory

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: Remove Old Translation System

**Files:**
- Delete: `brand-space-web/lib/translations.ts`
- Delete: `brand-space-web/translations-temp.json` (temporary file)

- [ ] **Step 1: Verify no remaining imports of translateText**

Run: `cd brand-space-web && grep -r "translateText" --include="*.tsx" --include="*.ts" .`
Expected: No results (all imports removed)

- [ ] **Step 2: Verify no remaining imports of translations.ts**

Run: `cd brand-space-web && grep -r "from '@/lib/translations'" --include="*.tsx" --include="*.ts" .`
Expected: No results

Run: `cd brand-space-web && grep -r "from \"@/lib/translations\"" --include="*.tsx" --include="*.ts" .`
Expected: No results

- [ ] **Step 3: Delete translations.ts file**

Run: `rm brand-space-web/lib/translations.ts`

- [ ] **Step 4: Delete temporary translations file**

Run: `rm brand-space-web/translations-temp.json`

- [ ] **Step 5: Verify TypeScript compilation**

Run: `cd brand-space-web && npm run build`
Expected: Clean build with no errors

- [ ] **Step 6: Commit deletions**

```bash
git add -A
git commit -m "refactor: remove old translation mapping system

Delete obsolete files:
- lib/translations.ts (replaced by bilingual data)
- translations-temp.json (temporary migration file)

All components now use getLocalizedValue directly

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: Comprehensive Testing and Verification

**Files:**
- Test: All modified components and pages

- [ ] **Step 1: Test home page in Chinese**

Run: `cd brand-space-web && npm run dev`
Navigate to: `http://localhost:3000/zh`

Verify:
- Hero section displays correctly
- Representative projects show Chinese titles
- Project cards show Chinese categories and tags
- All UI elements in Chinese

- [ ] **Step 2: Test home page in English**

Navigate to: `http://localhost:3000/en`

Verify:
- Hero section displays in English
- Representative projects show English titles
- Project cards show English categories and tags
- All UI elements in English
- No Chinese characters visible (except addresses)

- [ ] **Step 3: Test project list page in Chinese**

Navigate to: `http://localhost:3000/zh/projects`

Verify:
- All project cards display Chinese content
- Category filters show Chinese labels
- Clicking filters works correctly
- Project count updates appropriately

- [ ] **Step 4: Test project list page in English**

Navigate to: `http://localhost:3000/en/projects`

Verify:
- All project cards display English content
- Category filters show English labels ("Retail Space", "Event Space", etc.)
- Filter functionality works correctly
- No Chinese content in cards (except specific addresses)

- [ ] **Step 5: Test project detail pages in Chinese**

Navigate to: `http://localhost:3000/zh/projects/project-0`

Verify:
- Project title in hero section is Chinese
- Project description is Chinese
- Project information cards (area, location, time) display correctly
- Details section shows Chinese text
- Image gallery works
- "Browse More Projects" button is Chinese

Repeat for at least 3 different projects (different categories).

- [ ] **Step 6: Test project detail pages in English**

Navigate to: `http://localhost:3000/en/projects/project-0`

Verify:
- Project title in hero section is English
- Project description is English
- Project information cards display correctly
- Details section shows English translation
- Image gallery works
- "Browse More Projects" button is English
- Location and technical details (area, time) retained as-is

Repeat for at least 3 different projects.

- [ ] **Step 7: Test language switching**

Start at: `http://localhost:3000/zh/projects/project-0`
- Click language switcher to "EN"
- Verify URL changes to `/en/projects/project-0`
- Verify all content switches to English
- Click language switcher to "中文"
- Verify URL changes back to `/zh/projects/project-0`
- Verify all content switches to Chinese

Repeat from home page and project list page.

- [ ] **Step 8: Test browser console for errors**

With dev server running, open browser console.

Navigate through:
- Home page (both languages)
- Projects page (both languages)
- 3+ project detail pages (both languages)

Verify:
- No React errors
- No TypeScript errors
- No 404s for resources
- No warnings about missing translations

- [ ] **Step 9: Test responsive layouts with English text**

Resize browser to mobile width (375px).

Navigate to English pages:
- Home page - verify text fits, no overflow
- Project list - verify cards render properly
- Project detail - verify title/description don't break layout

English text is often longer than Chinese. Ensure:
- Buttons don't break
- Cards maintain aspect ratio
- No horizontal scroll
- Text wraps appropriately

- [ ] **Step 10: Production build test**

Run: `cd brand-space-web && npm run build`
Expected: Build completes successfully with no errors

Run: `cd brand-space-web && npm start`
Navigate to: `http://localhost:3000/en`

Verify:
- Production build serves correctly
- All pages load
- No console errors
- Performance is acceptable

- [ ] **Step 11: Document any issues found**

If any issues discovered during testing:
1. Document the issue
2. Determine if it's a blocker or can be fixed later
3. If blocker, fix immediately before final commit
4. If minor, create a follow-up task

- [ ] **Step 12: Final commit**

```bash
git add -A
git commit -m "test: verify complete i18n implementation

Tested:
- All pages in both zh and en locales
- Language switching functionality
- Category filtering with bilingual data
- Responsive layouts with English text
- Production build

All tests passing, no regressions detected

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Success Criteria Checklist

After completing all tasks, verify:

- [ ] All project content displays in English when locale is 'en'
- [ ] All project content displays in Chinese when locale is 'zh'
- [ ] Language switching works seamlessly on all pages
- [ ] TypeScript compilation passes with no errors
- [ ] No console errors in browser (dev or prod)
- [ ] UI layouts remain intact with English translations (no overflow/breaking)
- [ ] Category filtering works with bilingual category data
- [ ] Image alt texts are properly localized
- [ ] Old `translations.ts` file is removed and not imported anywhere
- [ ] Production build completes successfully
- [ ] No Chinese text visible in English mode (except addresses/locations)
- [ ] All tags and highlights properly translated
- [ ] Project details (long-form text) fully translated

---

## Rollback Plan

If critical issues are discovered after implementation:

1. Revert to pre-migration commit:
   ```bash
   git log --oneline -20  # Find commit before "feat(i18n): add LocalizedString type"
   git revert <commit-hash>..HEAD
   ```

2. Alternative: Cherry-pick revert individual changes:
   ```bash
   git revert <commit-hash>  # Revert specific problematic commit
   ```

3. Emergency fix approach:
   - Keep bilingual data structure
   - Add fallback in `getLocalizedValue` to return Chinese if English missing
   - Fix specific translations incrementally

---

## Notes for Implementation

**AI Translation (Task 3):**
- Most time-consuming task (15-20 minutes)
- Use consistent terminology across all projects
- Review critical content (titles, descriptions) for quality
- Batch translate similar content to maintain consistency

**Data Transformation (Task 4):**
- Mechanical but error-prone task
- Consider scripting if comfortable with Node.js
- Double-check all LocalizedString objects have both 'zh' and 'en' keys
- Verify no typos in property names

**Testing (Task 9):**
- Don't skip responsive testing - English is often longer than Chinese
- Test edge cases: very long project names, many tags, long descriptions
- Verify image loading and lightbox still work correctly

**TypeScript:**
- Type system will catch most migration errors
- If build fails, read error messages carefully - they'll point to exact line
- Use type inference where possible, explicit types where helpful

**Performance:**
- Bilingual data ~doubles string storage (~50-100KB increase)
- No runtime translation overhead
- Initial page load unchanged
- Consider code splitting if bundle size becomes concern
