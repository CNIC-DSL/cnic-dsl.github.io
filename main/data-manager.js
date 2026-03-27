// 数据管理核心模块
class DataManager {
    constructor() {
        this.initializeData();
    }

    // 初始化默认数据
    initializeData() {
        if (!localStorage.getItem('labData')) {
            const defaultData = {
                news: [
                    {
                        id: 1,
                        title: '实验室在AI驱动科学发现领域取得',
                        date: '2026-01-10',
                        excerpt: '我实验室团队开发的智能科学发现系统成功应用于材料科学研究，发现3种新型高温超导材料，相关成果发表在Nature期刊...',
                        content: '详细内容...'
                    },
                    {
                        id: 2,
                        title: '实验室主办"AI+科学"国际研讨会',
                        date: '2026-01-05',
                        excerpt: '来自全球15个国家的200余名专家学者齐聚一堂，共同探讨人工智能赋能科学研究的前沿进展与未来趋势...',
                        content: '详细内容...'
                    },
                    {
                        id: 3,
                        title: '实验室与国际顶尖高校建立战略合作',
                        date: '2025-12-28',
                        excerpt: '我实验室与MIT、Stanford等世界一流大学签署合作协议，将在智能体研究、科学知识图谱等领域开展深度合作...',
                        content: '详细内容...'
                    }
                ],
                achievements: [
                    {
                        id: 1,
                        year: '2026',
                        title: 'Language Agents Achieve Superhuman Synthesis of Scientific Knowledge',
                        type: 'papers',
                        authors: '实验室团队',
                        venue: 'Nature Machine Intelligence (顶级期刊)',
                        tag: 'AI for Science'
                    },
                    {
                        id: 2,
                        year: '2025',
                        title: '环境感知交互的大模型智能体自进化方法研究',
                        type: 'papers',
                        authors: '张教授, 李研究员等',
                        venue: '国家自然科学基金重点项目',
                        tag: '智能体'
                    },
                    {
                        id: 3,
                        year: '2025',
                        title: '基于大模型的科学假设自动生成系统',
                        type: 'patents',
                        authors: '发明专利 (ZL202510001234.5)',
                        tag: '已授权'
                    },
                    {
                        id: 4,
                        year: '2025-2029',
                        title: '面向科学发现的智能体系统研究',
                        type: 'projects',
                        authors: '国家重点研发计划项目',
                        venue: '项目经费：3000万元',
                        tag: '在研'
                    }
                ],
                team: [
                    {
                        id: 1,
                        name: '张教授',
                        title: '实验室主任 / 首席科学家',
                        bio: '人工智能领域专家，专注于大模型与智能体研究',
                        avatar: ''
                    },
                    {
                        id: 2,
                        name: '李研究员',
                        title: '副主任 / 知识图谱方向负责人',
                        bio: '知识图谱与自然语言处理专家',
                        avatar: ''
                    },
                    {
                        id: 3,
                        name: '王博士',
                        title: '高级研究员 / 数据智能方向',
                        bio: '机器学习与数据挖掘专家',
                        avatar: ''
                    },
                    {
                        id: 4,
                        name: '陈研究员',
                        title: '研究员 / 科学发现方向',
                        bio: '计算科学与自动化研究专家',
                        avatar: ''
                    }
                ],
                research: [
                    {
                        id: 1,
                        icon: '🤖',
                        title: '大模型智能体',
                        description: '研究环境感知交互的大模型智能体自进化方法，开发具备自主学习、推理和决策能力的AI系统',
                        points: ['智能体架构设计', '多模态感知与理解', '自主学习与进化', '人机协同机制']
                    },
                    {
                        id: 2,
                        icon: '🔬',
                        title: '自动化科学发现',
                        description: '利用AI技术实现科学假设生成、实验设计、数据分析的全流程自动化',
                        points: ['假设生成与验证', '智能实验设计', '自动化数据分析', '科学知识提取']
                    }
                ],
                banners: [
                    {
                        id: 1,
                        title: '探索科学数据智能前沿',
                        subtitle: '致力于推动人工智能与科学研究的深度融合',
                        link: '#research'
                    },
                    {
                        id: 2,
                        title: '构建智能科研生态系统',
                        subtitle: '推动AI驱动的科学发现与创新',
                        link: '#team'
                    },
                    {
                        id: 3,
                        title: '开创数据驱动科研新范式',
                        subtitle: '赋能科学研究的智能化转型',
                        link: '#achievements'
                    }
                ],
                settings: {
                    labName: '科学数据智能与创新实验室',
                    email: 'contact@sdai-lab.cn',
                    phone: '+86-010-12345678',
                    address: '北京市海淀区科学园路1号'
                }
            };
            this.saveData(defaultData);
        }
    }

    // 获取所有数据
    getAllData() {
        return JSON.parse(localStorage.getItem('labData')) || {};
    }

    // 保存所有数据
    saveData(data) {
        localStorage.setItem('labData', JSON.stringify(data));
    }

    // 获取指定类型的数据
    getData(type) {
        const data = this.getAllData();
        return data[type] || [];
    }

    // 添加数据
    addItem(type, item) {
        const data = this.getAllData();
        if (!data[type]) {
            data[type] = [];
        }
        item.id = Date.now();
        data[type].push(item);
        this.saveData(data);
        return item;
    }

    // 更新数据
    updateItem(type, id, updatedItem) {
        const data = this.getAllData();
        const index = data[type].findIndex(item => item.id == id);
        if (index !== -1) {
            data[type][index] = { ...data[type][index], ...updatedItem };
            this.saveData(data);
            return true;
        }
        return false;
    }

    // 删除数据
    deleteItem(type, id) {
        const data = this.getAllData();
        data[type] = data[type].filter(item => item.id != id);
        this.saveData(data);
    }

    // 获取统计数据
    getStats() {
        const data = this.getAllData();
        return {
            news: data.news?.length || 0,
            achievements: data.achievements?.length || 0,
            team: data.team?.length || 0,
            research: data.research?.length || 0
        };
    }

    // 导出数据
    exportData() {
        const data = this.getAllData();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lab-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // 导入数据
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.saveData(data);
            return true;
        } catch (e) {
            console.error('导入数据失败:', e);
            return false;
        }
    }

    // 清空所有数据
    clearAllData() {
        localStorage.removeItem('labData');
        this.initializeData();
    }

    // 保存设置
    saveSettings(settings) {
        const data = this.getAllData();
        data.settings = settings;
        this.saveData(data);
    }

    // 获取设置
    getSettings() {
        const data = this.getAllData();
        return data.settings || {};
    }
}

// 创建全局数据管理器实例
const dataManager = new DataManager();
