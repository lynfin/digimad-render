import React, { useEffect, useState } from 'react';
import Flag from 'react-flagkit';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import data from './data.json';
import popular from './popular.json';
import { CountryInput, Label, List, ListItem } from './DropdownListStyles';
import { AnimatePresence } from 'framer-motion';
import { ContainerDEFAULT, Text } from '../../globalStyles';

const DropdownList = ({
  closeDropdown,
  show,
  listRef,
  locations,
  setCountry,
  setFilterCountry,
}) => {
  const [search, setSearch] = useState('');
  const [mergedFilteredCountries, setMergedFilteredCountries] = useState('');

  useEffect(() => {
    if (!show) {
      setSearch('');
    }
  }, [show]);

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const filterCountry = (el) => {
    const searchText = search.trim().toLocaleLowerCase();

    const name = el.name.toLocaleLowerCase().trim().includes(searchText);
    const code = el.code.toLocaleLowerCase().trim().includes(searchText);

    return code || name;
  };

  useEffect(() => {
    const filterForKnownDestinations = (el) => {
      const searchText = el.name.toLocaleLowerCase().trim();
      const located = locations.find((loc) =>
        loc.country.toLocaleLowerCase().trim().includes(searchText)
      );
      return located;
    };
    setMergedFilteredCountries(
      data
        .filter((el) => filterForKnownDestinations(el))
        .map((item, i) => {
          if (item.name === locations[i].country) {
            return Object.assign({}, item, locations[i]);
          } else return null;
        })
    );
  }, [locations]);

  return (
    <AnimatePresence>
      {show && (
        <List
          initial={{ opacity: 0, height: '0%' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0 }}
        >
          <ContainerDEFAULT ref={listRef}>
            <ListItem padding='0' noHover>
              <IconContext.Provider value={{ size: '2em', color: '#c9c9c9' }}>
                <AiOutlineSearch></AiOutlineSearch>
              </IconContext.Provider>
              <CountryInput
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Type a country'
                className='ml-5'
                bc='#fff'
                type='text'
              />
            </ListItem>

            {mergedFilteredCountries
              .filter((el) => filterCountry(el))
              .map((el, index) => (
                <ListItem key={index} onClick={() => closeDropdown(el)}>
                  <Flag size={28} country={el.code} /> <Text>{el.code}</Text>
                  <Label fontSize='1em'>
                    {el.name} ({el.count} sites)
                  </Label>
                </ListItem>
              ))}
          </ContainerDEFAULT>
        </List>
      )}
    </AnimatePresence>
  );
};

export default DropdownList;
