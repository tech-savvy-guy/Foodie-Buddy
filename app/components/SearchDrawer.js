'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Search } from 'lucide-react';

import products from './Products';
import ProductCard from './ProductCard';

export default function SearchDrawer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]); // Return empty list if search query is empty
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Search className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-x-0 bottom-0 w-full max-w-[72rem] mx-auto rounded-t-xl min-h-[300px] max-h-[90vh]">
        <div className="w-full h-full max-w-[72rem] mx-auto flex flex-col">
          <DrawerHeader className="text-center px-4">
            <DrawerTitle className="text-xl">Search Products</DrawerTitle>
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
          <ScrollArea className="flex-grow px-4 max-h-[60vh] overflow-y-auto">
            {searchQuery.trim() === '' ? (
              <div className="flex items-center justify-center w-full h-[60vh]">
                <tgs-player
                  autoplay
                  loop
                  mode="normal"
                  src="/search.tgs"
                  className={`${isLargeDevice ? 'w-[300px] h-[300px]' : 'w-[250px] h-[250px]'} max-w-full max-h-full`}
                ></tgs-player>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center w-full h-[60vh]">
                <tgs-player
                  autoplay
                  loop
                  mode="normal"
                  src="/null.tgs"
                  className={`${isLargeDevice ? 'w-[300px] h-[300px]' : 'w-[250px] h-[250px]'} max-w-full max-h-full`}
                ></tgs-player>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </ScrollArea>


          <DrawerFooter className="px-4 mt-auto sticky bottom-0 bg-white z-10 shadow-sm">
            <DrawerClose asChild>
              <Button className="w-full h-10 text-sm font-medium">
                Back to Shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
