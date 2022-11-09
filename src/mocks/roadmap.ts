export interface IRoadmapItem {
  id: number
  title: string
  status: 'passed' | 'coming' | 'active'
}

export const ROADMAP_DATA: IRoadmapItem[] = [
  {
    id: 0,
    title: 'Site Launched',
    status: 'passed'
  },
  {
    id: 1,
    title: 'Launch road map 1.0',
    status: 'passed'
  },
  {
    id: 2,
    title: 'Team introduction',
    status: 'passed'
  },
  {
    id: 3,
    title: 'Intro to Artist',
    status: 'active'
  },
  {
    id: 4,
    title: 'Project intro, pricing',
    status: 'coming'
  },
  {
    id: 5,
    title: 'Seed Round Open',
    status: 'coming'
  },
  {
    id: 6,
    title: 'Seed Round Minting',
    status: 'coming'
  },
  {
    id: 7,
    title: 'Launch Party',
    status: 'coming'
  },
  {
    id: 8,
    title: 'Presale 1 Whitelist Open',
    status: 'coming'
  },
  {
    id: 9,
    title: 'Presale 1 Minting',
    status: 'coming'
  },
  {
    id: 10,
    title: 'Presale 2 Whitelist Open',
    status: 'coming'
  },
  {
    id: 11,
    title: 'Presale 2 Minting',
    status: 'coming'
  },
  {
    id: 12,
    title: 'Public Sale',
    status: 'coming'
  },
  {
    id: 13,
    title: 'NFT Reveal',
    status: 'coming'
  },
  {
    id: 14,
    title: 'Merch Store Launch',
    status: 'coming'
  },
  {
    id: 15,
    title: 'Tulum Mastermind Event',
    status: 'coming'
  },
  {
    id: 16,
    title: 'Curated in person events begin',
    status: 'coming'
  },
  {
    id: 17,
    title: 'Roadmap 2.0 Begins',
    status: 'coming'
  }
]
