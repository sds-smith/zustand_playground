import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useStore } from './store/store'


export default function Home() {
  const root = useStore((state) => state.root)

  const navigate = useNavigate();
useEffect(()=>console.log({root}),[root])
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
