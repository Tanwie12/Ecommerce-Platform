'use client'
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip
  } from "@nextui-org/react";
import { PlusIcon, EyeIcon,DeleteIcon,EditIcon, EllipsisVertical as VerticalDotsIcon,SearchIcon,ChevronDownIcon } from "lucide-react";
import Delete  from "../custom ui/Delete";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Product from '@/lib/models/productModel';
import Products from '../../app/(dashboard)/products/page';

const columns = [
    {name: "Title", uid: "title", sortable: true},
    {name: "Category", uid: "category"},
    {name: "collections", uid: "collections", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "Price", uid: "price", sortable: true},
    {name: "Cost", uid: "cost", sortable: true},
    
    {name: "ACTIONS", uid: "actions"},
  ];
  
  const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
  ];
 function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  
  const INITIAL_VISIBLE_COLUMNS = ["title", "category","colections", "status","price","cost", "actions"];
  
  
type TableComponentProps = {
    products: ProductType[];
  };
  
  export const TableComponent: React.FC<TableComponentProps> = ({ products }) => {

    const router=useRouter()
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
      column: "title",
      direction: "ascending",
    });
  
    const [page, setPage] = React.useState(1);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
  
    const filteredItems = React.useMemo(() => {
      let filteredproducts = [...products];
  
      if (hasSearchFilter) {
        filteredproducts = filteredproducts.filter((product) =>
          product.title.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredproducts = filteredproducts.filter((product) =>
          Array.from(statusFilter).includes(product.status),
        );
      }
  
      return filteredproducts;
    }, [hasSearchFilter, statusFilter, filterValue, products]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: ProductType, b: ProductType) => {
        const first = a[sortDescriptor.column as keyof ProductType] as string | number;
        const second = b[sortDescriptor.column as keyof ProductType] as string | number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((product: ProductType, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof ProductType];
  
      switch (columnKey) {
        case "title":
          return (
            <User
              avatarProps={{ radius: "lg", src: product.media[0] }}
              
              name={cellValue as string}
            />
          );
        //   case "category":
        // return (
        //   <User
        //     avatarProps={{ radius: "lg", src: product.media[0] }}
        //     name={cellValue as string}
        //   />
        // );
      case "collections":
        return (
          <div>
            {product.collections.map((collection) => (
              <Chip key={collection.title} className="capitalize" color="primary" size="sm" variant="flat">
                {collection.title}
              </Chip>
            ))}
          </div>
        );
         
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
              {cellValue as string}
            </Chip>
          );
          
        case "actions":
          return (
            <>
              <div className="relative md:hidden max-md:flex justify-end items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem color="danger">Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="relative hidden md:flex items-center gap-3">
                <Button isIconOnly size="sm" variant="light">
                  <Link href={"/products/"+product._id} passHref>
                  <Tooltip  content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  </Link>
                </Button>
                <Button isIconOnly size="sm" variant="light">
                  <Link href={"/products/"+product._id+"/edit"} passHref>
                  <Tooltip content="Edit product">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  </Link>
                </Button>
                <Delete id={product._id} />
              </div>
            </>
          );
          
        default:
          return cellValue;
      }
    }, []);
  
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
      }, [page, pages]);
    
      const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }, [page]);
    
      const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);
    
      const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
    
      const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])
  
    const topContent = React.useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {/* <Button color="primary" endContent={<PlusIcon />}>
                Add New
              </Button> */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {products.length} users</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent light-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [filterValue, onSearchChange, statusFilter, visibleColumns, products.length, onRowsPerPageChange, onClear]);
  
    const bottomContent = React.useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
          </div>
        </div>
      );
    }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);
  
    return (
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
 
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }