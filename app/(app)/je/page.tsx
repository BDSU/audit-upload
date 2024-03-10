import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTriggerButton,
} from "@/components/ui/collapsible"
import Requirement from "@/app/(app)/je/_(components)/requirement"
import CreateProjectPopover from "@/app/(app)/je/_(components)/create-project-popover"
import prisma from "@/prisma"
import CreateAssociatePopover from "@/app/(app)/je/_(components)/create-associate-popover"

const processes = [
  { name: "Mitgliederaufnahme", legalRef: "§ 3.2.5 GO QM", help: "Mitgliederaufnahmeprozess.md" },
  { name: "Projektbesetzung", legalRef: "§ 3.2.5 GO QM", help: "Projektbesetzungsprozess.md" },
  { name: "Projektcontrolling", legalRef: "§ 3.2.5 GO QM", help: "Projektcontrolling-Prozess.md" },
  { name: "Kundenevaluation", legalRef: "§ 3.2.5 GO QM", help: "Kundenevaluationsprozess.md" },
  {
    name: "Projektdokumentation",
    legalRef: "§ 3.2.5 GO QM",
    help: "Projektdokumentationsprozess.md",
  },
]

export default async function Home() {
  const projects = await prisma.requirement
    .findMany({
      select: { instance: true },
      where: {
        fileGroup: "projects",
        auditId: 1,
      },
      distinct: "instance",
    })
    .then((data) => data.map(({ instance }) => instance))

  const associates = await prisma.requirement
    .findMany({
      select: { instance: true },
      where: {
        fileGroup: "associates",
        auditId: 1,
      },
      distinct: "instance",
    })
    .then((data) => data.map(({ instance }) => instance))

  const requirements = await prisma.requirement.findMany({
    where: {
      auditId: 1,
      files: {
        some: {
          NOT: {
            fileName: "",
          },
        },
      },
    },
  })
  console.log(requirements)

  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight leading-none">Checkliste</h1>
      <h2 className="text-lg text-muted-foreground">Audit 2024</h2>

      <Collapsible className="my-3">
        <CollapsibleTriggerButton>Allgemeines</CollapsibleTriggerButton>
        <CollapsibleContent className="divider-y">
          <Requirement
            name="Vorstandsberichte der letzten 3 Jahre"
            legalRef="§ 3.2.5 GO QM"
            help="Vorstandbericht.md"
            checked={requirements.some(
              (requirement) => requirement.fileTitle === "Vorstandsberichte der letzten 3 Jahre"
            )}
            id={16}
          />

          <Requirement
            name="Mitgliederzufriedenheitsanalysen im Prüfungszeitraum"
            legalRef="§ 3.2.6 GO QM"
            help="Mitgliederzufriedenheitsanalyse.md"
            checked={requirements.some(
              (requirement) =>
                requirement.fileTitle === "Mitgliederzufriedenheitsanalysen im Prüfungszeitraum"
            )}
            id={17}
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="my-3">
        <CollapsibleTriggerButton>Prozesse</CollapsibleTriggerButton>
        <CollapsibleContent className="divider-y">
          <Requirement
            name="Modellierungshandbuch"
            legalRef="§ 3.2.1.3 GO QM"
            help="Prozessmanagement.md"
            id={18}
          />
          {processes.map((process) => (
            <Requirement
              key={process.name}
              name={process.name}
              legalRef={process.legalRef}
              help={process.help}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="my-3">
        <CollapsibleTriggerButton>Projekte</CollapsibleTriggerButton>
        <CollapsibleContent className="divide-y">
          {projects.map((project) => (
            <Requirement
              key={project}
              name={project!}
              legalRef=""
              help="Realisierung der Projekte.md"
            />
          ))}
          <CreateProjectPopover auditId={1} />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="my-3">
        <CollapsibleTriggerButton>Aufgenommene Mitglieder</CollapsibleTriggerButton>
        <CollapsibleContent className="divide-y">
          {associates.map((associate) => (
            <Requirement
              key={associate}
              name={associate!}
              legalRef=""
              help="Realisierung der Mitgliederaufnahme.md"
            />
          ))}
          <CreateAssociatePopover auditId={1} />
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
