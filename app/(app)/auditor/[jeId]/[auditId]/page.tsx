import FileGroup from "@/prisma/fileGroups"
import { Metadata } from "next"
import { Je } from "@prisma/client"
import Heading from "@/components/heading"
import SectionHeading from "@/components/sectionheading"
import FileTile, { FileButton } from "@/app/(app)/auditor/[jeId]/[auditId]/file-tile"
import { getAudit, RequirementWithFiles } from "@/app/(app)/auditor/[jeId]/[auditId]/data"

interface Props {
  params: {
    jeId: string
    auditId: string
  }
}


function makeTitle(audit: { name: string, je: Je }) {
  return `${audit.name} - ${audit.je.name}`

}

export async function generateMetadata({ params: { auditId } }: Props): Promise<Metadata> {
  const audit = await getAudit(Number(auditId))
  if (audit === null) {
    return {}
  }

  return {
    title: makeTitle(audit)
  }
}


export default async function ViewAuditPage({ params: { auditId } }: Props
) {
  const audit = await getAudit(Number(auditId))
  if (audit === null) {
    return <div>Audit nicht gefunden</div>
  }

  const general = audit.requirements.filter((req) =>
    req.fileGroup === FileGroup.GENERAL)

  const projects: Map<string, RequirementWithFiles[]> = new Map()

  audit.requirements.filter((req) =>
    req.fileGroup === FileGroup.PROJECT).forEach((req) => {
    if (req.instance) {
      if (!projects.has(req.instance)) {
        projects.set(req.instance, [])
      }
      // @ts-ignore
      projects.get(req.instance).push(req)
    }
  })

  // Trainees are similar to projects: They are also grouped by instance
  const trainees: Map<string, RequirementWithFiles[]> = new Map()
  audit.requirements.filter((req) =>
    req.fileGroup === FileGroup.ASSOCIATES).forEach((req) => {
    if (req.instance) {
      if (!trainees.has(req.instance)) {
        trainees.set(req.instance, [])
      }
      // @ts-ignore
      trainees.get(req.instance).push(req)
    }
  })


  return (
    <div>
      <Heading>{makeTitle(audit)}</Heading>

      <SectionHeading>Allgemein</SectionHeading>

      {
        general.map((req) =>
          <FileTile key={req.id} title={req.fileTitle}>
            {
              req.files.map((file) =>
                <FileButton key={file.id} file={file} title={file.fileName} />
              )
            }
          </FileTile>
        )
      }


      <SectionHeading>Projekte</SectionHeading>

      {
        Array.from(projects).map(([project, requirements]) => (
          <FileTile key={project} title={project}>
            {
              requirements.map((req) =>
                req.files.map((file) =>
                  <FileButton key={file.id} file={file} title={req.fileTitle} />
                )
              )
            }
          </FileTile>
        ))
      }

      <SectionHeading>Anwärter</SectionHeading>

        {
          Array.from(trainees).map(([trainee, requirements]) => (
            <FileTile key={trainee} title={trainee}>
              {
                requirements.map((req) =>
                  req.files.map((file) =>
                    <FileButton key={file.id} file={file} title={req.fileTitle} />
                  )
                )
              }
            </FileTile>
          ))
        }

    {/*  TODO: Add sections for all the other FileGroups */}

    </div>
  )

}
