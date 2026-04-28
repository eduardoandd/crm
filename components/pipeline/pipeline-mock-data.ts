export const MOCK_LEADS = [
  { id: "lead-01", name: "Carlos Mendes", company: "Totvs S.A." },
  { id: "lead-02", name: "Ana Beatriz Costa", company: "Americanas S.A." },
  { id: "lead-03", name: "Marcos Oliveira", company: "Embraer S.A." },
  { id: "lead-04", name: "Fernanda Lima", company: "Ambev" },
  { id: "lead-05", name: "Roberto Nunes", company: "Petrobras" },
  { id: "lead-06", name: "Juliana Ramos", company: "Magazine Luiza" },
  { id: "lead-07", name: "Pedro Albuquerque", company: "Bradesco" },
  { id: "lead-08", name: "Camila Sousa", company: "Natura & Co" },
] as const

export const MOCK_ASSIGNEES = [
  { id: "usr-ea", name: "Eduardo A.", initials: "EA" },
  { id: "usr-rf", name: "Rafael F.", initials: "RF" },
  { id: "usr-jl", name: "Julia L.", initials: "JL" },
] as const

export type MockLead = (typeof MOCK_LEADS)[number]
export type MockAssignee = (typeof MOCK_ASSIGNEES)[number]
