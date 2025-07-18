import * as React from "react"
import LogoLafiseBlanco from "@/assets/images/logo-lafise-blanco.svg"
import IconChevronLeft from "lucide-react/icons/chevron-left"
import IconChevronRight from "lucide-react/icons/chevron-right"
import IconChevronsLeft from "lucide-react/icons/chevrons-left"
import IconChevronsRight from "lucide-react/icons/chevrons-right"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"

import { useIsMobile } from "@/hooks/use-mobile.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { useSelector } from 'react-redux'
import { useGetAccountTransactionsQuery } from '@/store/services/api'
import type { RootState } from "@/store";
import type { UserProduct } from "@/types/user.ts";
import type { Transaction} from "@/types/transactions.ts";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_date",
    header: "Fecha",
    cell: ({ row }) => <TableCellViewer item={row.original} onOpen={() => {}} />, // row.original is Transaction
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => row.original.description,
  },
  {
    accessorKey: "amount",
    header: "Débito (USD)",
    cell: ({ row }) => row.original.amount.value.toFixed(2),
  },
  {
    accessorKey: "bank_description",
    header: "Banco",
    cell: ({ row }) => row.original.bank_description,
  },
]

function TransactionsTableRow({ row }: { row: Row<Transaction> }) {
  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function TransactionsList() {
  const user = useSelector((state: RootState) => state.user.data)
  const accountId = user?.products?.find((p: UserProduct) => p.type === 'Account')?.id
  const { data, error, isLoading } = useGetAccountTransactionsQuery(String(accountId), { skip: !accountId })

  let content: React.ReactNode = null
  let transactions: Transaction[] = []

  if (!user) {
    content = <div className="p-8 text-center">Cargando usuario...</div>
  } else if (!accountId) {
    content = <div className="p-8 text-center">No hay cuentas asociadas al usuario.</div>
  } else if (isLoading) {
    content = <div className="p-8 text-center">Cargando transacciones...</div>
  } else if (error) {
    content = <div className="p-8 text-center text-red-500">Error al cargar transacciones</div>
  } else if (!data || !data.items) {
    content = <div className="p-8 text-center">Sin transacciones</div>
  } else {
    transactions = data.items as Transaction[];
  }

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.transaction_number.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  if (isLoading) return <div className="p-8 text-center">Cargando transacciones...</div>
  if (error) return <div className="p-8 text-center text-red-500">Error al cargar transacciones</div>
  if (!data) return null

  return (
    <>
      {content ? (
        content
      ) : (
        <Tabs
          defaultValue="outline"
          className="w-full flex-col justify-start gap-6"
        >
          <div className="flex items-center justify-between px-4 lg:px-6">
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>
            <Select defaultValue="outline">
              <SelectTrigger
                className="flex w-fit @4xl/main:hidden"
                size="sm"
                id="view-selector"
              >
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outline">Movimientos</SelectItem>
                <SelectItem value="past-performance">Estado</SelectItem>
                <SelectItem value="key-personnel">Detalle</SelectItem>
                <SelectItem value="focus-documents">Fondo no disponible</SelectItem>
              </SelectContent>
            </Select>
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
              <TabsTrigger value="outline">Movimientos</TabsTrigger>
              <TabsTrigger value="past-performance">
                Estado
              </TabsTrigger>
              <TabsTrigger value="key-personnel">
                Detalle
              </TabsTrigger>
              <TabsTrigger value="focus-documents">Fondo no disponible</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="outline"
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <div className="overflow-hidden rounded-sm border">
              <Table>
                  <TableHeader className="bg-transparent sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead  className={'py-4 font-semibold bg-transparent text-[var(--color-muted-foreground)]'} key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TransactionsTableRow
                            key={row.id}
                            row={row}
                          />
                        ))

                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          Sin resultados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-4">
              <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                {table.getFilteredSelectedRowModel().rows.length} de{" "}
                {table.getFilteredRowModel().rows.length} fila(s) seleccionada.
              </div>
              <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                  <Label htmlFor="rows-per-page" className="text-sm font-medium">
                    Filas por página
                  </Label>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value))
                    }}
                  >
                    <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                  Página {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Primera página</span>
                    <IconChevronsLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Página anterior</span>
                    <IconChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Página siguiente</span>
                    <IconChevronRight />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden size-8 lg:flex"
                    size="icon"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Última página</span>
                    <IconChevronsRight />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="past-performance"
            className="flex flex-col px-4 lg:px-6"
          >
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
          <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
          <TabsContent
            value="focus-documents"
            className="flex flex-col px-4 lg:px-6"
          >
            <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
          </TabsContent>
        </Tabs>
      )}
    </>
  )
}

function TableCellViewer({ item, onOpen }: { item: Transaction, onOpen: () => void }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
    if (onOpen) onOpen()
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="link" className="text-foreground w-fit px-0 text-left" onClick={handleOpen}>
        {item.transaction_date}
      </Button>
      <Drawer open={open} direction={isMobile ? "bottom" : "right"} onOpenChange={setOpen}>
        <DrawerContent className="bg-white min-h-[40vh] flex flex-col items-center justify-start sm:rounded-l-2xl shadow-2xl overflow-hidden">
          {/* Animated Gradient and Logo */}
          <div className="relative w-full flex flex-col items-center pb-4 bg-gradient-to-r from-blue-600 to-[var(--green)] -mt-6 sm:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[var(--green)] opacity-20 blur-xl animate-pulse rounded-t-2xl" />
            <div className="relative z-10 flex flex-col items-center">
              <img src={LogoLafiseBlanco} alt="Lafise Logo" className="w-32 h-16 sm:w-40 sm:h-20 mb-2 mt-3 drop-shadow-lg" />
              <div className="flex items-center gap-2 mt-2 mb-10">
                <span className="bg-white/80 rounded-full p-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" /></svg>
                </span>
                <span className="text-white font-semibold text-lg">Detalle de Transacción</span>
              </div>
            </div>
          </div>

          {/* Transaction Details Card */}
          <div className="w-full max-w-md bg-white rounded-2xl p-6 mt-[-2em] px-4 py-2 z-10 mx-2 relative">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Descripción:</span>
                <span className="text-slate-900 font-bold text-lg text-right">{item.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Fecha:</span>
                <span className="text-slate-600 text-right">{item.transaction_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-700">Débito:</span>
                <span className="text-blue-700 font-bold text-lg text-right">${item.amount.value.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-700">Banco:</span>
                <span className="text-green-700 font-bold text-lg text-right">{item.bank_description}</span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div className="w-full flex justify-center mt-4">
              <Button
                  className="bg-[var(--green)] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={handleClose}
              >
                Volver
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
