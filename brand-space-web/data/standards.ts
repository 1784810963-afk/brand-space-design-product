import { LocalizedString } from '@/lib/i18n';

// 设计标准数据类型定义
export interface Standard {
  id: string;
  number: number;
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString[];
  pdfUrl: string;
  icon?: string;
  images: string[];
}

// SI3.0 设计标准体系
export const standards: Standard[] = [
  {
    id: 'si3-retail-center',
    number: 1,
    title: {
      zh: 'SI3.0零售中心',
      en: 'SI3.0 Retail Center'
    },
    description: {
      zh: '针对零售中心的完整设计标准体系，涵盖选址、外观、室内设计等全方位规范',
      en: 'Complete design standards system for retail centers, covering site selection, appearance, interior design and comprehensive specifications'
    },
    content: [
      { zh: '场地选址与规划标准', en: 'Site Selection and Planning Standards' },
      { zh: '外观设计规范', en: 'Appearance Design Standards' },
      { zh: '室内空间设计标准', en: 'Interior Space Design Standards' },
      { zh: '照明系统设计规范', en: 'Lighting System Design Standards' },
      { zh: '标识导向系统', en: 'Signage and Wayfinding System' },
      { zh: '材料与节点图集', en: 'Materials and Detail Drawings' }
    ],
    pdfUrl: '/standards/SI3.0-Retail-Center.pdf',
    icon: '🏬',
    images: []
  },
  {
    id: 'si3-comprehensive-center',
    number: 2,
    title: {
      zh: 'SI3.0综合中心',
      en: 'SI3.0 Comprehensive Center'
    },
    description: {
      zh: '针对综合中心的完整设计标准体系，包含多功能空间设计与系统化管理规范',
      en: 'Complete design standards system for comprehensive centers, including multi-functional space design and systematic management specifications'
    },
    content: [
      { zh: '综合功能分区规划', en: 'Comprehensive Functional Zoning' },
      { zh: '多业态空间设计', en: 'Multi-format Space Design' },
      { zh: '公共区域设计标准', en: 'Public Area Design Standards' },
      { zh: '辅助设施系统规范', en: 'Auxiliary Facility System Standards' },
      { zh: '软装与家具配置', en: 'Soft Furnishing and Furniture Configuration' },
      { zh: '运营管理规范', en: 'Operation Management Standards' }
    ],
    pdfUrl: '/standards/SI3.0-Comprehensive-Center.pdf',
    icon: '🏢',
    images: []
  }
];
