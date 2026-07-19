export type BrocadeKind = '蜀锦' | '云锦' | '宋锦' | '壮锦'

export type Carrier = '手机壳' | '汉服' | '礼盒' | '帆布包'

export interface PatternGene {
  id: string
  name: string
  kind: BrocadeKind
  motif: string
  meaning: string
  carriers: Carrier[]
  palette: [string, string, string]
}

export interface TimelineNode {
  id: string
  era: string
  year: string
  title: string
  kind: BrocadeKind
  summary: string
}

export interface ChatMessage {
  id: string
  role: 'agent' | 'user'
  text: string
}

export const patterns: PatternGene[] = [
  {
    id: 'shu-tuanhua',
    name: '团花缠枝',
    kind: '蜀锦',
    motif: '圆形团花 · 缠枝藤蔓',
    meaning: '圆满连绵，蜀中织造的经典吉祥构图',
    carriers: ['手机壳', '汉服', '礼盒', '帆布包'],
    palette: ['#8B1E1E', '#C9A45C', '#F3E6C8'],
  },
  {
    id: 'yun-baoxiang',
    name: '宝相花',
    kind: '云锦',
    motif: '层层花瓣 · 金线勾边',
    meaning: '华贵庄重，云锦皇家审美的代表母题',
    carriers: ['汉服', '礼盒'],
    palette: ['#1A2744', '#C9A45C', '#E8D5A3'],
  },
  {
    id: 'song-wanzi',
    name: '万字流水',
    kind: '宋锦',
    motif: '几何连续 · 细密地纹',
    meaning: '温润克制，宋锦文人审美的几何基因',
    carriers: ['手机壳', '帆布包', '礼盒'],
    palette: ['#2F4A3E', '#A67C52', '#EDE4D4'],
  },
  {
    id: 'zhuang-bubu',
    name: '菱格布布',
    kind: '壮锦',
    motif: '菱形骨架 · 民俗色块',
    meaning: '热烈鲜明，壮锦民俗传承的视觉符号',
    carriers: ['帆布包', '手机壳', '汉服'],
    palette: ['#C45C26', '#1F6B4A', '#F2C14E'],
  },
]

export const timeline: TimelineNode[] = [
  {
    id: 'han',
    era: '汉代',
    year: '约公元前 2 世纪',
    title: '蜀锦起源',
    kind: '蜀锦',
    summary: '成都平原织造兴起，经纬交织奠定中国彩锦传统，蜀锦成为丝路重要物证。',
  },
  {
    id: 'song',
    era: '宋代',
    year: '10–13 世纪',
    title: '宋锦鼎盛',
    kind: '宋锦',
    summary: '苏州宋锦以细密几何与温润配色著称，装帧、服饰、礼用并重，文人审美成形。',
  },
  {
    id: 'ming-qing',
    era: '明清',
    year: '14–19 世纪',
    title: '云锦华章',
    kind: '云锦',
    summary: '南京云锦金线妆花，宫廷礼制用锦臻于极盛，纹样华贵、工艺繁复。',
  },
  {
    id: 'now',
    era: '当代',
    year: '20 世纪至今',
    title: '壮锦传承',
    kind: '壮锦',
    summary: '壮族织锦以民俗纹样与高饱和配色延续生活美学，走向文创与日常载体。',
  },
]

export const agentReplies: Record<string, string> = {
  default:
    '我是锦绣，可帮你选四大名锦纹样、讲织锦时间线，或把纹样落到手机壳、汉服、礼盒与帆布包上。你想从哪一步开始？',
  手机壳:
    '已为你匹配「宋锦 · 万字流水」。几何细密、适配小幅平面载体，建议主色墨绿配驼金，可一键生成三版手机壳衍生图。',
  汉服:
    '汉服更宜「云锦 · 宝相花」或「蜀锦 · 团花缠枝」。云锦偏华贵正装感，蜀锦偏圆满喜庆——你更想要典礼感还是日常国风？',
  时间:
    '从汉代蜀锦起源，到宋锦几何、明清云锦，再到当代壮锦民俗——我可以按你的审美偏好推送对应朝代。你喜欢温润几何，还是华丽金线？',
  场景:
    '请上传汉服、礼盒或家居配饰照片。我会识别载体属性，匹配蜀/云/宋/壮专属方案，并生成实景贴合预览。',
}
