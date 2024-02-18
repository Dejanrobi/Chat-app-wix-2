import React, { useState } from 'react'
import {
  AutoComplete,
  Card,
  Cell,
  Divider,
  Layout,
  Page
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

// import './styles.global.css';

import { withProviders } from '../withProviders'

// import Wix SDKs
import { useWixModules } from '@wix/sdk-react';
import { products } from '@wix/stores';
import { useQuery } from 'react-query';



import {ProductChat} from './ProductChat';


export default withProviders(function ProductsPage(){

  // // creating the search states
  const [currentProduct, setCurrentProduct] = useState<products.Product | undefined>();
  // console.log("Product: ",currentProduct)
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const { queryProducts } = useWixModules(products);
    
  const {
    data: productsData,
    isLoading,
    error,

  } = useQuery(['products', searchQuery], ()=>
    queryProducts().startsWith('name', searchQuery).find()
  )

  if(error) return <div>Something went wrong</div>

  return(
    <Page>
      <Page.Header title='Chat about our Product'/>
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Header title='Select a product to chat about' />
              <Card.Content>
                <AutoComplete
                  placeholder='Select a product to chat about'
                  size='large'


                  status={isLoading? 'loading' : undefined}

                  options={productsData?.items.map((product: any)=>({
                    id:product._id!,
                    value: product.name,
                  }))

                  }

                  onSelect={(e)=>{
                    setCurrentProduct(
                      productsData!.items.find((product: any)=> product._id === e.id as string) 
                    )
                  }}

                  onChange={(e)=>{
                    setSearchQuery(e.target.value);
                    setCurrentProduct(undefined)
                  }}

                  value={currentProduct?.name ?? undefined}
                  
                />
              </Card.Content>
            </Card>
          </Cell>

          <Divider/>

          <Cell>
            {currentProduct &&  <ProductChat product={currentProduct}/> }
          </Cell>
        </Layout>
      </Page.Content>
    </Page>

  )

})