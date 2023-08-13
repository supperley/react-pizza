import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../store/slices/filtersSlice';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onResetInput = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    onChangeSearchValue(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeSearchValue = useCallback(
    debounce((str) => dispatch(setSearchValue(str)), 750),
    [],
  );

  return (
    <div className={styles.root}>
      <svg className={styles.iconSearch} viewBox="0 0 512 512">
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        ref={inputRef}
        onChange={onChangeInput}
      />
      {value && (
        <svg className={styles.iconClear} viewBox="0 0 20 19.84" onClick={onResetInput}>
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
