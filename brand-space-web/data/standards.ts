// 设计标准数据类型定义
export interface Standard {
  id: string;
  number: number;
  title: string;
  description: string;
  content: string[];
  images: string[];
}

// 9 大设计标准
export const standards: Standard[] = [
  {
    id: 'design-principle',
    number: 1,
    title: '设计总则',
    description: '品牌空间设计的核心原则和指导方向',
    content: [
      '品牌策略',
      '品牌定位',
      '品牌色彩',
      '色彩与材质'
    ],
    images: []
  },
  {
    id: 'site-setting',
    number: 2,
    title: '场地设置原则',
    description: '空间场地的基本规划和设置规范',
    content: [
      '场地类型规划',
      '场地改造选择',
      '场地功能规划'
    ],
    images: []
  },
  {
    id: 'external-design',
    number: 3,
    title: '外观设计原则',
    description: '建筑外观和品牌形象展示规范',
    content: [
      '外观设计规范',
      '外观识别细节'
    ],
    images: []
  },
  {
    id: 'interior-design',
    number: 4,
    title: '室内设计原则',
    description: '室内空间的设计和布置标准',
    content: [
      '设计思路',
      '空间中心',
      '交付中心',
      '服务中心',
      '公用部分',
      '辅助系统设施'
    ],
    images: []
  },
  {
    id: 'wall-furniture',
    number: 5,
    title: '墙面模块 & 家具 & 软装系统原则',
    description: '墙面、家具和软装的规范和应用',
    content: [
      '墙体规则',
      '家具原则',
      '软装品品'
    ],
    images: []
  },
  {
    id: 'lighting-design',
    number: 6,
    title: '照明设计原则',
    description: '照明系统的设计和应用规范',
    content: [
      '外立面照明',
      '候车区照明',
      '室内照明'
    ],
    images: []
  },
  {
    id: 'signage-system',
    number: 7,
    title: '标识系统原则',
    description: '导向和标识的统一规范',
    content: [
      '标识级别',
      '标识细节'
    ],
    images: []
  },
  {
    id: 'material-list',
    number: 8,
    title: '材料清单',
    description: '推荐使用的材料清单',
    content: [
      '主体材料',
      '五金清单'
    ],
    images: []
  },
  {
    id: 'standard-nodes',
    number: 9,
    title: '标准节点图集',
    description: '标准施工节点详图',
    content: [
      '清单目录',
      '天花节点',
      '墙面节点',
      '地面节点',
      '外墙节点',
      '儿童区节点',
      '楼梯节点',
      '门节点'
    ],
    images: []
  }
];
