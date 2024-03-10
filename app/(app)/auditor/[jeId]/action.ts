"use server"

import prisma from "@/prisma";

interface WriteAuditParams {
    name : string,
    jeId : number
}

export default async function WriteAudit({ name, jeId }: WriteAuditParams) {
    console.log("test", name, jeId)
    return(
        await prisma.audit.create(
            {data: 
                {date : new Date(), name, jeId}
            }
        )
    )
}