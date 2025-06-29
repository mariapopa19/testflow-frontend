import DefaultModal from '../modal/DefaultModal'
import Button from '../ui/button/Button'
import { TestReport } from '../../services/reportService'

type Props = {
  isOpen: boolean
  onClose: () => void
  report: TestReport | null
  onConfirm: (id: string) => void
}

const DeleteReportModal = ({ isOpen, onClose, report, onConfirm }: Props) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Report"
      className="max-w-[400px] p-5 lg:p-10"
    >
      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
        Are you sure you want to delete the test report for <strong>{report?.endpointName}</strong>?
      </p>
      <div className="flex items-center justify-end w-full gap-3 mt-8">
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="primary"
          className="bg-red-500"
          onClick={() => onConfirm(report?.id ?? '')}
        >
          Delete
        </Button>
      </div>
    </DefaultModal>
  )
}

export default DeleteReportModal