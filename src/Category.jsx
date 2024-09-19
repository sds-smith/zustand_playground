import { useEffect } from "react";
import { useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useStore, selectors } from "./store/store";

export default function Category() {
    const navigate = useNavigate();
    const { category } = useParams();

    const loading = useStore(selectors.loading);
    const error = useStore(selectors.error);
    const categoryData = useStore(selectors.category(category));
    const fetchCategory = useStore(selectors.fetchCategory);
    const categories = useStore(selectors.categories);
    const paramKeys = categories?.map(category => category.slice(0, -1));

    const { search } = useLocation();
    const paramKey = paramKeys?.find(key => search.includes(key));
    const [ searchParams ] = useSearchParams();
    const searchParam = searchParams.get(paramKey);
    const filter = useStore(selectors.categoryItemByName(`${paramKey}s`, searchParam))
    const columns = [ 'name', 'title', 'url', ...categories ];
    const filteredCategoryData = filter ? categoryData?.filter(item => filter[category].includes(item.url)) : categoryData

    useEffect(() => {
      if (!categoryData && !loading && !error) {
        fetchCategory(category)
      }
    }, [category, categoryData, fetchCategory, loading, error])

  return (
        <> { filteredCategoryData ? (
        <table className='table table-bordered'>
          <thead className='table-dark'>
            <tr >
                {Object.keys(filteredCategoryData[0])
                .filter(column => columns.includes(column))
                .map(key => (
                    <th key={key} scope='row'>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            { filteredCategoryData
            .map((row) => (
              <tr key={row.url}  >
                {Object.keys(row)
                .filter(column => columns.includes(column))
                .map(column => (
                    <td key={column} scope='row'>
                      {categories.includes(column) 
                        ? <div onClick={()=>navigate(`/${column}?${category.slice(0,-1)}=${row.name || row.title}`)}>view</div>
                        : row[column]
                      }
                    </td>
                ))}
              </tr> 
            ))} 
          </tbody>
        </table>
      ) : (
        <div>LOADING</div>
      )}
    </>
  )
}
