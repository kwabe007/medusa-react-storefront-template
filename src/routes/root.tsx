import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout'

export default function Root() {
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}
