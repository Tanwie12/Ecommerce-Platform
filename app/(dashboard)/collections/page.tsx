'use client'
import TableComponent from '@/components/collections/Table'
import React from 'react'
import { columns, statusOptions, users } from '@/components/collections/data'
import { Spinner, Button } from '@nextui-org/react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { PlusIcon } from 'lucide-react'

type Props = {}

function Collections({}: Props) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [collections, setCollections] = React.useState([])

  const getCollections = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/collections')
      if (!res.ok) {
        throw new Error('Failed to fetch collections')
      }
      const data = await res.json()
      setCollections(data)
    } catch (error) {
      console.error('Failed to fetch collections', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getCollections()
  }, [])

  if (loading) {
    return <Spinner size='lg' />
  }

  return (
    <div className='py-5 px-3 h-screen'>
      <div className="flex flex-row justify-between">
        <h1 className='text-heading2-bold'>Collections</h1>
        <Button
          startContent={<PlusIcon className='' />}
          onPress={() => router.push('/collections/new')}
          color="primary"
          className='text-xl'
        >
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      {
        collections.length === 0 ? (
          <div>
            <p>Error getting collections, please refresh the page</p>
            <Button onPress={() => window.location.reload()}>Refresh</Button>
          </div>
        ) : (
          <TableComponent collections={collections} />
        )
      }
    </div>
  )
}

export default Collections
