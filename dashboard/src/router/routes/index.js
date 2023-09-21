import { privateRoutes } from "./privateRoutes"
import MainLayout from '../../layout/MainLayout'
import ProtectRoutes from './ProtectRoutes'

export const getRoutes = () => {
    
    privateRoutes.map(r => {
        r.element = <ProtectRoutes route={r}>{r.element}</ProtectRoutes>;
        return r;
    });

    return { path: '/', element: <MainLayout />, children: privateRoutes };
}