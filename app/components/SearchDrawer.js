'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Search } from 'lucide-react'

export default function SearchDrawer() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Search className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-x-0 bottom-0 w-full max-w-[72rem] mx-auto rounded-t-xl min-h-[300px] max-h-[85vh]">
        <div className="w-full h-full max-w-[72rem] mx-auto flex flex-col">
          <DrawerHeader className="text-center px-4">
            <DrawerTitle className="text-xl">Search Products</DrawerTitle>
            {/* <DrawerDescription className="text-sm text-muted-foreground mt-1">
              Enter a product name or description
            </DrawerDescription> */}
          </DrawerHeader>
          <div className="px-4 mb-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Enter a product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="h-10 w-10 flex items-center justify-center">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
          <ScrollArea className="flex-grow px-4">
            <div className="space-y-4 pr-4">
              <div className="flex items-center justify-center">
                <tgs-player
                  autoplay
                  loop
                  mode="normal"
                  src='/search.tgs'
                  style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                ></tgs-player>
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter className="px-4 mt-auto">
            <DrawerClose asChild>
              <Button className="w-full h-10 text-sm font-medium">
                Back to Shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

