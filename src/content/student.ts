/**
 * Site-level metadata about the author of the record. This is deliberately kept
 * separate from the document content modules, which hold nothing but material
 * transcribed from combined.docx.
 */
export interface Student {
  name: string
  section: string
  rollNumber: string
}

export const student: Student = {
  name: 'Nagula Venkata Sri Krishna Teja',
  section: 'AIML-2',
  rollNumber: '25EU02102',
}
