'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';

import PaginationWithIcon from '../tables/PaginationWithIcon';
import { Edit, Play, Trash2 } from 'lucide-react';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import {
  deleteEndpoint,
  EndpointModel,
  getEndpoints,
} from '../../services/endpointService';
import JsonPreviewCell from './JsonPreviewCell';
import { useModal } from '../../hooks/useModal';
import DefaultModal from '../modal/DefaultModal';
import { toast } from 'sonner';

type SortKey = 'name' | 'httpMethod' | 'url';
type SortOrder = 'asc' | 'desc';

export default function EndpointsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [endpoints, setEndpoints] = useState<EndpointModel[]>([]);

  useEffect(() => {
    getEndpoints().then((data) => {
      console.log('Fetched endpoints:', data);
      setEndpoints(data);
    });
  }, []);

  const filteredAndSortedData = useMemo(() => {
    if (endpoints) {
      return endpoints
        .filter((item) =>
          Object.values(item).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
        .sort((a, b) => {
          if (sortKey === 'name') {
            return sortOrder === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
          return sortOrder === 'asc'
            ? String(a[sortKey]).localeCompare(String(b[sortKey]))
            : String(b[sortKey]).localeCompare(String(a[sortKey]));
        });
    }
    return [];
  }, [endpoints, sortKey, sortOrder, searchTerm]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const methodBadgeColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-white/90';
      case 'POST':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-white/90';
      case 'PUT':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white/90';
      case 'DELETE':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-white/90';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-white/90';
    }
  };

  const navigate = useNavigate();

  const handleAddEndpoint = () => {
    navigate('/add-endpoint-form');
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const { isOpen, openModal, closeModal } = useModal();
  const confirmDelete = async (id: string) => {
    // Handle the confirmation action here
    try {
      closeModal();
      await deleteEndpoint(id);
      setEndpoints((prev) => prev.filter((item) => item.id !== id));
      toast.success('Endpoint deleted successfully!');
    } catch (error) {
      console.error('Error deleting endpoint:', error);
      toast.error('Failed to delete endpoint. Please try again.');
    }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-white/[0.03] rounded-xl">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400"> Show </span>
          <button className="relative z-20 bg-transparent">
            <select
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 8, 10].map((value) => (
                <option
                  key={value}
                  value={value}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                >
                  {value}
                </option>
              ))}
            </select>
            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <span className="text-gray-500 dark:text-gray-400"> entries </span>
        </div>

        <div className="hidden sm:flex items-end gap-3">
          <div className="relative">
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
            />
          </div>
          <div className="relative flex items-center h-full">
            <Button
              size="sm"
              variant="primary"
              className="flex items-center"
              onClick={handleAddEndpoint}
            >
              Add Endpoint
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                  fill=""
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div>
          <Table>
            <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  { key: 'name', label: 'Endpoint Name' },
                  { key: 'method', label: 'Method' },
                  { key: 'endpoint', label: 'Endpoint' },
                  { key: 'requestBody', label: 'Request Body' },
                  { key: 'responseBody', label: 'Response Body' },
                  // { key: 'hasTests', label: 'Has Tests' },
                  { key: 'actions', label: 'Actions' },
                ].map(({ key, label }) => (
                  <TableCell
                    key={key}
                    isHeader
                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                  >
                    <button
                      className="flex items-center justify-between cursor-pointer focus:outline-none"
                      onClick={() => handleSort(key as SortKey)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSort(key as SortKey);
                        }
                      }}
                    >
                      <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                        {label}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        <svg
                          className={`text-gray-300 dark:text-gray-700  ${
                            sortKey === key && sortOrder === 'asc'
                              ? 'text-brand-500'
                              : ''
                          }`}
                          width="8"
                          height="5"
                          viewBox="0 0 8 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                            fill="currentColor"
                          />
                        </svg>
                        <svg
                          className={`text-gray-300 dark:text-gray-700  ${
                            sortKey === key && sortOrder === 'desc'
                              ? 'text-brand-500'
                              : ''
                          }`}
                          width="8"
                          height="5"
                          viewBox="0 0 8 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, i) => (
                <TableRow key={i + 1}>
                  <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap ${methodBadgeColor(item.httpMethod)}`}
                  >
                    {item.httpMethod}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    {item.url}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-wrap">
                    <JsonPreviewCell
                      value={item.requestBodyModel}
                      lineShown={3}
                    />
                  </TableCell>
                  <TableCell className="text-wrap px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-wrap ">
                    <JsonPreviewCell
                      value={item.responseBodyModel}
                      lineShown={3}
                    />
                  </TableCell>
                  {/* <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    {item.hasTests ? (
                      <Badge variant="solid" color="success" size="sm">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="light" color="light" size="sm">
                        No
                      </Badge>
                    )}
                  </TableCell> */}
                  {/* add this buttons where you want to start the tests, edit and delete*/}
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap text-center">
                    <button className="btn-icon btn-outline p-0.5 hover:bg-green-100 dark:hover:bg-green-700">
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      className="btn-icon btn-outline p-0.5 hover:bg-blue-100 dark:hover:bg-blue-700"
                      onClick={() => navigate(`/endpoints/edit/${item.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="btn-icon btn-destructive p-0.5 hover:bg-red-100 dark:hover:bg-red-700"
                      onClick={openModal}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                  < TableCell>
                    <DefaultModal
                      isOpen={isOpen}
                      onClose={closeModal}
                      title="Delete Endpoint"
                      className="max-w-[400px] p-5 lg:p-10"
                    >s
                      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete {item.name}?
                      </p>
                      <div className="flex items-center justify-end w-full gap-3 mt-8">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={closeModal}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          className="bg-red-500"
                          onClick={() => confirmDelete(item.id ?? '')}
                        >
                          Delete
                        </Button>
                      </div>
                    </DefaultModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          {/* Left side: Showing entries */}
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </p>
          </div>
          <PaginationWithIcon
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
