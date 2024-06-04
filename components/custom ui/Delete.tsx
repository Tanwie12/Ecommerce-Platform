'use client'
import React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Tooltip,Button } from "@nextui-org/react"
  import { Trash2 as DeleteIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type Props={
    id:string | number
}

export function DeleteComponent({id}:Props) {
    const router=useRouter()
    const [loading, setLoading] = React.useState(false)
const onDelete=async () => {
   try {
    setLoading(true)
    const res=await fetch(`/api/collections/${id}`,{
      method:"DELETE",
      })
   if(res.ok){
    setLoading(false)
    router.refresh()
    toast.success("Collection deleted")
   }    
    
   } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
    
   }
  }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button  isIconOnly variant="light">
          <Tooltip placement="right-end" color="danger" content="Delete collection">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>

          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              collection and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  