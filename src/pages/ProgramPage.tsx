import { useParams } from 'react-router-dom'
import { getProgram } from '../content'
import { ProgramView } from '../components/ProgramView'
import { NotFound } from './NotFound'

export function ProgramPage() {
  const { programId } = useParams()
  const program = getProgram(programId ?? '')

  if (!program) return <NotFound />

  return <ProgramView program={program} />
}
