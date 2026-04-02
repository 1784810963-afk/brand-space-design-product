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

// Feishu file_key 到本地图片路径的映射表
const feishuToLocalImageMap: Record<string, string> = {
  // 北京华贸零售中心
  '1c97804b-80ab-4caa-9b5c-51569324b6ec': '/project-images/1c97804b-80ab-4caa-9b5c-51569324b6ec.jpg',
  '75dd37d5-fd63-4b6b-af5c-892c025fd8f5': '/project-images/75dd37d5-fd63-4b6b-af5c-892c025fd8f5.jpg',
  '2b2ede06-f13f-40ce-943e-48fded3d96fc': '/project-images/2b2ede06-f13f-40ce-943e-48fded3d96fc.jpg',
  'a24af2b2-8652-4f09-a092-6bc91d805f34': '/project-images/a24af2b2-8652-4f09-a092-6bc91d805f34.jpg',
  '5610d9f8-ecfe-444b-a5fd-8c8dbebade95': '/project-images/5610d9f8-ecfe-444b-a5fd-8c8dbebade95.jpg',
  '741643f8-1c38-4c07-9543-6cd6f54ca43f': '/project-images/741643f8-1c38-4c07-9543-6cd6f54ca43f.jpg',
  '6bd2cd03-59cf-484f-ba2b-cf899cfc9e3e': '/project-images/6bd2cd03-59cf-484f-ba2b-cf899cfc9e3e.jpg',
  '1503d422-275c-4ed9-afc0-1a977c112532': '/project-images/1503d422-275c-4ed9-afc0-1a977c112532.jpg',
  '2587143b-289e-4539-ab91-cc213378b794': '/project-images/2587143b-289e-4539-ab91-cc213378b794.jpg',
  '9c915bea-757d-4cb1-bc2e-915277a354c3': '/project-images/9c915bea-757d-4cb1-bc2e-915277a354c3.jpg',
  '9afb26b5-9f48-4275-b7c6-53060bd15c46': '/project-images/9afb26b5-9f48-4275-b7c6-53060bd15c46.jpg',
  'a83eb34a-dbc7-42d9-b51f-e991a7456656': '/project-images/a83eb34a-dbc7-42d9-b51f-e991a7456656.jpg',
  // 上海前滩L+PLAZA
  '28126bc6-1b79-46a8-9a9b-1620eb9ac8c2': '/project-images/28126bc6-1b79-46a8-9a9b-1620eb9ac8c2.jpg',
  'b28dd5c5-de7e-49dc-a73d-1425f89c4a65': '/project-images/b28dd5c5-de7e-49dc-a73d-1425f89c4a65.jpg',
  'ba2407de-7110-4d3c-9565-d6bde51980fa': '/project-images/ba2407de-7110-4d3c-9565-d6bde51980fa.jpg',
  '114889c5-df67-4c2d-8a68-5ea6f88072af': '/project-images/114889c5-df67-4c2d-8a68-5ea6f88072af.jpg',
  '7c58ffb9-cf92-41be-95a6-9a72bc97819a': '/project-images/7c58ffb9-cf92-41be-95a6-9a72bc97819a.jpg',
  '1f83ea74-59a7-409c-b059-030b9891f013': '/project-images/1f83ea74-59a7-409c-b059-030b9891f013.jpg',
  'f02cda96-79ec-4476-af44-1956a41af6fc': '/project-images/f02cda96-79ec-4476-af44-1956a41af6fc.jpg',
  // 上海长宁来福士
  '714958ee-70d1-4d4a-9191-dbc30820c492': '/project-images/714958ee-70d1-4d4a-9191-dbc30820c492.jpg',
  '3d04d58f-8115-46ae-aa1c-98284f08f839': '/project-images/3d04d58f-8115-46ae-aa1c-98284f08f839.jpg',
  '665aee1e-79d7-41e8-90a2-72a86bc3296e': '/project-images/665aee1e-79d7-41e8-90a2-72a86bc3296e.jpg',
  '27865229-db87-4f09-85c8-3e36777e7f23': '/project-images/27865229-db87-4f09-85c8-3e36777e7f23.jpg',
  'f50e4e22-3531-4916-a5bb-4e322432ec74': '/project-images/f50e4e22-3531-4916-a5bb-4e322432ec74.jpg',
  'e59c2c16-a787-4e17-bbca-ea2b9778347f': '/project-images/e59c2c16-a787-4e17-bbca-ea2b9778347f.jpg',
  '2c979c63-4670-446f-bf07-76f80ec7f0ea': '/project-images/2c979c63-4670-446f-bf07-76f80ec7f0ea.jpg',
  '104c7c52-efe2-48c2-859c-658e467f450f': '/project-images/104c7c52-efe2-48c2-859c-658e467f450f.jpg',
  '0d5698bb-a2b4-44ad-869e-4aceb446625b': '/project-images/0d5698bb-a2b4-44ad-869e-4aceb446625b.jpg',
  // 北京祥云小镇零售中心
  'd9e14c98-2c13-426e-a752-0cc05c9aba9e': '/project-images/d9e14c98-2c13-426e-a752-0cc05c9aba9e.jpg',
  '1e273090-226d-4f4e-bb3d-3bc1a8deccdc': '/project-images/1e273090-226d-4f4e-bb3d-3bc1a8deccdc.jpg',
  '13e20cb9-4fba-4d58-b951-762201269952': '/project-images/13e20cb9-4fba-4d58-b951-762201269952.jpg',
  'dd19f071-1f1b-493d-9c7e-dba479216a9a': '/project-images/dd19f071-1f1b-493d-9c7e-dba479216a9a.jpg',
  '596f5147-2b99-4add-badb-41c6e12afba4': '/project-images/596f5147-2b99-4add-badb-41c6e12afba4.jpg',
  // 北京来广营零售中心
  'e2a9452b-dbb3-4860-abd2-7bd35460aa0b': '/project-images/e2a9452b-dbb3-4860-abd2-7bd35460aa0b.jpg',
  '049194a5-9127-40c1-84f3-e0ae0565537d': '/project-images/049194a5-9127-40c1-84f3-e0ae0565537d.jpg',
  '17e4c0dd-0d02-41b2-9114-3d3cd3975d06': '/project-images/17e4c0dd-0d02-41b2-9114-3d3cd3975d06.jpg',
  '65706194-ad10-4d32-a2e7-ff78c50b81e8': '/project-images/65706194-ad10-4d32-a2e7-ff78c50b81e8.jpg',
  '10cc90a7-97e7-42f4-bd65-4f54302f3b10': '/project-images/10cc90a7-97e7-42f4-bd65-4f54302f3b10.jpg',
  // 成都银泰城
  '5ec81e5c-243c-4825-92b2-2775425a4bbe': '/project-images/5ec81e5c-243c-4825-92b2-2775425a4bbe.jpg',
  '18eb00e6-58f2-4b73-801d-bdc83f5f3995': '/project-images/18eb00e6-58f2-4b73-801d-bdc83f5f3995.jpg',
  'b3339968-f877-4d5a-b231-9c9b8d233efc': '/project-images/b3339968-f877-4d5a-b231-9c9b8d233efc.jpg',
  '3f307b52-bc69-4c33-856b-21dcf6aa7762': '/project-images/3f307b52-bc69-4c33-856b-21dcf6aa7762.jpg',
  'd9dafcd2-ed50-4c4c-9b99-6c0fdeab25e0': '/project-images/d9dafcd2-ed50-4c4c-9b99-6c0fdeab25e0.jpg',
  // 宁波江北综合中心
  'c08f2e43-9d7c-481c-8cd7-2d81990b6c03': '/project-images/c08f2e43-9d7c-481c-8cd7-2d81990b6c03.jpg',
  '538a2e94-00fe-4c57-be74-dbc3d2866c7a': '/project-images/538a2e94-00fe-4c57-be74-dbc3d2866c7a.jpg',
  'c5b2b8b9-61ae-4b20-8dd4-ae68dacf73d1': '/project-images/c5b2b8b9-61ae-4b20-8dd4-ae68dacf73d1.jpg',
  // 北京展厅
  '6e077cef-09c2-4a85-8e14-7e079e361bb7': '/project-images/6e077cef-09c2-4a85-8e14-7e079e361bb7.jpg',
  'daf61809-ff0b-4f29-9614-433717fc9f9c': '/project-images/daf61809-ff0b-4f29-9614-433717fc9f9c.jpg',
  'c3ead5fd-a4bb-44ad-b8c3-17f8ecb0c79b': '/project-images/c3ead5fd-a4bb-44ad-b8c3-17f8ecb0c79b.jpg',
  'ca155180-8b5a-4d89-83e6-ce9f6e5a9c41': '/project-images/ca155180-8b5a-4d89-83e6-ce9f6e5a9c41.jpg',
  '6e35b37f-407d-4497-acb4-3cb015b61fb9': '/project-images/6e35b37f-407d-4497-acb4-3cb015b61fb9.jpg',
  '99d231d5-cae9-4e21-9764-8b1aa553de8e': '/project-images/99d231d5-cae9-4e21-9764-8b1aa553de8e.jpg',
  '11c49598-cf0a-4328-b932-fdc2c1c17f9e': '/project-images/11c49598-cf0a-4328-b932-fdc2c1c17f9e.jpg',
  'f98f35ed-7e56-4219-ac13-93868b7b4250': '/project-images/f98f35ed-7e56-4219-ac13-93868b7b4250.jpg',
  'e5298397-8426-46c5-8f88-95d7229b15a0': '/project-images/e5298397-8426-46c5-8f88-95d7229b15a0.jpg',
  'dc8c5299-ae05-4e80-b7a2-94dfa882f6e3': '/project-images/dc8c5299-ae05-4e80-b7a2-94dfa882f6e3.jpg',
  // 上海国际车展
  'ebf7be14-1e15-4cc3-9192-5fedf1552b7b': '/project-images/ebf7be14-1e15-4cc3-9192-5fedf1552b7b.jpg',
  '18e3bbe0-1aed-4c30-bad2-79c6c826d43e': '/project-images/18e3bbe0-1aed-4c30-bad2-79c6c826d43e.jpg',
  '013e8135-ccd9-4920-8a67-02693106d9d9': '/project-images/013e8135-ccd9-4920-8a67-02693106d9d9.jpg',
  '871abad0-25b0-41bf-ae7f-ed6b0be6c3d4': '/project-images/871abad0-25b0-41bf-ae7f-ed6b0be6c3d4.jpg',
  '857d3b65-e7d2-40fc-b42e-7b1006f35037': '/project-images/857d3b65-e7d2-40fc-b42e-7b1006f35037.jpg',
  '1ad7ccc5-4ab9-4898-81a6-42a4c124cde1': '/project-images/1ad7ccc5-4ab9-4898-81a6-42a4c124cde1.jpg',
  '44fc211e-de1a-43fa-9b7b-3a8f5786ccfa': '/project-images/44fc211e-de1a-43fa-9b7b-3a8f5786ccfa.jpg',
  '5c550e8d-b923-4a4d-ad11-65ba127eb770': '/project-images/5c550e8d-b923-4a4d-ad11-65ba127eb770.jpg',
  '0f616616-6a86-4536-9a22-1917e214fa15': '/project-images/0f616616-6a86-4536-9a22-1917e214fa15.jpg',
  'e498b07f-957d-44e2-9bd7-c6dd1681a77d': '/project-images/e498b07f-957d-44e2-9bd7-c6dd1681a77d.jpg',
  'd2b767f3-6e61-4912-8497-45573d7433d1': '/project-images/d2b767f3-6e61-4912-8497-45573d7433d1.jpg',
  'b1c27430-4ac5-4056-aecb-b7320a797980': '/project-images/b1c27430-4ac5-4056-aecb-b7320a797980.jpg',
  'eeeacf9b-c765-41eb-84b8-0b9ab605c760': '/project-images/eeeacf9b-c765-41eb-84b8-0b9ab605c760.jpg',
  '23b0d798-01f2-4e6a-9998-eb85da22509a': '/project-images/23b0d798-01f2-4e6a-9998-eb85da22509a.jpg',
  '286f64de-5885-4c7a-84aa-4df22ceb375f': '/project-images/286f64de-5885-4c7a-84aa-4df22ceb375f.jpg',
  'aa75b8df-1865-4e7e-b7fb-7aa53b313563': '/project-images/aa75b8df-1865-4e7e-b7fb-7aa53b313563.jpg',
  'a51cc998-eb13-47a7-8019-7d1e88ecbbf6': '/project-images/a51cc998-eb13-47a7-8019-7d1e88ecbbf6.jpg',
  '0fbf69e2-0f40-4d1e-8536-6716d8715c15': '/project-images/0fbf69e2-0f40-4d1e-8536-6716d8715c15.jpg',
  'ff9dccac-66eb-4a5e-a6c9-5cadf1aa1961': '/project-images/ff9dccac-66eb-4a5e-a6c9-5cadf1aa1961.jpg',
  // 巡展 - 北京蓝色港湾
  '2f175aab-8e37-4e18-8ed3-65b965996223': '/project-images/2f175aab-8e37-4e18-8ed3-65b965996223.jpg',
  '8164c2fb-09b7-4a09-8be7-ed6fac28c94c': '/project-images/8164c2fb-09b7-4a09-8be7-ed6fac28c94c.jpg',
  'daa9681c-f19e-4ddc-88a3-8bbd56e3b83d': '/project-images/daa9681c-f19e-4ddc-88a3-8bbd56e3b83d.jpg',
  '074211ad-947f-42a3-9ecd-8ad92bb3a442': '/project-images/074211ad-947f-42a3-9ecd-8ad92bb3a442.jpg',
  'b14c75c8-060e-4ac1-a90f-63a41d967866': '/project-images/b14c75c8-060e-4ac1-a90f-63a41d967866.jpg',
  '35d2e2df-31cc-4cc8-89cd-5a74a9442798': '/project-images/35d2e2df-31cc-4cc8-89cd-5a74a9442798.jpg',
  '0d266c9f-8c43-4739-a710-e65fe7028e99': '/project-images/0d266c9f-8c43-4739-a710-e65fe7028e99.jpg',
  '84bf1abb-a218-4d25-a22e-fcde51d643f6': '/project-images/84bf1abb-a218-4d25-a22e-fcde51d643f6.jpg',
  '0cf19814-b277-4b75-8226-7617264c34b1': '/project-images/0cf19814-b277-4b75-8226-7617264c34b1.jpg',
  '763ef566-c2fe-4f65-8f66-d55309f32afb': '/project-images/763ef566-c2fe-4f65-8f66-d55309f32afb.jpg',
  '5e66bfeb-d2c9-4498-8f78-e9bb8a805af3': '/project-images/5e66bfeb-d2c9-4498-8f78-e9bb8a805af3.jpg',
  '7443d81d-ed18-40f6-9bfe-218839da8efe': '/project-images/7443d81d-ed18-40f6-9bfe-218839da8efe.jpg',
  '7de90c0c-2392-4564-82af-178e4eda4884': '/project-images/7de90c0c-2392-4564-82af-178e4eda4884.jpg',
  'f138f39f-25fe-4588-ae35-6a39a8177732': '/project-images/f138f39f-25fe-4588-ae35-6a39a8177732.jpg',
  // MEGA动静态展-阿那亚
  'a17ac9de-050f-4a59-b3ec-40a7b60f37c4': '/project-images/a17ac9de-050f-4a59-b3ec-40a7b60f37c4.jpg',
  'c410a26a-afe0-4847-a5e4-6642056eaf5f': '/project-images/c410a26a-afe0-4847-a5e4-6642056eaf5f.jpg',
  '1fc2f162-6673-4964-b46a-8fbc02ecdbdb': '/project-images/1fc2f162-6673-4964-b46a-8fbc02ecdbdb.jpg',
  '5801f776-80a6-43d2-9daf-82c2829a644e': '/project-images/5801f776-80a6-43d2-9daf-82c2829a644e.jpg',
  '20385a12-17fa-46c2-920e-c05f564bba40': '/project-images/20385a12-17fa-46c2-920e-c05f564bba40.jpg',
  '78401e8a-bdc9-49c3-af88-8036365fb6f8': '/project-images/78401e8a-bdc9-49c3-af88-8036365fb6f8.jpg',
  '83461045-18c9-42e3-9eb9-9f4c4e62af39': '/project-images/83461045-18c9-42e3-9eb9-9f4c4e62af39.jpg',
  // 阿那亚童话月外展
  'ac4166b0-3c88-46b0-b976-9bac65690944': '/project-images/ac4166b0-3c88-46b0-b976-9bac65690944.jpg',
  'e57fbbea-3f40-447a-8782-634631525a75': '/project-images/e57fbbea-3f40-447a-8782-634631525a75.jpg',
  '8d6a0348-a7c1-4dcc-902c-3a1eca9204ec': '/project-images/8d6a0348-a7c1-4dcc-902c-3a1eca9204ec.jpg',
  'd6a00828-e5f0-40db-b4b2-b4c8e3abc3eb': '/project-images/d6a00828-e5f0-40db-b4b2-b4c8e3abc3eb.jpg',
  '3139af25-8b3b-4bbc-9ab0-ac9735e0fcab': '/project-images/3139af25-8b3b-4bbc-9ab0-ac9735e0fcab.jpg',
  '068a46e1-c035-487c-b467-e7e417b3e3bd': '/project-images/068a46e1-c035-487c-b467-e7e417b3e3bd.jpg',
  '0ad00eb4-a40c-43b0-9c2f-ca64895f0401': '/project-images/0ad00eb4-a40c-43b0-9c2f-ca64895f0401.jpg',
  '8f46e9aa-bdb1-4d3b-9820-a31916c369df': '/project-images/8f46e9aa-bdb1-4d3b-9820-a31916c369df.jpg',
  '34a9a72b-952f-4501-afdc-76bde0c3554c': '/project-images/34a9a72b-952f-4501-afdc-76bde0c3554c.jpg',
  '9f9ba575-2d5b-4c20-9b21-e24112d0b66f': '/project-images/9f9ba575-2d5b-4c20-9b21-e24112d0b66f.jpg',
  // 阿勒泰文旅合作
  'c6541b35-f911-4859-9061-7dd81172137c': '/project-images/c6541b35-f911-4859-9061-7dd81172137c.jpg',
  '001011db-9534-4145-8a45-f7d3fefa54c8': '/project-images/001011db-9534-4145-8a45-f7d3fefa54c8.jpg',
  '0680f913-0d75-4da4-bbf6-bf0781933ff0': '/project-images/0680f913-0d75-4da4-bbf6-bf0781933ff0.jpg',
  '48470988-6787-4872-9f5c-d8872a9169cb': '/project-images/48470988-6787-4872-9f5c-d8872a9169cb.jpg',
  'a49058a3-a759-43c3-8a74-4db3df7d0431': '/project-images/a49058a3-a759-43c3-8a74-4db3df7d0431.jpg',
  '868b6d9e-1c02-4bcd-9019-24f70b4f5caf': '/project-images/868b6d9e-1c02-4bcd-9019-24f70b4f5caf.jpg',
  '773ed854-cb63-4bf7-951d-abc18ee6c2c8': '/project-images/773ed854-cb63-4bf7-951d-abc18ee6c2c8.jpg',
  '27120304-71c7-4980-a2d5-482b936dbb35': '/project-images/27120304-71c7-4980-a2d5-482b936dbb35.jpg',
  '894cb647-b2a0-4d6f-9148-935f35b28e00': '/project-images/894cb647-b2a0-4d6f-9148-935f35b28e00.jpg',
  'df89e4e6-7d2b-4029-837c-c6b4d4afcb21': '/project-images/df89e4e6-7d2b-4029-837c-c6b4d4afcb21.jpg',
  '01e1d017-53f1-44e6-a08c-41dd330cea42': '/project-images/01e1d017-53f1-44e6-a08c-41dd330cea42.jpg',
  // 漆板展示
  '398a8a5b-e5b7-4269-8b20-c78d95040b2b': '/project-images/398a8a5b-e5b7-4269-8b20-c78d95040b2b.jpg',
  '15d8af26-89fc-4544-9513-422f3bf08a40': '/project-images/15d8af26-89fc-4544-9513-422f3bf08a40.jpg',
  'e7200146-b7d7-4127-a330-7ed742441f14': '/project-images/e7200146-b7d7-4127-a330-7ed742441f14.jpg',
  '47a49d04-ad17-4ad0-a43d-25e5e0514b25': '/project-images/47a49d04-ad17-4ad0-a43d-25e5e0514b25.jpg',
  // 智能眼镜
  '79e5aa96-8dae-4d0d-9124-31746c77ed36': '/project-images/79e5aa96-8dae-4d0d-9124-31746c77ed36.jpg',
  '099f7b8e-54dd-40ff-8d06-8575dd5daced': '/project-images/099f7b8e-54dd-40ff-8d06-8575dd5daced.jpg',
  '76a99c09-72e5-4307-98a7-6d3d11ad0856': '/project-images/76a99c09-72e5-4307-98a7-6d3d11ad0856.jpg',
  'ccd951ae-9371-45bb-bc1e-bd493e469860': '/project-images/ccd951ae-9371-45bb-bc1e-bd493e469860.jpg',
  '66c8a703-f220-4004-accf-19b7789a43ca': '/project-images/66c8a703-f220-4004-accf-19b7789a43ca.jpg',
  '9d6d4403-fcfb-486c-bd9e-6d93553612a7': '/project-images/9d6d4403-fcfb-486c-bd9e-6d93553612a7.jpg',
  'f7e1141f-ae57-4bed-99d3-e03d710fa5d7': '/project-images/f7e1141f-ae57-4bed-99d3-e03d710fa5d7.jpg',
  '69371eb0-5f6a-43b7-af44-b61eaaf0749f': '/project-images/69371eb0-5f6a-43b7-af44-b61eaaf0749f.jpg',
};

// 从 Feishu URL 提取 file_key
function extractFileKey(url: string): string | null {
  const match = url.match(/file_key=feishu-service\/([a-f0-9-]+)/);
  return match ? match[1] : null;
}

// 将 Feishu URL 转换为本地路径（开发环境）
function feishuUrlToLocal(url: string): string {
  const fileKey = extractFileKey(url);
  if (fileKey && feishuToLocalImageMap[fileKey]) {
    return feishuToLocalImageMap[fileKey];
  }
  return url; // 如果没有对应的本地文件，返回原 URL
}

// 根据环境返回适当的图片URL
function processProjectImages(projects: Project[]): Project[] {
  // 仅在开发环境使用本地图片
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

  if (!isDevelopment) {
    return projects;
  }

  return projects.map(project => ({
    ...project,
    image: feishuUrlToLocal(project.image),
    images: project.images?.map(url => feishuUrlToLocal(url))
  }));
}

// 示例项目数据(原始数据)
const rawProjects: Project[] = [
  // 门店空间设计 - 高级店
  {
    id: 'project-0',
    title: '北京华贸零售中心',
    description: '面积777㎡的高级店设计,展现品牌旗舰形象',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1c97804b-80ab-4caa-9b5c-51569324b6ec.jpg',
    category: '零售空间',
    tags: ['高级店', '北京', '华贸'],
    location: '北京市朝阳区建国路89号院华贸商业街11号楼L03号',
    area: '777㎡',
    buildingTime: '2024/01/27',
    isRepresentative: true,
    details: '北京华贸零售中心作为高级店的典范,占地777㎡,位于北京核心商圈。通过精心的空间设计和品牌标准的应用,为客户打造了极致的购物体验。设计充分展现了品牌的高端定位和创新理念。',
    highlights: ['旗舰店设计', '核心商圈', '极致体验', '高端定位'],
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
    id: 'project-2-5',
    title: '北京祥云小镇零售中心',
    description: '面积1114㎡的高级店设计,展现大型零售空间的品牌魅力',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/d9e14c98-2c13-426e-a752-0cc05c9aba9e.jpg',
    category: '零售空间',
    tags: ['高级店', '北京', '祥云小镇'],
    location: '北京市顺义区安泰大街9号院中粮·祥云小镇4号楼1层',
    area: '1114㎡',
    buildingTime: '2024/10/31',
    details: '北京祥云小镇零售中心是大型高级店的代表,占地1114㎡。通过精心的空间规划和品牌标准的应用,为客户打造了开阔舒适的购物环境。设计充分体现了品牌的高端定位和服务理念。',
    highlights: ['大型高级店', '开阔空间', '舒适环境', '品牌定位'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/d9e14c98-2c13-426e-a752-0cc05c9aba9e.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/1e273090-226d-4f4e-bb3d-3bc1a8deccdc.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/13e20cb9-4fba-4d58-b951-762201269952.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/dd19f071-1f1b-493d-9c7e-dba479216a9a.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/596f5147-2b99-4add-badb-41c6e12afba4.jpg'
    ]
  },
  {
    id: 'project-2-6',
    title: '北京来广营零售中心',
    description: '面积2106㎡的高级店设计,打造旗舰级购物体验',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/e2a9452b-dbb3-4860-abd2-7bd35460aa0b.jpg',
    category: '零售空间',
    tags: ['高级店', '北京', '来广营'],
    location: '北京市朝阳区来广营乡顾家庄桥北293米路西',
    area: '2106㎡',
    buildingTime: '2024/05/28',
    details: '北京来广营零售中心是超大型高级店的典范,占地2106㎡。作为旗舰级零售空间,通过精心的设计和完善的服务设施,为客户提供了极致的购物体验。空间设计充分体现了品牌的规模优势和服务能力。',
    highlights: ['旗舰级店铺', '超大空间', '完善设施', '极致体验'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/e2a9452b-dbb3-4860-abd2-7bd35460aa0b.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/049194a5-9127-40c1-84f3-e0ae0565537d.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/17e4c0dd-0d02-41b2-9114-3d3cd3975d06.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/65706194-ad10-4d32-a2e7-ff78c50b81e8.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/10cc90a7-97e7-42f4-bd65-4f54302f3b10.jpg'
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
    title: '2025双旗舰巡展',
    description: '理想同学环游季',
    image: 'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2f175aab-8e37-4e18-8ed3-65b965996223.jpg',
    category: '活动空间',
    tags: ['巡展', 'MEGA HOME', '北京'],
    location: '首站：北京-蓝色港湾',
    area: '150㎡',
    buildingTime: '2025/05/16',
    details: '承接理想MEGA Home家庭特别版、理想L9 Ultra智能焕新版切换热度，打造线下专属IP巡展内容，提升重点城市的品牌曝光度，促进销售。\n\n以"理想同学环游季"为主题，开启理想同学在物理世界的初次远行，以"飞屋"连接四城：北京（蓝色港湾）、上海（武康路）、深圳（万象天地）、青岛（万象城），不断延申家的边界，并在每座城市学习当地生活灵感，结识更多朋友。',
    highlights: ['高品质展示', '精细制作工艺', '快速反应能力', '品牌展现专业'],
    images: [
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/2f175aab-8e37-4e18-8ed3-65b965996223.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/8164c2fb-09b7-4a09-8be7-ed6fac28c94c.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/daa9681c-f19e-4ddc-88a3-8bbd56e3b83d.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/074211ad-947f-42a3-9ecd-8ad92bb3a442.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/b14c75c8-060e-4ac1-a90f-63a41d967866.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/35d2e2df-31cc-4cc8-89cd-5a74a9442798.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/0d266c9f-8c43-4739-a710-e65fe7028e99.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/84bf1abb-a218-4d25-a22e-fcde51d643f6.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/0cf19814-b277-4b75-8226-7617264c34b1.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/763ef566-c2fe-4f65-8f66-d55309f32afb.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/5e66bfeb-d2c9-4498-8f78-e9bb8a805af3.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/7443d81d-ed18-40f6-9bfe-218839da8efe.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/7de90c0c-2392-4564-82af-178e4eda4884.jpg',
      'https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/f138f39f-25fe-4588-ae35-6a39a8177732.jpg'
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

// 导出处理后的项目列表（开发环境使用占位符，生产环境使用真实URL）
export const projects = processProjectImages(rawProjects);
