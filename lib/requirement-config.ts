interface Requirement {
  fileTitle: string
  allowedFormats: string
  legalRef: string
  helpText: string
}

interface RequirementGroup {
  displayName: string
  items: Requirement[]
}

interface RequirementConfig {
  general: RequirementGroup
  processes: RequirementGroup
  projects: RequirementGroup
  trainings: RequirementGroup
  members: RequirementGroup
}
