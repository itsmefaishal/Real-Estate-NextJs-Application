import Link from 'next/link';
import Image from 'next/image';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Property from '@/components/property';

const Banner = ( { purpose, linkName, title1, title2, desc1, desc2, buttonText, imageUrl }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image alt="banner" src={imageUrl} width={500} height={300} />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
        <Text fontSize="3xl" fontWeight="bold" >{title1} <br/> {title2}</Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700" >{desc1} <br /> {desc2}</Text>
        <Button fontSize="xl" colorScheme='blue' >
          <Link href={linkName} textDecoration={"none"} >{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
}

export default function Home( {propertiesForRent, propertiesForSale} ) {
  return (
    <Box>
      <Banner 
        purpose="Rent Homes"
        title1="Rental homes for"
        title2="everyone"
        desc1="Explore apartments, villas, Homes"
        desc2="and more"
        buttonText="Rent Now"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} /> )}
      </Flex>
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} /> )}
      </Flex>
      <Banner 
        purpose="Buy Homes"
        title1="Buy your "
        title2="dream home"
        desc1="Explore apartments, villas, Homes"
        desc2="and more"
        buttonText="Buy Now"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props : {
      propertiesForSale : propertyForSale?.hits,
      propertiesForRent : propertyForRent?.hits,
    }
  }
}