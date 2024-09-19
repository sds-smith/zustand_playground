
import { useNavigate } from 'react-router-dom'
import { useStore, selectors } from './store/store'


export default function Home() {
  const root = useStore(selectors.root)

  const navigate = useNavigate();

  return (
    <> { root ? (
        <table className='table table-bordered'>
          <thead className='table-dark'>
            <tr>
              <th scope='row'>Category</th>
              <th scope='row'>Endpoint</th>
            </tr>
          </thead>
          <tbody>
            { Object.entries(root).map(([category, endpoint]) => (
              <tr key={category} onClick={() => navigate(`/${category}`)} >
                <td>{category}</td>
                <td>{endpoint}</td>
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
