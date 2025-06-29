import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '@components/Sidebar';
import Button from '@components/ui/Button';

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    return (
        <div className="d-flex">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="flex-grow-1 p-3">
                <div className="d-md-none mb-2">
                    <Button variant="secondary" onClick={() => setOpen(true)}>
                        &#9776;
                    </Button>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
