'use client'
import {TableComponent} from '@/components/products/ProductTable'
import React from 'react'
import { Button } from '@nextui-org/react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'
import Spin from '@/components/custom ui/spin/Spin'

type Props = {}

function Products({}: Props) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [products, setProducts] = React.useState([])

  const getProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      console.log(data)
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='py-5 px-3 h-screen'>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <h1 className='text-heading2-bold'>Products</h1>
            <Button
              startContent={<PlusIcon className='' />}
              onPress={() => router.push('/products/new')}
              color="primary"
              className='text-xl'
            >
              New Product
            </Button>
          </div>
          <Separator className="bg-grey-1 mt-4 mb-7" />
          <TableComponent products={products} />
        </>
      )}
    </div>
  )
}

export default Products
