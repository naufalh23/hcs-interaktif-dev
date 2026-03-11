// ============================================================
//  DATA STATIS — Tipe Hunian H City Sawangan
//  TODO: Nanti replace dengan fetch ke CMS/ERP
//  Cukup edit file ini saja untuk update konten
// ============================================================

export interface WallColor {
  hex:  string
  name: string
}

export interface HouseType {
  id:           string
  cluster:      string   // nama cluster
  name:         string   // "Tipe 60/84"
  buildingArea: number   // LB m²
  landArea:     number   // LT m²
  floors:       number
  bedrooms:     number
  bathrooms:    number
  basePrice:    number   // dalam rupiah
  badge:        'ready' | 'indent' | 'hot'
  badgeLabel:   string
  icon:         string   // emoji
  wallColors:   WallColor[]
  description:  string
  facilities:   string[] // fasilitas khusus tipe ini
}

export const HOUSE_TYPES: HouseType[] = [
  {
    id:           't60',
    cluster:      'Cluster Damar',
    name:         'Tipe 60/84',
    buildingArea: 60,
    landArea:     84,
    floors:       1,
    bedrooms:     3,
    bathrooms:    2,
    basePrice:    800_000_000,
    badge:        'ready',
    badgeLabel:   'Ready Stock',
    icon:         '🏡',
    description:  'Hunian 1 lantai cocok untuk keluarga muda, desain modern minimalis.',
    facilities:   ['Taman depan', 'Carport 1 mobil', 'Dapur set'],
    wallColors: [
      { hex: '#C4B89A', name: 'Krem Natural' },
      { hex: '#E8DDD0', name: 'Putih Tulang' },
      { hex: '#A8B8A0', name: 'Sage' },
      { hex: '#B8A898', name: 'Taupe' },
      { hex: '#9AA8C0', name: 'Abu Mist' },
    ],
  },
  {
    id:           't70',
    cluster:      'Cluster Kenanga',
    name:         'Tipe 70/100',
    buildingArea: 70,
    landArea:     100,
    floors:       1,
    bedrooms:     3,
    bathrooms:    2,
    basePrice:    1_000_000_000,
    badge:        'ready',
    badgeLabel:   'Ready Stock',
    icon:         '🏠',
    description:  'Hunian dengan tanah luas, area taman belakang ekstra untuk keluarga.',
    facilities:   ['Taman belakang', 'Carport 1 mobil', 'Gudang'],
    wallColors: [
      { hex: '#B8C4A8', name: 'Hijau Sage' },
      { hex: '#D4C5B0', name: 'Linen' },
      { hex: '#C0A882', name: 'Caramel' },
      { hex: '#A8B4C8', name: 'Biru Mist' },
      { hex: '#C8A8A8', name: 'Dusty Rose' },
    ],
  },
  {
    id:           't84',
    cluster:      'Cluster Melati',
    name:         'Tipe 84/120',
    buildingArea: 84,
    landArea:     120,
    floors:       2,
    bedrooms:     4,
    bathrooms:    3,
    basePrice:    1_400_000_000,
    badge:        'indent',
    badgeLabel:   'Inden 6 Bln',
    icon:         '🏘',
    description:  'Hunian 2 lantai dengan 4 kamar tidur, ideal untuk keluarga besar.',
    facilities:   ['Taman depan & belakang', 'Carport 2 mobil', 'Balkon lantai 2'],
    wallColors: [
      { hex: '#A0B4A0', name: 'Forest' },
      { hex: '#C8B89A', name: 'Wheat' },
      { hex: '#B09080', name: 'Clay' },
      { hex: '#90A8B8', name: 'Teal Mist' },
      { hex: '#A890A8', name: 'Lavender' },
    ],
  },
  {
    id:           't100',
    cluster:      'Cluster Anggrek',
    name:         'Tipe 100/120',
    buildingArea: 100,
    landArea:     120,
    floors:       2,
    bedrooms:     4,
    bathrooms:    3,
    basePrice:    1_600_000_000,
    badge:        'hot',
    badgeLabel:   'Launching!',
    icon:         '🏗',
    description:  'Tipe baru launching! 2 lantai premium dengan ruang keluarga luas.',
    facilities:   ['Ruang keluarga 2 lantai', 'Carport 2 mobil', 'Rooftop area'],
    wallColors: [
      { hex: '#8AA898', name: 'Mint' },
      { hex: '#C0C8A0', name: 'Pistachio' },
      { hex: '#C8A880', name: 'Apricot' },
      { hex: '#A0B0C8', name: 'Sky' },
      { hex: '#C0A8B8', name: 'Mauve' },
    ],
  },
  {
    id:           't120',
    cluster:      'Cluster Bougenville',
    name:         'Tipe 120/150',
    buildingArea: 120,
    landArea:     150,
    floors:       2,
    bedrooms:     5,
    bathrooms:    4,
    basePrice:    2_000_000_000,
    badge:        'indent',
    badgeLabel:   'Inden 12 Bln',
    icon:         '🏰',
    description:  'Hunian luas 5 kamar dengan tanah premium dan fasilitas lengkap.',
    facilities:   ['Taman luas', 'Carport 3 mobil', 'Ruang kerja', 'Storage room'],
    wallColors: [
      { hex: '#708870', name: 'Olive' },
      { hex: '#B8C0A8', name: 'Sage Muda' },
      { hex: '#C0A878', name: 'Mustard' },
      { hex: '#88A0B8', name: 'Steel Blue' },
      { hex: '#B888A8', name: 'Orchid' },
    ],
  },
  {
    id:           't150',
    cluster:      'Cluster Dahlia',
    name:         'Tipe 150/180',
    buildingArea: 150,
    landArea:     180,
    floors:       2,
    bedrooms:     5,
    bathrooms:    5,
    basePrice:    2_800_000_000,
    badge:        'hot',
    badgeLabel:   'Premium',
    icon:         '🏯',
    description:  'Puncak kemewahan H City. Hunian premium terluas dengan 5 kamar ensuite.',
    facilities:   ['Private garden', 'Carport 3 mobil', 'Home office', 'Rooftop terrace', 'Pantry'],
    wallColors: [
      { hex: '#507050', name: 'Deep Green' },
      { hex: '#A8B898', name: 'Fern' },
      { hex: '#B89860', name: 'Honey' },
      { hex: '#6888A8', name: 'Indigo' },
      { hex: '#A87898', name: 'Mauve Tua' },
    ],
  },
]
