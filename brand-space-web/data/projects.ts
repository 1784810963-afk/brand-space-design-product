// 项目数据类型定义
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  details: string;
  highlights: string[];
  location?: string;
  area?: string;
  buildingTime?: string;
  images?: string[];
  isRepresentative?: boolean; // 是否为代表性案例（首页展示）
}

// 示例项目数据
export const projects: Project[] = [
  // 门店空间设计 - 零售空间
  {
    id: 'project-1',
    title: '上海前滩L+PLAZA零售中心',
    description: '面积528㎡的高级店设计，打造科技与家庭融合的极致体验',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/28126bc6-1b79-46a8-9a9b-1620eb9ac8c2.jpg',
    category: '零售空间',
    tags: ['高级店', '科技感', '温暖调性'],
    location: '上海市浦东新区东育路345号1层07、08单元',
    area: '528㎡',
    isRepresentative: true, // 零售空间代表性案例
    details: '上海前滩L+PLAZA零售中心外立面采用通透玻璃结构，打通室内和室外空间，形成丰富的空间体验动线。室内着重为用户提供极佳的功能区体验感，家具强调品质细节。店内整体以暖色调为基础，具有温暖触感的胡桃木色作为主色、辅以深沉的暖金色，既营造出家的温暖又凸显产品的豪华感。专业的场景氛围灯光设计，让整个空间舒适温馨。',
    highlights: ['通透玻璃结构', '暖色调设计', '极致视觉体验', '灯光设计专业'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/28126bc6-1b79-46a8-9a9b-1620eb9ac8c2.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/b28dd5c5-de7e-49dc-a73d-1425f89c4a65.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/ba2407de-7110-4d3c-9565-d6bde51980fa.jpg'
    ]
  },
  {
    id: 'project-2',
    title: '上海长宁来福士门店',
    description: '面积392㎡的高级店设计，打造品牌形象展示的重要窗口',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/714958ee-70d1-4d4a-9191-dbc30820c492.jpg',
    category: '零售空间',
    tags: ['高级店', '来福士', '上海'],
    location: '上海市长宁区长宁路1191号长宁来福士西区1楼北门',
    area: '392㎡',
    details: '上海长宁来福士门店作为高级店设计范例，充分展现了品牌的品质与风格。通过精心的空间规划和设计标准应用，为客户营造了舒适、专业的购物体验。店铺设计融合了品牌的核心价值理念，完美体现了设计标准中的视觉规范、照明设计和标识系统的应用。',
    highlights: ['高级店范例', '空间规划优化', '品牌风格展现', '购物体验优化'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/714958ee-70d1-4d4a-9191-dbc30820c492.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/3d04d58f-8115-46ae-aa1c-98284f08f839.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/665aee1e-79d7-41e8-90a2-72a86bc3296e.jpg'
    ]
  },
  {
    id: 'project-3',
    title: '成都银泰城零售中心',
    description: '面积260㎡的标准店设计，体现设计标准的规范应用',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/5ec81e5c-243c-4825-92b2-2775425a4bbe.jpg',
    category: '零售空间',
    tags: ['标准店', '规范', '成都'],
    location: '四川省成都市武侯区益州大道中段1999号银泰城2号门',
    area: '260㎡',
    details: '成都银泰城零售中心项目充分体现了设计标准在零售空间中的完整应用。通过系统的设计方法论，为品牌打造了统一的视觉体验和优化的空间布局。项目注重品牌识别一致性、空间规划和材料应用，提升了客户的购物体验。',
    highlights: ['标准化应用', '空间布局优化', '品牌一致性', '客户体验提升'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/5ec81e5c-243c-4825-92b2-2775425a4bbe.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/18eb00e6-58f2-4b73-801d-bdc83f5f3995.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/b3339968-f877-4d5a-b231-9c9b8d233efc.jpg'
    ]
  },
  {
    id: 'project-4',
    title: '宁波江北综合中心',
    description: '面积926㎡的标准店设计，展现多层次空间体验',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/c08f2e43-9d7c-481c-8cd7-2d81990b6c03.jpg',
    category: '零售空间',
    tags: ['标准店', '综合中心', '宁波'],
    location: '浙江省宁波市江北区江北大道395号193幢1-3',
    area: '926㎡',
    details: '宁波江北综合中心是大型零售空间的典范，面积926㎡。通过精妙的空间分区和布局规划，营造了多层次的购物体验。项目充分运用设计标准的各项原则，从外观设计、室内布局、照明系统到标识导向，打造了高效而舒适的零售环境。',
    highlights: ['大面积设计', '多层次体验', '空间分区合理', '购物环境优化'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/c08f2e43-9d7c-481c-8cd7-2d81990b6c03.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/538a2e94-00fe-4c57-be74-dbc3d2866c7a.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/c5b2b8b9-61ae-4b20-8dd4-ae68dacf73d1.jpg'
    ]
  },
  // 配套空间
  {
    id: 'project-5',
    title: '北京展厅接待空间设计',
    description: '面积833㎡的展厅设计，打造专业的品牌接待环境',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/6e077cef-09c2-4a85-8e14-7e079e361bb7.jpg',
    category: '配套空间',
    tags: ['展厅', '接待空间', '北京'],
    location: '北京市',
    area: '833㎡',
    isRepresentative: true, // 配套空间代表性案例
    details: '北京展厅是品牌形象展示的重要窗口。通过精心的空间规划和设计标准应用，打造了专业、高效的接待环境。融合了品牌的核心价值理念，为访客提供了沉浸式的品牌体验。充分体现了设计标准中的视觉规范、照明设计和标识系统的应用。',
    highlights: ['专业接待环境', '沉浸式体验', '视觉规范应用', '标识系统完善'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/6e077cef-09c2-4a85-8e14-7e079e361bb7.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/e5298397-8426-46c5-8f88-95d7229b15a0.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/dc8c5299-ae05-4e80-b7a2-94dfa882f6e3.jpg'
    ]
  },
  // 活动空间设计
  {
    id: 'project-6',
    title: '上海国际车展',
    description: '面积1620㎡的大型活动空间，现场搭建7天',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/ebf7be14-1e15-4cc3-9192-5fedf1552b7b.jpg',
    category: '活动空间',
    tags: ['车展', '活动空间', '上海'],
    location: '上海国际车展',
    area: '1620㎡',
    buildingTime: '现场搭建7天',
    isRepresentative: true, // 活动空间代表性案例
    details: '上海国际车展 MEGA 展区是大型活动空间设计的典范。占地面积1620㎡，通过精心的设计规划和快速搭建能力，在7天内完成现场搭建。展区充分展现了品牌的创新理念和产品特色，为参观者营造了沉浸式的产品体验。',
    highlights: ['大型展区设计', '快速搭建能力', '沉浸式体验', '产品展示优化'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/ebf7be14-1e15-4cc3-9192-5fedf1552b7b.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/0fbf69e2-0f40-4d1e-8536-6716d8715c15.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/ff9dccac-66eb-4a5e-a6c9-5cadf1aa1961.jpg'
    ]
  },
  {
    id: 'project-7',
    title: '2025 MEGA HOME 巡展 - 北京蓝色港湾',
    description: '面积150㎡的巡展空间，制作20天+搭建2天',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2f175aab-8e37-4e18-8ed3-65b965996223.jpg',
    category: '活动空间',
    tags: ['巡展', 'MEGA HOME', '北京'],
    location: '北京蓝色港湾',
    area: '150㎡',
    buildingTime: '制作20天，现场搭建2天',
    details: '2025 MEGA HOME 系列巡展北京蓝色港湾站，通过精心的设计和制作，打造了150㎡的高品质展示空间。整个项目周期包括20天的制作和2天的现场搭建，充分展现了品牌对细节的执着追求和快速反应能力。',
    highlights: ['高品质展示', '精细制作工艺', '快速反应能力', '品牌展现专业'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2f175aab-8e37-4e18-8ed3-65b965996223.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/e190edb0-fd26-4abb-a685-cbe7772f98de.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/28f31261-edde-4119-b6ab-75fd3046bf54.jpg'
    ]
  },
  {
    id: 'project-8',
    title: 'MEGA 动静态展 - 阿那亚',
    description: '面积100㎡的外展空间，制作15天+搭建4天',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/a17ac9de-050f-4a59-b3ec-40a7b60f37c4.jpg',
    category: '活动空间',
    tags: ['外展', '动静态展', '阿那亚'],
    location: '阿那亚',
    area: '100㎡',
    buildingTime: '制作15天，现场搭建4天',
    details: 'MEGA 动静态展览在阿那亚的呈现，充分体现了品牌的创意与创新。占地100㎡的展示空间，通过15天的精细制作和4天的现场搭建，打造了融动态与静态元素于一身的沉浸式展览体验。',
    highlights: ['创意展示设计', '动静结合', '沉浸式体验', '工艺精细'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/a17ac9de-050f-4a59-b3ec-40a7b60f37c4.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/c410a26a-afe0-4847-a5e4-6642056eaf5f.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1fc2f162-6673-4964-b46a-8fbc02ecdbdb.jpg'
    ]
  },
  // 创意专项设计
  {
    id: 'project-9',
    title: '漆板展示设计',
    description: '创意专项设计 - 漆板颜色展示与选装指南',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/398a8a5b-e5b7-4269-8b20-c78d95040b2b.jpg',
    category: '创意专项',
    tags: ['漆板展示', '创意设计', '颜色展示'],
    details: '漆板展示设计包括基础色+内饰和特殊色两个展板。文字信息铭牌、漆板、内饰均为活动式，可根据展车上新进行灵活替换。这一创意设计充分体现了品牌对细节的关注和设计的灵活性。',
    highlights: ['活动式设计', '灵活替换', '颜色展示完整', '客户指导专业'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/398a8a5b-e5b7-4269-8b20-c78d95040b2b.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/15d8af26-89fc-4544-9513-422f3bf08a40.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/e7200146-b7d7-4127-a330-7ed742441f14.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/47a49d04-ad17-4ad0-a43d-25e5e0514b25.jpg'
    ]
  },
  {
    id: 'project-10',
    title: '智能眼镜陈列设计',
    description: '创意专项设计 - 智能眼镜展台与展墙',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/79e5aa96-8dae-4d0d-9124-31746c77ed36.jpg',
    category: '创意专项',
    tags: ['眼镜陈列', '创意设计', '展示系统'],
    isRepresentative: true, // 创意专项代表性案例
    details: '智能眼镜陈列设计包括专业的展台和展墙系统。展台采用人性化的陈列设计，便于客户试戴和了解产品。展墙通过系统化的布局和照明设计，充分展现了眼镜产品的特色和品质。整个设计充分考虑了客户体验和产品展示效果。',
    highlights: ['人性化陈列', '专业展示系统', '照明设计优化', '客户体验完善'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/79e5aa96-8dae-4d0d-9124-31746c77ed36.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/099f7b8e-54dd-40ff-8d06-8575dd5daced.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/76a99c09-72e5-4307-98a7-6d3d11ad0856.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/ccd951ae-9371-45bb-bc1e-bd493e469860.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/66c8a703-f220-4004-accf-19b7789a43ca.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/9d6d4403-fcfb-486c-bd9e-6d93553612a7.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/f7e1141f-ae57-4bed-99d3-e03d710fa5d7.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/69371eb0-5f6a-43b7-af44-b61eaaf0749f.jpg'
    ]
  }
];

