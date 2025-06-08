import DefaultModal from '../modal/DefaultModal'
import Button from '../ui/button/Button'
import { EndpointModel } from '../../services/endpointService'

type Props = {
  isOpen: boolean
  onClose: () => void
  endpoint: EndpointModel | null
  onConfirm: (id: string) => void
}

const DeleteEndpointModal = ({ isOpen, onClose, endpoint, onConfirm }: Props) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Endpoint"
      className="max-w-[400px] p-5 lg:p-10"
    >
      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
        Are you sure you want to delete <strong>{endpoint?.name}</strong>?
      </p>
      <div className="flex items-center justify-end w-full gap-3 mt-8">
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="primary"
          className="bg-red-500"
          onClick={() => onConfirm(endpoint?.id ?? '')}
        >
          Delete
        </Button>
      </div>
    </DefaultModal>
  )
}

export default DeleteEndpointModal
