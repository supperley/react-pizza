import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortByOptions, setSortByOptions] = useState({ property: 'rating', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { property, order } = sortByOptions;
    const page = `page=${currentPage}&limit=4`;
    const search = searchValue.trim().length > 0 ? `&search=${searchValue.trim()}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    setLoading(true);
    fetch(
      `https://64c92e89b2980cec85c20458.mockapi.io/items?${page}&sortBy=${property}&order=${order}${search}${category}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortByOptions, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort options={sortByOptions} onChangeSortOptions={(obj) => setSortByOptions(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination onPageChange={setCurrentPage} />
    </div>
  );
};

export default Home;
