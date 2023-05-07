import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '@/components/SearchFilter';
import Property from '@/components/property';
import { ImCross } from 'react-icons/im'
import { baseUrl, fetchApi } from '@/utils/fetchApi';

const Search = ({ properties }) => {
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex 
                cursor='pointer'
                bg='gray.100'
                padding='2'
                borderColor='gray.200'
                borderBottom='1px'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                onClick={() => setSearchFilter((prevFilters) => !prevFilters)}
            >
                <Text>Search here</Text>
                <Icon as={BsFilter} paddingLeft='2' w='7' />
            </Flex>
            { searchFilter && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='semibold' >
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap' >
                {properties.map((property) => <Property key={property.id} property={property}  />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDirection='row' marginTop='5' marginBottom='5'>
                    {/* <Image alt='no result' /> */}
                    <Text color='red.900' fontWeight='semibold' fontSize='lg'> No Result </Text> <Icon as={ImCross} paddingLeft='2' w='7' color='red.900' />
                </Flex>
            )}
        </Box>
    );
}

export default Search;

export async function getServerSideProps({ query }) {

    const purpose = query.purpose || 'for-rent' ;
    const rentFrequency = query.rentFrequency || 'monthly';
    const minPrice = query.minPrice || '0'
    const maxPrice = query.maxPrice || '1000000'
    const roomsMin = query.roomsMin || '0'
    const bathsMin = query.bathsMin || '0'
    const sort = query.sort || 'price-desc'
    const areaMax = query.areaMax || '35000'
    const locationExternalIDs = query.locationExternalIDs  || '5002'
    const categoryExternalID = query.categoryExternalID || '4'

    const data = await fetchApi(`${baseUrl}/properties/list?&locationExternalIDs=${locationExternalIDs}
    &purpose=${purpose}
    &categoryExternalID=${categoryExternalID}
    &bathsMin=${bathsMin}
    &rentFrequency=${rentFrequency}
    &minPrice=${minPrice}
    &maxPrice=${maxPrice}
    &roomsMin=${roomsMin}
    &areaMax=${areaMax}
    &sort=${sort}`)

    return {
        props : {
            properties : data?.hits
        }
    }
}