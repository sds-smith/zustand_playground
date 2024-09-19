import { useEffect } from "react";
import { useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useStore } from "./store/store";

export default function Category() {
    const navigate = useNavigate();
    const { category } = useParams();

    const root = useStore((state) => state.root);
    const loading = useStore((state) => state.loading);
    const error = useStore((state) => state.error);
    const categoryData = useStore((state) => state[category]);
    const fetchCategory = useStore((store) => store.fetchCategory);
    const categories = root ? Object.keys(root) : [];
    const paramKeys = categories.map(category => category.slice(0, -1));

    const { search } = useLocation();
    const paramKey = paramKeys?.find(key => search.includes(key));
    const [ searchParams ] = useSearchParams();
    const searchParam = searchParams.get(paramKey);
    console.log({searchParam})

    const columns = [ 'name', 'title', 'url', ...categories ];

    useEffect(() => {
      if (!categoryData && !loading && !error) {
        fetchCategory(category)
      }
    }, [category, categoryData, fetchCategory, loading, error])

    useEffect(()=>console.log({categoryData}),[categoryData])

  return (
        <> { categoryData ? (
        <table className='table table-bordered'>
          <thead className='table-dark'>
            <tr >
                {Object.keys(categoryData[0])
                .filter(column => columns.includes(column))
                .map(key => (
                    <th key={key} scope='row'>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            { categoryData
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
