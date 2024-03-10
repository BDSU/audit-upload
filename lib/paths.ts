const paths = {
  home: "/",
  
  auditor: {
    basePath: "/auditor",
    home: "/auditor",
    je: (jeId: number) => `${paths.auditor}/${jeId}`,
    audit: (AuditId: number, jeId: number) => `${paths.auditor.je(jeId)}/${AuditId}`,

    toString () {
      return this.basePath
    }
  },

  je: "/je"

}

export default paths
